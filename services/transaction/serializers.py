from datetime import datetime

from rest_framework import serializers

from core.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField(source="created_time")

    class Meta:
        model = Transaction
        fields = [
            "ref", 
            "txid", 
            "amount",
            "receiver", 
            "created_time", 
            "action", 
            "state", 
            "formatted_date"
        ]
        read_only_fields = ["ref", "formatted_date"]

    def get_formatted_date(self, obj):
        return obj.created_time.strftime("%m %b %Y")
        
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
