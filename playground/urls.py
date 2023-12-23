# playground/urls.py
from django.urls import path
from .views import hello, model_to_graph, upload_model, upload_data

urlpatterns = [
    path('hello/', hello.say_hello, name='say_hello'),
    path('upload_model/', upload_model.UploadModelView.as_view(), name='upload_model'),
    path('upload_data/', upload_data.UploadDataView.as_view(), name='upload_data'),
    path('model_to_graph/', model_to_graph.checkModelGraphStatus.as_view(), name='model_to_graph'),
    # Add more URL patterns as needed
]
