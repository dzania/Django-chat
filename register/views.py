from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
# Create your views here.

def register(response):
    if response.user.is_authenticated:
        return redirect('/chat')

    if response.method == "POST":
        form = RegisterForm(response.POST)
        if form.is_valid():
            form.save()
            messages.success(response,"User created succesfully")
        return redirect("login")
    else:
        form = RegisterForm()
    return render(response,"register/register.html", {"form":form})

def loginPage(response):
    if response.user.is_authenticated:
        return redirect('/chat')

    if response.method == "POST":
        username = response.POST.get("username")
        password = response.POST.get("password")
        
        user = authenticate(response, username=username, password=password)
        if user is not None:
            login(response,user)
            return redirect('/chat')
    
    context ={}
    return render(response,'registration/login.html',context)
    


def logout(request):
    auth.logout(request)
