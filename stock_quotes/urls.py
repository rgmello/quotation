from rest_framework.routers import DefaultRouter
from .views import AssetViewSet, PriceViewSet

router = DefaultRouter()
router.register(r'assets', AssetViewSet)
router.register(r'prices', PriceViewSet)

urlpatterns = router.urls