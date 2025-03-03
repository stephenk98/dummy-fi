import uuid
from django.db import models, transaction
from django.db.models import Q
from .mixins import CreatedUpdatedMixin, UUIDPKMixin

class Customer(UUIDPKMixin, CreatedUpdatedMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True, db_index=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
    def create_bank_account(self, initial_deposit=0):
        return BankAccount.create(customer_id=self.id, initial_deposit=initial_deposit)
    
class BankAccount(UUIDPKMixin, CreatedUpdatedMixin):
    account_number = models.CharField(max_length=12, unique=True, db_index=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='bank_accounts')
    balance = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.account_number} - {self.customer}'
    
    def __generate_account_number(self):
        # Generates a random 12-digit account number that doesn't already exist
        return str(uuid.uuid4().int)[:12]
            
    def save(self, *args, **kwargs):
        if not self.account_number:
            self.account_number = self.__generate_account_number()
        super().save(*args, **kwargs)
    
    def get_transfer_history(self):
        return BankTransfer.objects.filter(
            Q(sender_id=self.id) | Q(receiver_id=self.id)
        ).select_related("sender", "receiver").order_by("-created_at")
    
    def transfer_funds(self, receiver, amount):
        with transaction.atomic():
            self.balance -= amount
            receiver.balance += amount
            self.save(update_fields=["balance"])
            receiver.save(update_fields=["balance"])

            transfer = BankTransfer.objects.create(
                sender=self,
                receiver=receiver,
                amount=amount,
            )
            return transfer

    
class BankTransfer(UUIDPKMixin, CreatedUpdatedMixin):
    amount = models.IntegerField()
    sender = models.ForeignKey(BankAccount, on_delete=models.SET_NULL, related_name='transfers_sent', db_index=True, null=True)
    receiver = models.ForeignKey(BankAccount, on_delete=models.SET_NULL, related_name='transfers_received', db_index=True, null=True)
