from django.db import transaction
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Customer, BankAccount, BankTransfer
from .serializers import CustomerSerializer, BankAccountSerializer, BankTransferSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def list(self, request, *args, **kwargs):
        customers = Customer.objects.in_bulk()
        response_data = {str(pk): CustomerSerializer(customer).data for pk, customer in customers.items()}
        return Response(response_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def bank_accounts(self, request, pk=None):
        customer = self.get_object()
        return Response(BankAccountSerializer(customer.bank_accounts.all(), many=True).data, status=status.HTTP_200_OK)


class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    lookup_field = "account_number"

    def list(self, request, *args, **kwargs):
        bank_accounts = BankAccount.objects.in_bulk(field_name="account_number")
        response_data = {account_number: BankAccountSerializer(bank_account).data for account_number, bank_account in bank_accounts.items()}
        return Response(response_data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        if serializer.is_valid():
            account = serializer.save()
            return Response(BankAccountSerializer(account).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=["get"])
    def balance(self, request, account_number=None):
        bank_account = self.get_object()
        return Response({"account_number": bank_account.account_number, "balance": bank_account.balance}, status=status.HTTP_200_OK)
            
    
    @action(detail=True, methods=["get"])
    def transfer_history(self, request, account_number=None):
        bank_account = self.get_object()
        transfers = bank_account.get_transfer_history()
        return Response(BankTransferSerializer(transfers, many=True).data, status=status.HTTP_200_OK)

    
class BankTransferViewSet(viewsets.ModelViewSet):
    queryset = BankTransfer.objects.all()
    serializer_class = BankTransferSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        transfer = serializer.save()

        return Response(BankTransferSerializer(transfer).data, status=status.HTTP_201_CREATED)
        