from django.contrib import admin

from core.models import Transaction, ProfileAssesment, Account


admin.site.register(Transaction)
admin.site.register(ProfileAssesment)
admin.site.register(Account)