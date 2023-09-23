from django.urls import include, path

urlpatterns = [
    path('api/', include('stock_quotes.urls'))
]