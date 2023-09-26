from .models import Asset, Price
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .scheduler import AssetQuotationScheduler
from .serializers import AssetSerializer, PriceSerializer
from .pagination import AssetPagination

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all().order_by('code')
    serializer_class = AssetSerializer
    pagination_class = AssetPagination

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        AssetQuotationScheduler.remove_job(instance.code)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True)
    def prices(self, request, pk=None):
        asset = self.get_object()
        prices = asset.price_set.all().order_by('-timestamp')
        page = self.paginate_queryset(prices)
        if page is not None:
            serializer = PriceSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = PriceSerializer(prices, many=True)
        return Response(serializer.data)


class PriceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Price.objects.all().order_by('-timestamp')
    serializer_class = PriceSerializer
