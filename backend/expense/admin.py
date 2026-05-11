from django.contrib import admin
from .models import UserDetail,Expense # Importing UserDetails & Expense from the models.py file
# from .models import * 

# Register your models here.
admin.site.register(UserDetail)
admin.site.register(Expense)

