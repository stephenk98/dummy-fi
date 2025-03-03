from rest_framework import serializers
from .models import Customer, BankAccount, BankTransfer

class BankAccountSerializer(serializers.ModelSerializer):
    initial_deposit = serializers.IntegerField(required=False, write_only=True)
    class Meta:
        model = BankAccount
        fields = '__all__'
        read_only_fields= ["balance", "account_number"]

    def create(self, validated_data):
        initial_deposit = validated_data.pop("initial_deposit", 0)
        bank_account = BankAccount.objects.create(balance=initial_deposit, **validated_data)
        return bank_account


class CustomerSerializer(serializers.ModelSerializer):
    bank_accounts = BankAccountSerializer(many=True, read_only=True)
    class Meta:
        model = Customer
        fields = '__all__'


class BankTransferSerializer(serializers.ModelSerializer):
    amount = serializers.IntegerField()

    class Meta:
        model = BankTransfer
        fields = '__all__'
    
    def validate(self, data):
        sender = data.get("sender")
        receiver = data.get("receiver")
        amount = data.get("amount")

        if sender == receiver:
            raise serializers.ValidationError("Cannot transfer funds to the same account")
        if amount <= 0:
            raise serializers.ValidationError("Amount must be greater than 0")
        if sender.balance < amount:
            raise serializers.ValidationError("Insufficient funds")
        
        return data
        
    def create(self, validated_data):
        sender = validated_data.get("sender")
        receiver = validated_data.get("receiver")
        amount = validated_data.get("amount")
        transfer = sender.transfer_funds(receiver, amount)
        return transfer
