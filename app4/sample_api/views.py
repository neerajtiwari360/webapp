from django.shortcuts import render
from .models import *
from django.urls import reverse
import cv2, os
import numpy as np
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.shortcuts import HttpResponse
import base64, shutil
from django.http import JsonResponse

@csrf_exempt 
def home(request):
    context = {}
    
    if (request.method == "POST"):
        print()
    else:
        print()
        
    return render(request, "home.html", context)

@csrf_exempt 
def submit1(request):
    if (request.method == "POST"):
        print(">?<?>", request.POST)
        print(">?<?>", request.FILES)
        
        image_file = request.FILES['image']
        image_data = image_file.read()
        np_img = cv2.imdecode(np.frombuffer(image_data , np.uint8), cv2.IMREAD_UNCHANGED)
        
        print(np_img.shape)
        cv2.imwrite("media/input.png", np_img)
        
        os.system("pwd")
        # This main.py should store the output .glb file inside static with name model.glb
        os.system("python3 module/main.py")
        
        return JsonResponse({'model' : '/static/model.glb'})
    else:
        return HttpResponse('None')