from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import * # Importing UserDetails module 
# Create your views here.

# Signup API :- 
@csrf_exempt
def signup(request):
    if request.method == 'POST':
      data =  json.loads(request.body)
      fullname = data.get('FullName')
      email = data.get('Email')
      password = data.get('Password')

    if UserDetail.objects.filter(Email=email).exists():
       return JsonResponse({'message':'Email already exists '},status=400)
    UserDetail.objects.create(FullName=fullname,Email=email,Password=password)
    return JsonResponse({'message':'User registered Successfully'},status=201)

# Login API :- 
@csrf_exempt
def login(request):
    if request.method == 'POST':
      data =  json.loads(request.body)
      email = data.get('Email')
      password = data.get('Password')

    try :
      user = UserDetail.objects.get(Email=email,Password=password)
      return JsonResponse({'message':'Login Successful','userId':user.id,'userName':user.FullName},status=200)
    
    except :
       return JsonResponse({'message':'Invalid Credentials'},status=400)

# Add Expense API :- 
@csrf_exempt
def add_expense(request):
    if request.method == 'POST':
      data =  json.loads(request.body)
      user_id = data.get('UserId')
      expense_date = data.get('ExpenseDate')
      expense_item = data.get('ExpenseItem')
      expense_cost = data.get('ExpenseCost')

    user = UserDetail.objects.get(id = user_id)
    try :
      Expense.objects.create(UserId=user,ExpenseDate=expense_date,ExpenseItem=expense_item,ExpenseCost=expense_cost)
      return JsonResponse({'message':'Expense added successfully'},status=201)
    
    except Exception as e:
       return JsonResponse({'message':'Something went wrong','error':str(e)},status=400)


# Manage Expense API :- 
@csrf_exempt
def manage_expense(request,user_id):
    if request.method == 'GET':
      expenses = Expense.objects.filter(UserId=user_id)
      expense_list = list(expenses.values())
      return JsonResponse(expense_list,safe=False)
    
    
# Update Expense API :- 
@csrf_exempt
def update_expense(request,expense_id):
    if request.method == 'PUT':
      data =  json.loads(request.body)
    try :
      expense = Expense.objects.get(id=expense_id)
      expense.ExpenseDate = data.get('ExpenseDate',expense.ExpenseDate)
      expense.ExpenseItem = data.get('ExpenseItem',expense.ExpenseItem)
      expense.ExpenseCost = data.get('ExpenseCost',expense.ExpenseCost)
      expense.save()
      return JsonResponse({'message':'Expense Updated Successfully'})

    except :
      return JsonResponse({'message':'Expense Not found'},status=404)
    
# Deleting Expense API :- 
@csrf_exempt
def delete_expense(request,expense_id):
  if request.method == 'DELETE':
    try :
      expense = Expense.objects.get(id=expense_id)
      expense.delete()
      return JsonResponse({'message':'Expense Deleted Successfully'},status=200)

    except :
      return JsonResponse({'message':'Expense Not found'},status=404)
    
# Search Expense API :- 
from django.db.models import Sum
@csrf_exempt
def search_expense(request,user_id):
    if request.method == 'GET':
      from_date = request.GET.get('from')
      to_date = request.GET.get('to')
      expenses = Expense.objects.filter(UserId=user_id,ExpenseDate__range=[from_date,to_date])
      expense_list = list(expenses.values())
      agg = expenses.aggregate(Sum('ExpenseCost'))
      total = agg['ExpenseCost__sum'] or 0

      return JsonResponse({'expenses':expense_list,'total':total})
    
# Confirm Password API :-
@csrf_exempt
def change_password(request,user_id):
    if request.method == 'POST':
      data =  json.loads(request.body)

      old_Password = data.get('oldPassword')
      new_Password = data.get('newPassword')

    try :
      user = UserDetail.objects.get(id = user_id)
      if user.Password != old_Password :
        return JsonResponse({'message':'Old Password is incorrect'},status=400)
      user.Password = new_Password
      user.save()
      return JsonResponse({'message':'Password changed successfully'},status=200)
    
    except :
       return JsonResponse({'message':'User not found'},status=404)

