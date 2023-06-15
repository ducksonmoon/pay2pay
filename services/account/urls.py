from django.urls import include, path
from rest_framework import routers

from account.views import AccountSessionView, CustomAuthToken, AccountViewSet, ProfileAssesmentView
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register('assessment', ProfileAssesmentView, 'assessment')

urlpatterns = [
    path('register/', AccountViewSet.as_view({'post': 'create'})),
    path('info/', AccountViewSet.as_view({'get': 'retrieve'})),
    path('create-session/', AccountSessionView.as_view()),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('', include(router.urls))
]
