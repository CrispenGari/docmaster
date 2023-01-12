import graphene
from graphql_api.resolvers import *

class Mutation(graphene.ObjectType):
    convertDocToPDF = ConvertWordDocumentToPDFMutation.Field()
    convertPDFToDocx = ConvertPDFToWordDocumentMutation.Field()

class Query(graphene.ObjectType):
    hello = graphene.String()
    def resolve_hello(root, info):
        return "hello world"

schema = graphene.Schema(query=Query, mutation=Mutation)