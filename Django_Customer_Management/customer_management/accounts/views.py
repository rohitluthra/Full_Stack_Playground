from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from .forms import OrderForm, CreateUserForm
from django.forms import inlineformset_factory  # multiple forms within one form
from .filters import OrderFilter
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


def registerPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        form = CreateUserForm()
        if request.method == 'POST':
            form = CreateUserForm(request.POST)
            if form.is_valid():
                form.save()
                user = form.cleaned_data.get('username')
                messages.success(request, 'Account was created for ' + user)

                return redirect('login')

        context = {'form': form}
        return render(request, 'accounts/register.html', context)


def loginPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            un = request.POST.get('username')
            pas = request.POST.get('password')
            user = authenticate(request, username=un, password=pas)

            if user is not None:
                login(request, user)  # log this specific user in
                return redirect('home')
            else:
                messages.info(request, "username or password is incorrect")
        context = {}
        return render(request, 'accounts/login.html', context)


def logoutUser(request):
    logout(request)
    return redirect('login')


@login_required(login_url='login')
def home(request):
    orders = Order.objects.all()
    cust = Customer.objects.all()

    total_customers = cust.count()
    total_order = orders.count()
    delivered = orders.filter(status='Delivered').count()

    pending = orders.filter(status="Pending").count()
    context = {'orders': orders, 'customers': cust, 'total_order': total_order, 'total_customer': total_customers,
               'delivered': delivered, 'pending': pending}
    return render(request, 'accounts/dashboard.html', context)


@login_required(login_url='login')
def products(request):
    prod = Product.objects.all()
    return render(request, 'accounts/product.html', {'prod': prod})


@login_required(login_url='login')
def customers(request, pk):
    customer = Customer.objects.get(id=pk)
    orders = customer.order_set.all()  # querying customer child object
    order_count = orders.count()

    my_filter = OrderFilter(request.GET, queryset=orders)
    orders = my_filter.qs
    return render(request, 'accounts/customer.html',
                  {'customer': customer, 'orders': orders, 'order_count': order_count, 'my_filter': my_filter})


@login_required(login_url='login')
def createOrder(request, customerprimary):
    OrderFormSet = inlineformset_factory(Customer, Order, fields=('product', 'status'), extra=4)
    customer = Customer.objects.get(id=customerprimary)
    formset = OrderFormSet(queryset=Order.objects.none(), instance=customer)

    if request.method == 'POST':
        formset = OrderFormSet(request.POST, instance=customer)

        if formset.is_valid():
            formset.save()
            return redirect('/')

    context = {'formset': formset}
    return render(request, 'accounts/order_form.html', context)


@login_required(login_url='login')
def updateOrder(request, primaryKey):
    order = Order.objects.get(id=primaryKey)
    form = OrderForm(instance=order)
    if request.method == 'POST':
        form = OrderForm(request.POST, instance=order)
        if form.is_valid():
            form.save()
            return redirect('/')
    context = {'form': form}
    return render(request, 'accounts/order_form.html', context)


@login_required(login_url='login')
def deleteOrder(request, pk):
    order = Order.objects.get(id=pk)
    if request.method == 'POST':
        order.delete()
        return redirect('/')
    context = {'item': order}
    return render(request, 'accounts/delete.html', context)
