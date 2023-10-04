from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'assets', views.AssetViewSet)


urlpatterns = [
    path('auth/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', views.UserCreateView.as_view(), name='auth_register'),
    path('auth/delete/<str:username>/', views.UserDestroyView.as_view(), name='auth_delete')
]


urlpatterns += router.urls