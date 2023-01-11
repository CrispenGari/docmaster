import graphene

class ErrorType(graphene.ObjectType):
    field = graphene.String(required=True)
    message = graphene.String(required = True)

class ConvertWordDocToPDFType(graphene.ObjectType):
    url = graphene.String(required = True)
    
class MergePDFFilesType(graphene.ObjectType):
    id = graphene.Int(required=True) 
    class_ = graphene.String(required=True) 
    specie_name = graphene.String(required=True)
    common_name = graphene.String(required=True)
    

