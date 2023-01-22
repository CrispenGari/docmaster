import graphene

class ErrorType(graphene.ObjectType):
    field = graphene.String(required=True)
    message = graphene.String(required = True)

class ConvertWordDocToPDFType(graphene.ObjectType):
    url = graphene.String(required = True)
    sessionId = graphene.String(required = True)
    sessionType = graphene.String(required = True)
    
class ConvertPDFToWordDocType(graphene.ObjectType):
    url = graphene.String(required = True)
    sessionId = graphene.String(required = True)
    sessionType = graphene.String(required = True)
    
class MergePDFFilesType(graphene.ObjectType):
    url = graphene.String(required = True)
    sessionId = graphene.String(required = True)
    sessionType = graphene.String(required = True)
    
class PDFMetaDataType(graphene.ObjectType):
    sessionId = graphene.String(required = True)
    sessionType = graphene.String(required = True)
    pages = graphene.Int(required = False)
    author = graphene.String(required = False)
    producer = graphene.String(required = False)
    creator = graphene.String(required = False)
    createdAt = graphene.String(required = False)
    modifiedAt = graphene.String(required = False)
    pageLayout = graphene.String(required = False)
    pageLabels = graphene.List(graphene.Int)
    isLocked = graphene.Boolean(required = False)
    pageMode = graphene.String(required = False)
    pdfHeader = graphene.String(required = False)
    documentName = graphene.String(required = True)


class SetPDFMetaDataType(graphene.ObjectType):
    url = graphene.String(required = True)
    sessionId = graphene.String(required = True)
    sessionType = graphene.String(required = True)
    pages = graphene.Int(required = False)
    author = graphene.String(required = False)
    producer = graphene.String(required = False)
    creator = graphene.String(required = False)
    createdAt = graphene.String(required = False)
    modifiedAt = graphene.String(required = False)
    pageLayout = graphene.String(required = False)
    pageLabels = graphene.List(graphene.Int)
    isLocked = graphene.Boolean(required = False)
    pageMode = graphene.String(required = False)
    pdfHeader = graphene.String(required = False)
    documentName = graphene.String(required = True)


