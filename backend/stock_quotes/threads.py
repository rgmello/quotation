import threading
import time
from .models import Asset, Price
import yfinance as yf

class QuotationThread(threading.Thread):
    def __init__(self, asset: Asset, interval_minutes: float):
        super().__init__()
        self.asset = asset
        self.interval_minutes = interval_minutes
        self._stop_event = threading.Event()

    def run(self):
        code = self.asset.code

        while not self._stop_event.is_set():
            start_time, elapsed_time = time.time(), 0
            last_price = yf.Ticker(f'{code}.SA').history(period='1d')['Close'].iloc[-1]
            Price.objects.create(asset=self.asset, price=last_price)

            while elapsed_time < 60 * self.interval_minutes and not self._stop_event.is_set():
                elapsed_time = time.time() - start_time
                time.sleep(1)
    
    def stop(self):
        self._stop_event.set()
