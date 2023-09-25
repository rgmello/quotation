from django.apps import AppConfig


class StockQuotesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'stock_quotes'

    def ready(self) -> None:
        from .scheduler import AssetQuotationScheduler
        AssetQuotationScheduler.start_initial_jobs()