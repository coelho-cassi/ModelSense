# playground/urls.py
from django.urls import path
from .views import hello, upload_model, upload_data

urlpatterns = [
    path('hello/', hello.say_hello, name='say_hello'),
    path('upload_model/', upload_model.UploadModelView.as_view(), name='upload_model'),
    path('upload_data/', upload_data.UploadDataView.as_view(), name='upload_data'),
    # Add more URL patterns as needed
]
