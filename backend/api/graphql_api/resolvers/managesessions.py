
import graphene
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
import os

cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')

class DeleteSession(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(DeleteSessionInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    
    def mutate(self, info, input, **kwargs):
        try:
            sessionPath = os.path.join(temp_path, input.sessionType, input.sessionId)
            os.remove(sessionPath)
            return DeleteSession(
                success = True
            )
        except Exception as e:
            print(e)
            return DeleteSession(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during deleting a session.'
                )
            )