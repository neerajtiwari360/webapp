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


@csrf_exempt 
def rgb_gray(request):
    context = {}
    temp_obj = image.objects.create()
    context['current_img'] = temp_obj
    temp_obj.delete()
    
    if ((request.method == "POST") and ("img" in request.FILES)):
        form = image_form(request.POST, request.FILES)
        
        cdt = datetime.now()
        title = str(cdt.date()) + '_' + str(cdt.hour) + "-" + str(cdt.minute) + "-" + str(cdt.second)
        
        request.FILES['img'].name = title + "_color.jpg"
        print(request.POST)
        print(request.FILES)
        
        if form.is_valid():
            img = form.cleaned_data.get("img")
            obj = image.objects.create(title = title, img = img)            

            np_img = cv2.imread("media/" + str(obj.img))
            
            if(request.POST.get("Submit") == "RGB to GRAY"):
                gray_img = cv2.cvtColor(np_img, cv2.COLOR_BGR2GRAY)            
                gray_img1 = cv2.imencode('.jpg', gray_img)[1]
                file = ContentFile(gray_img1)
                
                obj.modified.save(title + "_gray.jpg", file, save=True)
                
            elif(request.POST.get("Submit") == "Flip Image"):
                invt_img = cv2.flip(np_img, 1)            
                invt_img1 = cv2.imencode('.jpg', invt_img)[1]
                file = ContentFile(invt_img1)
                
                obj.modified.save(title + "_inverted.jpg", file, save=True)
            
            
            obj.save()
            
            # form = image_form(request.POST, request.FILES)
            context['form']= form
            context['current_img'] = obj
            
    else:
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
        print("*****")
        # print(type(np_image))
        
        # np_img = cv2.imread("media/" + image_file)
            
        if (len(np_img.shape) == 3):
            gray_img = cv2.cvtColor(np_img, cv2.COLOR_BGR2GRAY)            
            gray_img1 = cv2.imencode('.jpeg', gray_img)[1]
        elif (len(np_img.shape) < 3):
            gray_img1 = cv2.imencode('.jpeg', np_img)[1]
        file = ContentFile(gray_img1)
        
        # Encode the modified image as a base64 string
        modified_image_data = base64.b64encode(gray_img1).decode('utf-8')

        # Return the modified image data as the response
        return HttpResponse(modified_image_data, content_type='image/jpeg')
        
        # context = {'None': 'none'}
        # return JsonResponse(context)
    else:
        return HttpResponse('None')


@csrf_exempt 
def submit2(request):
    context = {}
    if (request.method == "POST"):
        # Get the image file from the POST request
        image_file = request.FILES['image']
        myfile = image_file.read()
        np_img = cv2.imdecode(np.frombuffer(myfile , np.uint8), cv2.IMREAD_UNCHANGED)
            
        invt_img = cv2.flip(np_img, 1)            
        invt_img1 = cv2.imencode('.jpeg', invt_img)[1]
        
        # Encode the modified image as a base64 string
        modified_image_data = base64.b64encode(invt_img1).decode('utf-8')

        # Return the modified image data as the response
        return HttpResponse(modified_image_data, content_type='image/jpeg')
    else:
        return HttpResponse('None')


