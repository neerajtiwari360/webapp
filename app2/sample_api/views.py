from django.shortcuts import render
from .models import *
from django.urls import reverse
import cv2
import numpy as np
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.shortcuts import HttpResponse
import base64
from django.http import JsonResponse
import os

# import sys
# sys.path.insert(1, '/home/poorna/Desktop/Meta Brix/webapp/app2/tracer')
# from tracer import main
# from app2.tracer.tracer_main import main as tracer_main

@csrf_exempt 
def rgb_gray(request):
    context = {}
    temp_obj = image.objects.create()
    context['current_img'] = temp_obj
    temp_obj.delete()
    
    form = image_form()
    context['form']= form
        
    return render(request, "home.html", context)
    
    
@csrf_exempt 
def submit1(request):
    context = {}
    if (request.method == "POST"):
        print("*****")
        print(request.FILES)
        print(request.POST)
        
        # Get the image file from the POST request
        image_file = request.FILES['image']
        myfile = image_file.read()
        np_img = cv2.imdecode(np.frombuffer(myfile , np.uint8), cv2.IMREAD_UNCHANGED)
        
        print(np_img.shape)
        
        # print(type(np_image))
        
        # np_img = cv2.imread("media/" + image_file)
        cv2.imwrite("tracer/data/custom_dataset/test.png", np_img)
        # main.main("runserver")
        os.system("pwd")
        os.system("python3 tracer/main.py")
        mask_img = cv2.imread("tracer/mask/custom_dataset/test.png")
        mask_img1 = cv2.imencode('.png', mask_img)[1]
        print("*****")
        
        # Encode the modified image as a base64 string
        modified_image_data = base64.b64encode(mask_img1).decode('utf-8')

        # Return the modified image data as the response
        return HttpResponse(modified_image_data, content_type='image/png')
    else:
        return HttpResponse('None')
