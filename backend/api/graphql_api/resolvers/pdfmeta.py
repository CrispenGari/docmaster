import graphene
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
from graphql_api.resolvers.utils import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import pypdf
import os


cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')

class GetPDFMetaData(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(GetPDFMetaDataInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(PDFMetaDataType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            file = input.file
            if "." + file.name.split('.')[-1].lower() != ".pdf":
                return GetPDFMetaData(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
                )
            reader = pypdf.PdfReader(ContentFile(file.read()))
            
            if reader.is_encrypted:
                return SetPDFMetaData(
                    success = False,
                    error = ErrorType(
                        field = 'server',
                        message = 'Can not Read Meta data on a locked document.'
                    )
                )
                
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
            
            return GetPDFMetaData(
                success = True,
                response = PDFMetaDataType(
                    sessionId = 'none',
                    sessionType = "pdfmeta",
                    pages = _pages,
                    author = _author,
                    producer = _producer,
                    creator = _creator,
                    createdAt = date_object(_createdAt),
                    modifiedAt = date_object(_modifiedAt),
                    pageLayout = _pageLayout,
                    pageLabels = _pageLabels,
                    isLocked = _isLocked,
                    pageMode = _pageMode,
                    pdfHeader = _pdfHeader,
                    documentName = file.name
                )
            )
        except Exception as e:
            print(e)
            return GetPDFMetaData(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during converting file to PDF.'
                )
            )
            
class SetPDFMetaData(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(SetPDFMetaDataInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(SetPDFMetaDataType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            file = input.file
            if "." + file.name.split('.')[-1].lower() != ".pdf":
                return EncryptPDFFileType(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
                )
            saveName = input.saveName if input.saveName else file.name

            sessionId = input.sessionId
            sessionPath = os.path.join(temp_path, 'pdfmeta', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))
            reader = pypdf.PdfReader(_file_fom_client_save_path)
            
            if reader.is_encrypted:
                return SetPDFMetaData(
                    success = False,
                    error = ErrorType(
                        field = 'server',
                        message = 'Can not Set Meta data on a locked document.'
                    )
                )
            _author = reader.metadata.get('/Author')
            _producer = reader.metadata.get('/Producer')
            _creator = reader.metadata.get('/Creator')
            _createdAt = reader.metadata.get('/CreationDate')
            _modifiedAt = reader.metadata.get('/ModDate')
            
            author = input.author if input.author else _author
            producer = input.producer if input.producer else _producer
            creator = input.creator if input.creator else _creator
            # createdAt = input.createdAt if input.createdAt else _createdAt
            # updatedAt = input.modifiedAt if input.modifiedAt else _modifiedAt
            
            writer = pypdf.PdfWriter()
            for page in reader.pages:
                writer.add_page(page)
            
            writer.add_metadata({
                "/Author":  author,
                "/Producer":  producer,
                '/Creator':  creator,
                '/CreationDate':  _createdAt,
                '/ModDate':  _modifiedAt
            })
            
            with open(os.path.join(sessionPath, saveName), "wb") as f:
                writer.write(f)
        
            _pages = len(reader.pages)
            _pageLayout = reader.page_layout
            _pageLabels = reader.page_labels
            _pageMode = reader.page_mode
            _isLocked = reader.is_encrypted
            _pdfHeader = reader.pdf_header
            
            return SetPDFMetaData(
                success = True,
                response = SetPDFMetaDataType(
                    sessionId = sessionId,
                    sessionType = "pdfmeta",
                    pages = _pages,
                    author = author,
                    producer = producer,
                    creator = creator,
                    createdAt = date_object(_createdAt),
                    modifiedAt = date_object(_modifiedAt),
                    pageLayout = _pageLayout,
                    pageLabels = _pageLabels,
                    isLocked = _isLocked,
                    pageMode = _pageMode,
                    pdfHeader = _pdfHeader,
                    documentName = saveName,
                    url = f"http://127.0.0.1:3001/temp/files/pdfmeta/{sessionId}/{saveName.replace(' ', '%20')}"
                )
            )
        except Exception as e:
            print(e)
            return SetPDFMetaData(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during converting file to PDF.'
                )
            )