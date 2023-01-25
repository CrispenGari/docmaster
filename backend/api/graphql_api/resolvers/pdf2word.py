import graphene
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
from pdf2docx import Converter

cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')

class ConvertPDFToWordDocument(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(ConvertPDFToWordDocInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(ConvertPDFToWordDocType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            file = input.file
            if input.saveName:
                # if the user does not give us a savename
                saveName = input.saveName if input.saveName.split('.')[-1].lower() == "docx" else input.saveName + '.docx'
            else:
                # then we use a original document name
                saveName = "".join(str(file.name).split('.')[:-1]) + ".docx"
                
            if "." + file.name.split('.')[-1].lower() != ".pdf":
                return ConvertPDFToWordDocument(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
                )
            
            sessionId = input.sessionId
            sessionPath = os.path.join(temp_path, 'pdf2docx', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))
            
            cv = Converter(_file_fom_client_save_path)
            cv.convert(os.path.join(sessionPath, saveName))      # all pages by default
            cv.close()
            
            return ConvertPDFToWordDocument(
                success = True,
                response = ConvertWordDocToPDFType(
                    documentName = saveName,
                    sessionId = sessionId,
                    sessionType = "pdf2docx",
                    url = f"http://127.0.0.1:3001/temp/files/pdf2docx/{sessionId}/{saveName.replace(' ', '%20')}"
                )
            )
        except Exception as e:
            print(e)
            return ConvertPDFToWordDocument(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during converting file to PDF.'
                )
            )