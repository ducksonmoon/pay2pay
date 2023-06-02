from django.urls import include, path
from rest_framework import routers

from account.views import AccountSessionView, CustomAuthToken, AccountViewSet
from rest_framework.authtoken import views

urlpatterns = [
    path('register/', AccountViewSet.as_view({'post': 'create'})),
    path('create-session/', AccountSessionView.as_view()),
    path('api-token-auth/', CustomAuthToken.as_view())
]
