import graphene
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
from graphql_api.resolvers.utils import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import pypdf

cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')

class ReducePDFSize(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(ReducePDFSizeInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(ReducePDFSizeType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            file = input.file
            if input.saveName:
                # if the user does not give us a savename
                saveName = input.saveName if input.saveName.split('.')[-1].lower() == "pdf" else input.saveName + '.pdf'
            else:
                # then we use a original document name
                saveName = "".join(str(file.name).split('.')[:-1]) + ".pdf"
                
            if "." + file.name.split('.')[-1].lower() != ".pdf":
                return ReducePDFSize(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
                )
            
            sessionId = input.sessionId
            sessionPath = os.path.join(temp_path, 'reducepdfsize', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))
            
            reader = pypdf.PdfReader(_file_fom_client_save_path)
            if reader.is_encrypted:
                return ReducePDFSize(
                    success = False,
                    error = ErrorType(
                        field = 'server',
                        message = 'Can not reduce the PDF size on a locked document.'
                    )
                )
            writer = pypdf.PdfWriter()
            
            inputSize = convert_size(os.path.getsize(_file_fom_client_save_path))
            
            for page in reader.pages:
                writer.add_page(page)
                
            writer.add_metadata(reader.metadata)
            
            with open(os.path.join(sessionPath, saveName), "wb") as fp:
                writer.write(fp)
                
            outputSize = convert_size(os.path.getsize(os.path.join(sessionPath, saveName)))
                
            return ReducePDFSize(
                success = True,
                response = ReducePDFSizeType(
                    documentName = saveName,
                    outputSize = outputSize,
                    inputSize = inputSize,
                    sessionId = sessionId,
                    sessionType = "reducepdfsize",
                    url = f"http://127.0.0.1:3001/temp/files/reducepdfsize/{sessionId}/{saveName.replace(' ', '%20')}"
                )
            )
        except Exception as e:
            print(e)
            return ReducePDFSize(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during compressing PDF file by 86%.'
                )
            )