from django.db import models

class Asset(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=255)
    tunnel_lower_limit = models.DecimalField(max_digits=10, decimal_places=2)
    tunnel_upper_limit = models.DecimalField(max_digits=10, decimal_places=2)
    check_interval_minutes = models.PositiveIntegerField()

    def __str__(self):
        return self.symbol

class Price(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

class EmailNotification(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=10)
    timestamp = models.DateTimeField(auto_now_add=True)