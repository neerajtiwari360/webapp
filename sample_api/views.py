from django.shortcuts import render
from .models import *
from django.shortcuts import render
from django.urls import reverse
import cv2
import numpy as np
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime


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
            
            if(request.POST.get("Submit") == "RGB_GRAY"):
                gray_img = cv2.cvtColor(np_img, cv2.COLOR_BGR2GRAY)            
                gray_img1 = cv2.imencode('.jpg', gray_img)[1]
                file = ContentFile(gray_img1)
                
                obj.modified.save(title + "_gray.jpg", file, save=True)
                
            elif(request.POST.get("Submit") == "RGB_XYZ"):
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
    