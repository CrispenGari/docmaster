
import graphene
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
import os
import shutil
import uuid

cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')


class CreateSession(graphene.Mutation):
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    sessionId = graphene.String(required=False)
    
    def mutate(self, info, **kwargs):
        try:
            sessionId = str(uuid.uuid4())[:5]
            return CreateSession(
                success = True,
                sessionId = sessionId
            )
        except Exception as e:
            print(e)
            return CreateSession(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during deleting a session.'
                )
            )

class DeleteSession(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(DeleteSessionInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    
    def mutate(self, info, input, **kwargs):
        try:
            for _type in os.listdir(temp_path):
                sessionPath = os.path.join(temp_path, _type, input.sessionId)
                if os.path.exists(sessionPath):
                    shutil.rmtree(sessionPath, ignore_errors=True)
                
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