from django.forms import ModelForm
from .models import *
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import User


class OrderForm(ModelForm):
    class Meta:
        model = Order
        # go ahead and create a form with all the fields present in Order model in models.py
        # IF you only want specific fields, put them in a list. ['name', 'gender'] only.
        fields = '__all__'


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
