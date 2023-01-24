import graphene
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import uuid
import os
import pypdf

cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')

class EncryptPDFDocument(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(EncryptPDFInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(EncryptPDFFileType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            file = input.file
            saveName = file.name
            password = input.password
            if "." + file.name.split('.')[-1].lower() != ".pdf":
                return EncryptPDFFileType(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
            )
            
            sessionId = str(uuid.uuid4())[:5]
            sessionPath = os.path.join(temp_path, 'encryptpdf', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))

            reader = pypdf.PdfReader(_file_fom_client_save_path)
            writer = pypdf.PdfWriter()
            
            for page in reader.pages:
                writer.add_page(page)
            writer.encrypt(password)
            
            with open(os.path.join(sessionPath, file.name), "wb") as f:
                writer.write(f)
            
            return EncryptPDFDocument(
                success = True,
                response = EncryptPDFFileType(
                    documentName = saveName,
                    sessionId = sessionId,
                    sessionType = "encryptpdf",
                    url = f"http://127.0.0.1:3001/temp/files/encryptpdf/{sessionId}/{saveName.replace(' ', '%20')}"
                )
            )
        except Exception as e:
            print(e)
            return EncryptPDFDocument(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during encrypting file to PDF.'
                )
            )