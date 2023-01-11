from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
import os

PATH = os.path.join(os.getcwd(), 'temp')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', include('graphql_api.urls'))
]  + static('/temp/files', document_root=PATH)