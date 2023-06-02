from rest_framework import serializers

from core.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["amount", "ref", "txid", "action", "receiver"]
        read_only_fields = ["ref"]

    def create(self, validated_data):
        user = self.context["user"]
        payload = dict(
            trigger=user,
            sender=user.wallet,
            receiver=validated_data["receiver"],
            txid=validated_data["txid"],
            amount=validated_data["amount"],
            action=validated_data["action"],
        )

        return Transaction.objects.create(**payload)


class TransactionCheck(serializers.Serializer):
    ref = serializers.UUIDField()
