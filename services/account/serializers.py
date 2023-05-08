from rest_framework import serializers

from core.models import Account, Wallet


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("email", "password")
        read_only_fields = ("id",)
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 5},
        }


    def create(self, validated_data):
        """ Create a new user with encrypted password and return it. """
        validated_data['email'] = validated_data['email'].lower()
        account = Account.objects.create_user(**validated_data)
        wallet = Wallet.objects.create(owner=account)

        return account


    def update(self, instance, validated_data):
        """ Update a user, setting the password correctly and return it """
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user
