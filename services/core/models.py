import uuid
import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from core.managers import CustomUserManager


class Account(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    VERFICATION = [
        (1, "No Request"),
        (2, "Pending"),
        (3, "Verified")
    ]
    verified = models.CharField(max_length=1, choices=VERFICATION, default=1)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Wallet(models.Model):
    owner = models.OneToOneField(Account, on_delete=models.CASCADE, related_name="wallet")
    address = models.CharField(max_length=255)
    balance = models.FloatField(default=0)


class Transaction(models.Model):
    trigger = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL)
    sender = models.CharField(max_length=255)
    receiver = models.CharField(max_length=255)
    amount = models.FloatField()
    txid = models.CharField(max_length=255)
    created_time = models.DateTimeField(default=datetime.datetime.now(), editable=False)
    expire_time = models.DateTimeField(default=datetime.datetime.now() + datetime.timedelta(minutes=15), editable=False)
    ref = models.CharField(max_length=150, unique=True, default=uuid.uuid4)
    TRANSACTION_TYPE = [
        (1, "recive"),
        (2, "send")
    ]  
    action = models.CharField(max_length=1, choices=TRANSACTION_TYPE)
    STATE_TYPE = [
        (1, "pending"),
        (2, "done")
    ]
    state = models.CharField(max_length=1, choices=TRANSACTION_TYPE, default=1)
    
    def __str__(self):
        return f"{self.trigger}: {self.created_time} - {self.expire_time}"


class IntrestRate(models.Model):
    rate = models.FloatField()
    created_time = models.DateTimeField(default=datetime.datetime.now(), editable=False)

    def __str__(self):
        return f"{self.rate}"


class ProfileAssesment(models.Model):
    picture = models.ImageField(upload_to ='uploads/')
    user = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL)
    created_time = models.DateTimeField(default=datetime.datetime.now(), editable=False)
