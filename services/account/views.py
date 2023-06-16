from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from account.serializers import AccountSerializer, SessionSerializer, ProfileAssesmentSerializer
from core.models import Account, ProfileAssesment


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all().order_by('-date_joined')
    serializer_class = AccountSerializer

    def retrieve(self, request, pk=None):
        queryset = Account.objects.all()
        user = get_object_or_404(queryset, email=request.user.email)
        serializer = self.serializer_class(user)
        return Response(serializer.data)


class ProfileAssesmentView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ProfileAssesment.objects.all()
    serializer_class = ProfileAssesmentSerializer


class AccountSessionView(generics.UpdateAPIView):
    def get_object(self):
        return get_object_or_404(Account, email=self.request.data.get('email').lower())

    def get_serializer_class(self):
        return SessionSerializer


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        request.data['username'] = request.data['username'].lower()
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
