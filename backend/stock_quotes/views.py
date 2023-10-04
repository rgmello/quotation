from . import serializers
from .models import User, Asset
from .permissions import IsOwner
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .pagination import CustomizablePagination
from .scheduler import AssetQuotationScheduler
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView, DestroyAPIView
from .utils import get_hourly_values, get_monthly_values, get_annual_values


class UserCreateView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = serializers.UserSerializer


class UserDestroyView(DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user_assets = Asset.objects.filter(user=instance)
        for asset in user_assets:
            AssetQuotationScheduler.remove_job(asset.id)
        if instance is not None:
            if instance != request.user:
                return Response('Você não tem permissão para deletar outro usuário.', status=status.HTTP_401_UNAUTHORIZED)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def get_object(self):
        username = self.kwargs.get('username')
        obj = self.get_queryset().filter(username=username).first()
        return obj


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = serializers.CustomTokenObtainPairSerializer


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all().order_by('code')
    serializer_class = serializers.AssetSerializer
    pagination_class = CustomizablePagination
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        user = self.request.user
        return Asset.objects.filter(user=user).order_by('code')
    
    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        AssetQuotationScheduler.remove_job(instance.id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True)
    def prices(self, request, pk=None):
        try:
            asset = self.get_object()
            prices = asset.price_set.all().order_by('-timestamp')
            page_prices = self.paginate_queryset(prices)
            serializer = serializers.PriceSerializer(page_prices, many=True)
            return self.get_paginated_response(serializer.data)
        
        except Exception as e:
            print(f'Erro ao obter histórico de preços para {asset.code}: {e}')
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True)
    def cycle_prices(self, request, pk=None):
        try:
            asset = self.get_object()
            values = []

            year = request.query_params.get('year')
            if year: year = int(year)
            month = request.query_params.get('month')
            if month: month = int(month)
            day = request.query_params.get('day')
            if day: day = int(day)

            if day and month and year:
                values = get_hourly_values(asset.id, year, month, day)
            elif month and year:
                values = get_monthly_values(asset.id, year, month)
            elif not day and year:
                values = get_annual_values(asset.id, year)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(values, status=status.HTTP_200_OK)
        
        except ValueError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print(f'Erro ao obter variação diária para {asset.code}: {e}')
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)