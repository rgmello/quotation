from .models import Asset, Price
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from .scheduler import AssetQuotationScheduler
from .serializers import AssetSerializer, PriceSerializer


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        AssetQuotationScheduler.remove_job(instance.code)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PriceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer
