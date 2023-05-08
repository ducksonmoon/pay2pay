import requests
import datetime

from django.utils import timezone

from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import Transaction
from transaction.serializers import TransactionSerializer


class TransactionTrigger(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, pk, format=None):
        snippet = get_object_or_404(Transaction, pk=pk)
        serializer = TransactionSerializer(snippet)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TransactionSerializer(
            data=request.data, context={"user": self.request.user}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionCheck(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    @staticmethod
    def check_wallet(transaction: Transaction) -> bool:
        wallet_history = get_transactions_history()
        for wallet_transaction in wallet_history:
            timestamp = wallet_transaction["block_timestamp"]
            wallet_transaction_datetime = datetime.datetime.fromtimestamp(
                timestamp / 1000
            )

            if (
                wallet_transaction["transaction_id"] == transaction.txid
                # and wallet_transaction_datetime >= transaction.created_time
            ):
                return True

        return False

    def get_transaction(self):
        return get_object_or_404(Transaction, ref=self.request.data["ref"])

    def post(self, request, format=None):
        transaction = self.get_transaction()
        if not transaction:
            return Response(status=status.HTTP_404_NOT_FOUND)

        is_alive = transaction.expire_time >= timezone.now()
        if not is_alive:
            return Response(status=status.HTTP_410_GONE)

        if self.check_wallet(transaction):
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


def get_balance():
    contract_address = (
        "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"  # USDT TRC20 contract address
    )
    wallet_address = "TWMsYUtqEAPxs7ZXuANkpABqGcixK3XZJD"  # wallet address

    url = f"https://apilist.tronscan.org/api/account?address={wallet_address}&includeToken=true"

    headers = {"accept": "application/json"}

    response = requests.get(url, headers=headers)

    data = response.json()

    if "error" in data:
        print(f"Error: {data['error']}")
    else:
        usdt_balance = None
        for token in data["trc20token_balances"]:
            if token["tokenName"] == "Tether USD":
                usdt_balance = round(
                    float(token["balance"]) * pow(10, -token["tokenDecimal"]), 6
                )
                break

        if usdt_balance is not None:
            print(f"USDT TRC20 balance in {wallet_address}: {usdt_balance}")
        else:
            print(f"USDT TRC20 token not found in {wallet_address}")


def get_transactions_history():
    contract_address = (
        "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"  # USDT TRC20 contract address
    )
    wallet_address = "TF1bYz1BE4n6zo2D4J2kDRK8MuqfbaCHgu"  # wallet address
    url = f"https://api.trongrid.io/v1/accounts/{wallet_address}/transactions/trc20?limit=20&contract_address={contract_address}"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)

    return response.json()["data"]
