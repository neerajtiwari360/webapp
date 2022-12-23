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

def make_square_frames(video, frames):
    pass

@csrf_exempt 
def submit1(request):
    if (request.method == "POST"):
        print(">?<?>", request.POST)
        print(">?<?>", request.FILES)
        
        video_file = request.FILES['video']
        video_data = video_file.read()
        
        FILE_OUTPUT = 'media/output.mp4'
        
        if os.path.isfile(FILE_OUTPUT):
            os.remove(FILE_OUTPUT)

        out_file = open(FILE_OUTPUT, "wb") 
        out_file.write(video_data)
        out_file.close()
        
        video_data = cv2.VideoCapture('media/output.mp4')
        print(type(video_data))
        
        if not os.path.exists('media/data'):
            os.makedirs('media/data')
        else:
            folder = 'media/data'
            for filename in os.listdir(folder):
                file_path = os.path.join(folder, filename)
                os.unlink(file_path)
                
        total_frames = 0
        while True:
            flag, img = video_data.read()
            if flag:
                total_frames += 1    
            else:
                break
            
        video_data.release()
        video_data = cv2.VideoCapture('media/output.mp4')
            
        req_frames = request.POST['no_frames']
        if req_frames == '':
            return JsonResponse({'error':'Enter no of frames to generate'})
             
        req_frames = int(req_frames)   
        fps = int(total_frames/req_frames)
        
        frames = 0
        frame_no = 1
        while True:
            flag, img = video_data.read()
            if flag:
                frames += 1    
            else:
                break           
            
            height, width, channels = img.shape

            x = height if height > width else width
            y = height if height > width else width
            
            square = np.zeros((x, y, 3), np.uint8)
            
            square[int((y-height)/2):int(y-(y-height)/2),
                int((x-width)/2):int(x-(x-width)/2)] = img
            
            if frames%fps == 1:
                name = 'media/data/frame' + str(frame_no) + '.jpg'
                frame_no += 1
                print("Saving...", name)

                cv2.imwrite(name, square)

        video_data.release()
        
        shutil.make_archive("media/frames", 'zip', 'media/', 'data')
        
        return JsonResponse({'error':'', 'first_img':'/media/data/frame13.jpg',
                             'zip_file' : '/media/frames.zip'})
    else:
        return HttpResponse('None')