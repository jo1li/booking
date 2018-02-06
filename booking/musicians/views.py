from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("<html><body>Welcome to OpusApps Booking!!!1!</body></html>")
