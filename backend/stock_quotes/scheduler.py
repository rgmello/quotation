from time import sleep
from .models import Asset
from .threads import QuotationThread
from django.db.utils import OperationalError


class AssetQuotationScheduler:
    _threads: dict[str, QuotationThread] = {}

    @classmethod
    def start_initial_jobs(cls) -> None:
        counter = 0
        try:
            assets = Asset.objects.all()
            for asset in assets:
                if asset.code not in cls._threads:
                    cls.add_job(asset)
        except OperationalError as e:
            counter += 1
            if counter > 5: raise e
            sleep(1)

    @classmethod
    def add_job(cls, asset: Asset) -> None:
        cls.remove_job(asset.code)
        thread = QuotationThread(asset)
        cls._threads[asset.code] = thread
        thread.daemon = True
        thread.start()

    @classmethod
    def remove_job(cls, asset_code: str) -> None:
        thread = cls._threads.get(asset_code)
        if thread:
            thread.stop()
            thread.join()
            del cls._threads[asset_code]