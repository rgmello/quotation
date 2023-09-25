from .models import Asset
from .threads import QuotationThread

class AssetQuotationScheduler:
    _threads = {}

    @classmethod
    def start_initial_jobs(cls):
        assets = Asset.objects.all()
        for asset in assets:
            if asset.code not in cls._threads:
                cls.add_job(asset)

    @classmethod
    def add_job(cls, asset: Asset):
        cls.remove_job(asset.code)
        thread = QuotationThread(asset, asset.check_interval_minutes)
        cls._threads[asset.code] = thread
        thread.daemon = True
        thread.start()

    @classmethod
    def remove_job(cls, asset_code: str):
        thread = cls._threads.get(asset_code)
        if thread:
            thread.stop()
            thread.join()
            del cls._threads[asset_code]

    @classmethod
    def get_thread(cls, asset_code: str):
        return cls._threads.get(asset_code)

    @classmethod
    def get_all_threads(cls):
        return cls._threads