"""sample_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from sample_api.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', rgb_gray, name="rgb_gray"),
    path('submit1/', submit1, name="submit1"),
]

from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += static('/home/poorna/Desktop/Meta Brix/webapp/app2/tracer/object/custom_dataset/',
#                       document_root='/home/poorna/Desktop/Meta Brix/webapp/app2/tracer/object/custom_dataset')