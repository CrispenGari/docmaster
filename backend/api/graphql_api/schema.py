import graphene
from graphql_api.resolvers import *
from graphql_api.resolvers.objects import *
from graphql_api.resolvers.inputs import *
import pypdf

class Mutation(graphene.ObjectType):
    convertDocToPDF = ConvertWordDocumentToPDF.Field()
    convertPDFToDocx = ConvertPDFToWordDocument.Field()
    mergePDFs = MergePDFFilesMutation.Field()
    getPDFMetaData = GetPDFMetaData.Field()
    deleteSession = DeleteSession.Field()
    reducePDFSize = ReducePDFSize.Field()
    encryptPDF = EncryptPDFDocument.Field()
    decryptPDF = DecryptPDFDocument.Field()
    extractImages = ExtractImages.Field()
    setMetaData = SetPDFMetaData.Field()
    createSession = CreateSession.Field()

class Query(graphene.ObjectType):
    hello = graphene.String()
    
    meta = graphene.Field(PDFMetaResponse, input = graphene.Argument(graphene.NonNull(GetPDFMetaDataInputType)))
    
    def resolve_hello(root, info):
        return "hello world"
    
    def resolve_meta(root, info, input):
        try:
            file = input.file
            if "." + file.name.split('.')[-1].lower() != ".pdf":
                return PDFMetaResponse(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(['.pdf'])})."
                     )
                )
            reader = pypdf.PdfReader(ContentFile(file.read()))
            
            if reader.is_encrypted:
                return PDFMetaResponse(
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
            
            return PDFMetaResponse(
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
            return PDFMetaResponse(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during converting file to PDF.'
                )
            )

schema = graphene.Schema(query=Query, mutation=Mutation)