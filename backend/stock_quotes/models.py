from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(verbose_name='email address', blank=False, unique=True)
    first_name = models.CharField(verbose_name='first name', max_length=150, blank=False)
    last_name = models.CharField(verbose_name='last name', max_length=150, blank=False)

    class Meta:
        db_table = 'auth_user'


class Asset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=255)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    drop_percentage = models.DecimalField(max_digits=6, decimal_places=2)
    increase_percentage = models.DecimalField(max_digits=6, decimal_places=2)
    check_interval_minutes = models.PositiveIntegerField()

    class Meta:
        unique_together = ('user', 'code')

    def __str__(self):
        return self.code
    
    def getTunnelLowerLimit(self):
        return self.purchase_price * (1-self.drop_percentage/100)
    
    def getTunnelUpperLimit(self):
        return self.purchase_price * (1+self.increase_percentage/100)


class Price(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)


class EmailNotification(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=10)
    timestamp = models.DateTimeField(auto_now_add=True)