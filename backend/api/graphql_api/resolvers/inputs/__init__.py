import graphene
from graphene_file_upload.scalars import Upload

class ConvertWordDocToPDFInputType(graphene.InputObjectType):
    file = Upload(required=True)
    saveName = graphene.String(required = True)
    

class MergePDFFilesInputType(graphene.InputObjectType):
    pdfs = graphene.NonNull(graphene.List(graphene.NonNull(Upload)))
    saveName = graphene.String(required = True)