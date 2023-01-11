import graphene
from graphene_file_upload.scalars import Upload
from graphql_api.resolvers.inputs import *
from graphql_api.resolvers.objects import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import uuid
import os
import docx2pdf

cwd = os.getcwd()
temp_path = os.path.join(cwd, 'temp')
word_exts = [".docx", ".doc", ".dotx", ".docm", ".dot", ".dotm", '.dotx']

class ConvertWordDocumentToPDFMutation(graphene.Mutation):
    class Arguments:
        input = graphene.Argument(graphene.NonNull(ConvertWordDocToPDFInputType))
    error = graphene.Field(ErrorType, required=False)
    success = graphene.Boolean(required=True)
    response = graphene.Field(ConvertWordDocToPDFType, required=False)
    
    def mutate(self, info, input, **kwargs):
        try:
            saveName = input.saveName if input.saveName.split('.')[-1].lower() == "pdf" else input.saveName + '.pdf'
            file = input.file
            if "." + file.name.split('.')[-1].lower() not in word_exts:
                return ConvertWordDocumentToPDFMutation(
                     success = False,
                     error = ErrorType(
                         field = "extension",
                         message = f"Document type not supported allowed extensions are ({', '.join(word_exts)})."
                     )
                )
            
            sessionId = str(uuid.uuid4())[:5]
            sessionPath = os.path.join(temp_path, 'doc2pdf', sessionId)
            if not os.path.exists(sessionPath):
                os.makedirs(sessionPath)
            
            _file_fom_client_save_path = os.path.join(sessionPath, file.name)
            default_storage.save(_file_fom_client_save_path, ContentFile(file.read()))
            docx2pdf.convert(_file_fom_client_save_path, os.path.join(sessionPath, saveName))
            
            return ConvertWordDocumentToPDFMutation(
                success = True
            )
        except Exception as e:
            print(e)
            return ConvertWordDocumentToPDFMutation(
                success = False,
                error = ErrorType(
                    field = 'server',
                    message = 'Something went wrong during converting file to PDF.'
                )
            )
        # try:
        #     ext = "."+str(input.image.filename).split('.')[-1]
        #     if not ext in allowed_extensions:
        #         return PredictSnakeMutation(
        #             ok = False,
        #             error = ErrorType(
        #                 field = 'image',
        #                 message = f'Only images with extensions ({", ".join(allowed_extensions)}) are allowed.'
        #             )
        #         )
        #     image = input.image.read()
        #     image = Image.open(io.BytesIO(image))
        #     tensor = preprocess_img(image)
        #     res = predict(ssi_model, tensor, device)
        #     return PredictSnakeMutation(
        #         ok = True,
        #         prediction = PredictionType(
        #             top_prediction = PredictedType(
        #                 label= res.top_prediction.label,
        #                 class_name= res.top_prediction.class_name,
        #                 probability= res.top_prediction.probability,
        #                 specie = SpecieType(
        #                     id = res.top_prediction.specie.id,
        #                     class_ = res.top_prediction.specie.class_,
        #                     common_name = res.top_prediction.specie.common_name,
        #                     specie_name = res.top_prediction.specie.specie_name
        #                 )
        #             ),
        #             predictions = [
        #                 PredictedType(
        #                     label= pred.label,
        #                     class_name= pred.class_name,
        #                     probability= pred.probability,
        #                     specie = SpecieType(
        #                         id = pred.specie.id,
        #                         class_ = pred.specie.class_,
        #                         common_name = pred.specie.common_name,
        #                         specie_name = pred.specie.specie_name
        #                     ) 
        #                 ) for pred in res.predictions
        #             ]
        #         )
        #     )
        # except Exception as e:
        #     print(e)
        #     return PredictSnakeMutation(
        #         ok = False,
        #         error = ErrorType(
        #             field = 'server',
        #             message = "Something went wrong on the server."
        #         )
        #     )
    

class UploadFileMutation(graphene.Mutation):
    class Arguments:
        files = graphene.NonNull(graphene.List(graphene.NonNull(Upload)))

    success = graphene.Boolean()

    def mutate(self, info, files, **kwargs):
        print(files)
        return UploadFileMutation(success=True)