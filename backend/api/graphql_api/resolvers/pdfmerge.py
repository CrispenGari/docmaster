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

class MergePDFFilesMutation(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(MergePDFFilesInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(MergePDFFilesType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            files = input.files
            if all(map(lambda x: "." + x.name.split('.')[-1].lower() != ".pdf", files)) == False:
                return MergePDFFilesMutation(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Only documents with extensions ({', '.join(['.pdf'])}) are required."
                     )
                )
            
            sessionId = str(uuid.uuid4())[:5]
            sessionPath = os.path.join(temp_path, 'pdfmerge', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
           
            for file in files:
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
            
            return MergePDFFilesMutation(
                success = True,
                response = MergePDFFilesType(
                    sessionId = sessionId,
                    sessionType = "pdfmerge",
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
            return MergePDFFilesMutation(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during merging PDF files.'
                )
            )
            