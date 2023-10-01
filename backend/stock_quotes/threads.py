import time
import threading
import yfinance as yf
from decouple import config
from django.core.mail import send_mail
from .models import Asset, Price, EmailNotification


class QuotationThread(threading.Thread):
    def __init__(self, asset: Asset):
        super().__init__()
        self.asset = asset
        self._died = False
    
    def stop(self):
        self._died = True

    def run(self):
        while not self._died:
            start_time, elapsed_time = time.time(), 0

            try:
                last_price = self.get_last_price()
                recommendation = self.get_recommendation(last_price)
                #if recommendation: self.send_email_notification(recommendation)
            except Exception as e:
                print(f'Não foi possível monitorar a ação {self.asset.code}:\n{e}')

            while not self._died and elapsed_time < 60 * self.asset.check_interval_minutes:
                elapsed_time = time.time() - start_time
                time.sleep(1)

    def get_last_price(self) -> float:
        try:
            last_price = yf.Ticker(f'{self.asset.code}.SA').history(period='1d')['Close'].iloc[-1]
            Price.objects.create(asset=self.asset, price=last_price)
            return last_price
        except Exception as e:
            print(f'Erro ao obter último valor da ação {self.asset.code}.')
            raise(e)
    
    def get_recommendation(self, price: float) -> str:
        if price < self.asset.tunnel_lower_limit: return 'buy'
        if price > self.asset.tunnel_upper_limit: return 'sell'
        return ''
    
    def send_email_notification(self, recommendation: str) -> None:
        subject = f'Recomendação para ativo {self.asset.code}'
        message = f'Recomendamos a {"compra" if recommendation == "buy" else "venda"} imediata de suas ações {self.asset.code}.'
        from_email = config('DEFAULT_FROM_EMAIL')
        recipient_list = [config('EMAIL_INVESTOR_USER')]

        try:
            send_mail(subject, message, from_email, recipient_list)
            EmailNotification.objects.create(asset=self.asset, notification_type=recommendation)
        except Exception as e:
            print(f'Erro ao enviar recomendação quanto à ação {self.asset.code} para o e-mail do investidor.')
            raise(e)
