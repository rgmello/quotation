from yfinance import Ticker
from rest_framework import serializers
from .scheduler import AssetQuotationScheduler
from .models import User, Asset, Price, EmailNotification
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], email=validated_data['email'], first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        user.set_password(validated_data['password'])
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        return token


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'
        read_only_fields = ['user', 'name']
    
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
        user = self.context['request'].user
        asset = Asset.objects.create(user=user, **validated_data)
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