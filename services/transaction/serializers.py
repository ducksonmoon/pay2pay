from rest_framework import serializers

from core.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["amount", "ref", "txid"]
        read_only_fields = ["ref"]

    def create(self, validated_data):
        receiver = "sag2sag"
        user = self.context["user"]
        payload = dict(
            trigger=user,
            sender=user.wallet,
            receiver=receiver,
            txid=validated_data["txid"],
            amount=validated_data["amount"],
        )
        return Transaction.objects.create(**payload)


class TransactionCheck(serializers.Serializer):
    ref = serializers.UUIDField()
