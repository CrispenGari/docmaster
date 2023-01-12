import graphene

class ErrorType(graphene.ObjectType):
    field = graphene.String(required=True)
    message = graphene.String(required = True)

class ConvertWordDocToPDFType(graphene.ObjectType):
    url = graphene.String(required = True)
    
class ConvertPDFToWordDocType(graphene.ObjectType):
    url = graphene.String(required = True)
    
class MergePDFFilesType(graphene.ObjectType):
    url = graphene.String(required = True)
    

