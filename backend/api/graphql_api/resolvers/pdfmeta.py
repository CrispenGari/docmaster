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

class GetPDFMetaDataMutation(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(GetPDFMetaDataInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(PDFMetaDataType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            file = input.file
            if "." + file.name.split('.')[-1].lower() != ".pdf":
                return GetPDFMetaDataMutation(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
                )
            
            sessionId = str(uuid.uuid4())[:5]
            sessionPath = os.path.join(temp_path, 'pdfmeta', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))
            
            reader = pypdf.PdfReader(_file_fom_client_save_path)
            
            _pages = len(reader.pages)
            _author = reader.metadata.get('/Author')
            _producer = reader.metadata.get('/Producer')
            _creator = reader.metadata.get('/Creator')
            _createdAt = reader.metadata.get('/CreationDate')
            _modifiedAt = reader.metadata.get('/ModDate')
            _pageLayout = reader.page_layout
            _pageLabels = reader.page_labels
            _pageMode = reader.page_mode
            _isLocked = reader.is_encrypted
            _pdfHeader = reader.pdf_header
            
            return GetPDFMetaDataMutation(
                success = True,
                response = PDFMetaDataType(
                    sessionId = sessionId,
                    sessionType = "pdfmeta",
                    pages = _pages,
                    author = _author,
                    producer = _producer,
                    creator = _creator,
                    createdAt = _createdAt,
                    modifiedAt = _modifiedAt,
                    pageLayout = _pageLayout,
                    pageLabels = _pageLabels,
                    isLocked = _isLocked,
                    pageMode = _pageMode,
                    pdfHeader = _pdfHeader,
                )
            )
        except Exception as e:
            print(e)
            return GetPDFMetaDataMutation(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during converting file to PDF.'
                )
            )