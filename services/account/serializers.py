from rest_framework import serializers

from .utils import send_email, reset_password
from core.models import Account, Wallet


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("email",)
        read_only_fields = ("id",)


    def create(self, validated_data):
        """ Create a new user with encrypted password and return it. """
        validated_data['email'] = validated_data['email'].lower()
        account = Account.objects.create_user(**validated_data)
        account = reset_password(account)
        wallet = Wallet.objects.create(owner=account)

        return account


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("email",)
        read_only_fields = ("id",)
    
    def update(self, instance, validated_data):
        user = Account.objects.get(email=instance)
        user = reset_password(user)

        return user
