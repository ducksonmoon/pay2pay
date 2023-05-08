from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from account.views import AccountViewSet

router = routers.DefaultRouter()
router.register(r'account', AccountViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path("admin/", admin.site.urls),
    path('auth/', include('account.urls')),
    path('transaction/', include('transaction.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
