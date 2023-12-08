from venv import logger
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.conf import settings
import os

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

                return JsonResponse({'message': 'Model uploaded successfully'})
            return JsonResponse({'message': 'Model upload failed'})
        except Exception as e:
            logger.error(f"Model Upload Failed: {e}")
            return JsonResponse({'message': f"Model upload failed: {e}"})
