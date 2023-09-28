from rest_framework.routers import DefaultRouter
from .views import AssetViewSet, PriceViewSet, NotificationViewSet

router = DefaultRouter()
router.register(r'assets', AssetViewSet)
router.register(r'prices', PriceViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = router.urls