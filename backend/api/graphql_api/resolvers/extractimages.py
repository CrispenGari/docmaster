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

class ExtractImages(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(ExtractImagesInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(ExtractImagesType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            file = input.file
            documentName = file.name
            pageNumber = input.pageNumber
            if "." + file.name.split('.')[-1].lower() != ".pdf":
                return ExtractImagesType(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
            )
            
            sessionId = input.sessionId
            sessionPath = os.path.join(temp_path, 'extractimages', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))

            reader = pypdf.PdfReader(_file_fom_client_save_path)
            if reader.is_encrypted:
                return ExtractImages(
                    success = False,
                    error = ErrorType(
                        field = 'locked',
                        message = 'The document is not locked and can not be extracted values, consider decrypting it first.'
                    )
                )
            
            if len(reader.pages) <= pageNumber-1:
                return ExtractImages(
                    success = False,
                    error = ErrorType(
                        field = 'pages',
                        message = f'Unknown page number,  document only have {len(reader.pages)}.'
                    )
                )
            page = reader.pages[pageNumber-1]
            images = list()
            for image_file_object in page.images:
                saveName = str(uuid.uuid4())[:5] + image_file_object.name
                file_save_name = os.path.join(sessionPath, saveName)
                with open(file_save_name, "wb") as fp:
                    fp.write(image_file_object.data)
                images.append(
                    f"http://127.0.0.1:3001/temp/files/extractimages/{sessionId}/{saveName.replace(' ', '%20')}"
                )
            
           
            return ExtractImages(
                success = True,
                response = ExtractImagesType(
                    documentName = documentName,
                    sessionId = sessionId,
                    sessionType = "extractimages",
                    images = images
                )
            )
        except Exception as e:
            print(e)
            return ExtractImages(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during decryption of PDF file this maybe because you provide the wrong password for your PDF document.'
                )
            )