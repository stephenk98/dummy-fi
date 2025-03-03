from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, BankAccountViewSet, BankTransferViewSet

router = DefaultRouter()
router.register(r"customers", CustomerViewSet, basename="customer")
router.register(r"bank_accounts", BankAccountViewSet, basename="account")
router.register(r"bank_transfers", BankTransferViewSet, basename="bank-transfer")

urlpatterns = [
    path("", include(router.urls)),
    path("bank_accounts/<str:account_number>/balance/", BankAccountViewSet.as_view({"get": "balance"}), name="account-balance"),
    path("bank_accounts/<str:account_number>/transfer-history/", BankAccountViewSet.as_view({"get": "transfer_history"}), name="account-transfer-history"),
]