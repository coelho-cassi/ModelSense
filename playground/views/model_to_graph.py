from venv import logger
from django.http import JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.conf import settings
import os
import json


@method_decorator(csrf_exempt, name='dispatch')
class checkModelGraphStatus(View):
    def get(self, request, *args, **kwargs):
        try:
            # Handle model upload logic here
            if request.method == 'GET':
                path = os.path.join(settings.MEDIA_ROOT, 'generated_data')
                try:
                    my_model_data = os.listdir(path)[0]
                except IndexError:
                    return JsonResponse({'message': 'Graph not generated yet. Check back soon.'}, status=425)
                
                
                with open(os.path.join(path, my_model_data)) as f:
                    graph_data = json.load(f)
                    
                
                return JsonResponse(graph_data, status=200)

            return JsonResponse({'message': 'Model upload failed due to an unknown error.'}, status=425)
        except Exception as e:
            logger.error(f"Model Upload Failed: {e}")
            return JsonResponse({'message': f"Model upload failed: {e}"})

