from venv import logger
from django.http import JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.conf import settings
import os

@method_decorator(csrf_exempt, name='dispatch')
class checkModelPNGStatus(View):
    def get(self, request, *args, **kwargs):
        try:
            # Handle model upload logic here
            if request.method == 'GET':
                path = os.path.join(settings.MEDIA_ROOT, 'generated_pngs')
                try:
                    my_model = os.listdir(path)[0]
                except IndexError:
                    return JsonResponse({'message': 'PNG not generated yet. Check back soon.'}, status=425)
                
                img = open(os.path.join(path, my_model), 'rb')
                print("image path located at: " + os.path.join(path, my_model))
                response = FileResponse(img)
                return response

            return JsonResponse({'message': 'Model upload failed'})
        except Exception as e:
            logger.error(f"Model Upload Failed: {e}")
            return JsonResponse({'message': f"Model upload failed: {e}"})

