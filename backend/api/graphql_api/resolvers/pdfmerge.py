import graphene
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import pypdf
import operator

cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')

class MergePDFFilesMutation(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(MergePDFFilesInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(MergePDFFilesType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            files = input.pdfs
            saveName = input.saveName if input.saveName.split('.')[-1].lower() == "pdf" else input.saveName + '.pdf'
            sortedFiles = list(sorted(files, key=operator.itemgetter('documentNumber')))
           
            sessionId = input.sessionId
            sessionPath = os.path.join(temp_path, 'pdfmerge', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            for file in sortedFiles:
                _file_fom_client_save_path = os.path.join(sessionPath, file.file.name)
                default_storage.save(_file_fom_client_save_path, ContentFile(file.file.read()))
                
            merger = pypdf.PdfMerger()
            for file in sortedFiles:
                _file_saved_path = os.path.join(sessionPath, file.file.name)
                merger.append(_file_saved_path)
            merger.write(os.path.join(sessionPath, saveName))
            merger.close()
            
            #  THIS CODE IF FOR merging PDF's with selected pages
            # for file in sortedFiles:
            #     _file_saved_path = os.path.join(sessionPath, file.file.name)
            #     inputData = open(_file_saved_path, "rb")
            #     if len(file.pages) == 0:
            #         merger.append(inputData)
            #     else:
            #         merger.append(fileobj=inputData, pages= tuple(file.pages))
                
            # output = open(os.path.join(sessionPath, saveName), "wb")
            # merger.write(output)
            # merger.close()
            # output.close()
         
            return MergePDFFilesMutation(
                    success = True,
                    response = MergePDFFilesType(
                    sessionId = sessionId,
                    documentName = saveName,
                    sessionType = "pdfmerge",
                    url = f"http://127.0.0.1:3001/temp/files/pdfmerge/{sessionId}/{saveName.replace(' ', '%20')}"
                )
            )
        except Exception as e:
            print(e)
            return MergePDFFilesMutation(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during merging PDF files.'
                )
            )
            