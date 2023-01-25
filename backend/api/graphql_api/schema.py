import graphene
from graphql_api.resolvers import *

class Mutation(graphene.ObjectType):
    convertDocToPDF = ConvertWordDocumentToPDF.Field()
    convertPDFToDocx = ConvertPDFToWordDocument.Field()
    getPDFMetaData = GetPDFMetaData.Field()
    mergePDFs = MergePDFFilesMutation.Field()
    deleteSession = DeleteSession.Field()
    reducePDFSize = ReducePDFSize.Field()
    encryptPDF = EncryptPDFDocument.Field()
    decryptPDF = DecryptPDFDocument.Field()
    extractImages = ExtractImages.Field()
    setMetaData = SetPDFMetaData.Field()
    createSession = CreateSession.Field()

class Query(graphene.ObjectType):
    hello = graphene.String()
    def resolve_hello(root, info):
        return "hello world"

schema = graphene.Schema(query=Query, mutation=Mutation)