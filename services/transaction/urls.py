from django.urls import path, include

from transaction import views

urlpatterns = [
    path('trigger/', views.TransactionTrigger.as_view()),
    path('trigger/<int:pk>/', views.TransactionTrigger.as_view()),
    path('check/', views.TransactionCheck.as_view()),
]