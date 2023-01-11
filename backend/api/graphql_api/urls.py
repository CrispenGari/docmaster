from graphene_file_upload.django import FileUploadGraphQLView

from django.urls import path
from graphql_api.schema import schema
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("", csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True, schema=schema))),
]