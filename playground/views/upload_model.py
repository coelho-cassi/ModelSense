from venv import logger
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.conf import settings
import os

from subprocess import call

@method_decorator(csrf_exempt, name='dispatch')
class UploadModelView(View):
    def post(self, request, *args, **kwargs):
        try:
            # Handle model upload logic here
            if request.method == 'POST':
                uploaded_model = request.FILES['model']

                # Set the file path where you want to save the uploaded file
                file_path = os.path.join(settings.MEDIA_ROOT, 'uploads', uploaded_model.name)

                # Create the 'uploads' directory if it doesn't exist
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                
                # Save the uploaded file to the specified location
                with open(file_path, 'wb') as destination:
                    for chunk in uploaded_model.chunks():
                        destination.write(chunk)

                loc = os.path.join(settings.PLAYGROUND_ROOT, 'helpers')
                
                python_executable_path = os.path.abspath(os.path.join(loc, "../../../../../../.virtualenvs/12_2_2023-9X_rZnMF/Scripts/python.exe"))

                print("Location (loc):", loc)
                print("Python Executable Path:", python_executable_path)

                call([python_executable_path, "gen_png.py"], cwd=loc)

                return JsonResponse({'message': 'Model uploaded successfully'})
            return JsonResponse({'message': 'Model upload failed'})
        except Exception as e:
            logger.error(f"Model Upload Failed: {e}")
            return JsonResponse({'message': f"Model upload failed: {e}"})
