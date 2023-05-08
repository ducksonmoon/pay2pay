from django.urls import include, path
from rest_framework import routers

from account.views import AccountSessionView, CustomAuthToken
from rest_framework.authtoken import views

urlpatterns = [
    path('session/', AccountSessionView.as_view()),
    path('api-token-auth/', CustomAuthToken.as_view())
]
