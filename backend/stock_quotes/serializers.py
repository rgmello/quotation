from rest_framework import serializers
from yfinance import Ticker
from .models import Asset, Price, EmailNotification
from .scheduler import AssetQuotationScheduler

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'
        read_only_fields = ['name']
    
    def validate(self, data):
        try:
            code = data.get('code')
            name = Ticker(f'{code}.SA').get_info()['longName']
            if name:
                data['code'] = code.upper()
                data['name'] = name
            else:
                raise serializers.ValidationError('Nome do ativo não encontrado.')
        except Exception as e:
            raise serializers.ValidationError(f'Erro ao validar código do ativo: {e}')

        return data
    
    def create(self, validated_data):
        asset = super().create(validated_data)
        AssetQuotationScheduler.add_job(asset)
        return asset

    def update(self, instance, validated_data):
        asset = super().update(instance, validated_data)
        AssetQuotationScheduler.add_job(asset)
        return asset
    

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailNotification
        fields = '__all__'