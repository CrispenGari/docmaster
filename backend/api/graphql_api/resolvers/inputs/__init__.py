import graphene
from graphene_file_upload.scalars import Upload

class ConvertWordDocToPDFInputType(graphene.InputObjectType):
    file = Upload(required=True)
    saveName = graphene.String(required = False)
    
class ConvertPDFToWordDocInputType(graphene.InputObjectType):
    file = Upload(required=True)
    saveName = graphene.String(required = False)
    
    
class GetPDFMetaDataInputType(graphene.InputObjectType):
    file = Upload(required=True)
class SetPDFMetaDataInputType(graphene.InputObjectType):
    file = Upload(required=True)
    saveName = graphene.String(required = False)
    author = graphene.String(required = False)
    producer = graphene.String(required = False)
    creator = graphene.String(required = False)
    createdAt = graphene.String(required = False)
    updatedAt = graphene.String(required = False)
    
    
class MergePDFFilesInputType(graphene.InputObjectType):
    pdfs = graphene.NonNull(graphene.List(graphene.NonNull(Upload)))
    saveName = graphene.String(required = True)
    
class DeleteSessionInputType(graphene.InputObjectType):
    sessionId = graphene.String(required = True)
    sessionType = graphene.String(required = True)