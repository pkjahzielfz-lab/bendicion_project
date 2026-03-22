from django.shortcuts import render

def home(request):
    return render(request, 'tienda/index.html')