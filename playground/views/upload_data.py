from venv import logger
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.conf import settings
import os

@method_decorator(csrf_exempt, name='dispatch')
class UploadDataView(View):
    def post(self, request, *args, **kwargs):
        try:
            # Handle model upload logic here
            if request.method == 'POST':
                uploaded_data = request.FILES['data']

                # Set the file path where you want to save the uploaded file
                file_path = os.path.join(settings.MEDIA_ROOT, 'data', uploaded_data.name)

                # Create the 'uploads' directory if it doesn't exist
                os.makedirs(os.path.dirname(file_path), exist_ok=True)

                # Save the uploaded file to the specified location
                with open(file_path, 'wb') as destination:
                    for chunk in uploaded_data.chunks():
                        destination.write(chunk)

                return JsonResponse({'message': 'Data uploaded successfully'})
            return JsonResponse({'message': 'Data upload failed'})
        except Exception as e:
            logger.error(f"Data Upload Failed: {e}")
            return JsonResponse({'message': f"Data upload failed: {e}"})
