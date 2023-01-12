import graphene
from graphene_file_upload.scalars import Upload
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import uuid
import os
import docx2pdf
from pdf2docx import Converter

cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')
word_exts = [".docx", ".doc", ".dotx", ".docm", ".dot", ".dotm", '.dotx']

class ConvertWordDocumentToPDFMutation(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(ConvertWordDocToPDFInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(ConvertWordDocToPDFType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            file = input.file
            if input.saveName:
                # if the user does not give us a savename
                saveName = input.saveName if input.saveName.split('.')[-1].lower() == "pdf" else input.saveName + '.pdf'
            else:
                # then we use a original document name
                saveName = "".join(str(file.name).split('.')[:-1]) + ".pdf"
                
            if "." + file.name.split('.')[-1].lower() not in word_exts:
                return ConvertWordDocumentToPDFMutation(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(word_exts)})."
                     )
                )
            
            sessionId = str(uuid.uuid4())[:5]
            sessionPath = os.path.join(temp_path, 'doc2pdf', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
            
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))
            docx2pdf.convert(_file_fom_client_save_path, os.path.join(sessionPath, saveName))
            return ConvertWordDocumentToPDFMutation(
                success = True,
                response = ConvertWordDocToPDFType(
                    url = f"http://127.0.0.1:3001/temp/files/doc2pdf/{sessionId}/{saveName.replace(' ', '%20')}"
                )
            )
        except Exception as e:
            print(e)
            return ConvertWordDocumentToPDFMutation(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during converting file to PDF.'
                )
            )
       
class ConvertPDFToWordDocumentMutation(graphene.Mutation):
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
                return ConvertPDFToWordDocumentMutation(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
                )
            
            sessionId = str(uuid.uuid4())[:5]
            sessionPath = os.path.join(temp_path, 'pdf2docx', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))
            
            cv = Converter(_file_fom_client_save_path)
            cv.convert(os.path.join(sessionPath, saveName))      # all pages by default
            cv.close()
            
            return ConvertPDFToWordDocumentMutation(
                success = True,
                response = ConvertWordDocToPDFType(
                    url = f"http://127.0.0.1:3001/temp/files/pdf2docx/{sessionId}/{saveName.replace(' ', '%20')}"
                )
            )
        except Exception as e:
            print(e)
            return ConvertPDFToWordDocumentMutation(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during converting file to PDF.'
                )
            )

class UploadFileMutation(graphene.Mutation):
    class Arguments:
        files = graphene.NonNull(graphene.List(graphene.NonNull(Upload)))

    success = graphene.Boolean()

    def mutate(self, info, files, **kwargs):
        print(files)
        return UploadFileMutation(success=True)