from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .pagination import CustomizablePagination
from .scheduler import AssetQuotationScheduler
from .models import Asset, Price, EmailNotification
from .utils import get_hourly_values, get_monthly_values, get_annual_values
from .serializers import AssetSerializer, PriceSerializer, NotificationSerializer

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all().order_by('code')
    serializer_class = AssetSerializer
    pagination_class = CustomizablePagination

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        AssetQuotationScheduler.remove_job(instance.code)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True)
    def prices(self, request, pk=None):
        try:
            asset = self.get_object()
            prices = asset.price_set.all().order_by('-timestamp')
            page_prices = self.paginate_queryset(prices)
            serializer = PriceSerializer(page_prices, many=True)
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
            elif year:
                values = get_annual_values(asset.id, year)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(values, status=status.HTTP_200_OK)
        
        except ValueError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print(f'Erro ao obter variação diária para {asset.code}: {e}')
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PriceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Price.objects.all().order_by('-timestamp')
    serializer_class = PriceSerializer
    pagination_class = CustomizablePagination


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EmailNotification.objects.all().order_by('-timestamp')
    serializer_class = NotificationSerializer
    pagination_class = CustomizablePagination