from typing import List
from .models import Price
from datetime import datetime, timedelta
from django.utils.timezone import make_aware


def get_hourly_values(asset_id: int, year: int, month: int, day: int) -> List[dict]:
    """
    Calcula a variação horária dos preços de um ativo para um dia específico.

    Returns:
        List[float]: Uma lista de preços por hora ao longo do dia.
    """
    current_date = make_aware(datetime(year, month, day, 1))
    hourly_values = []
    next_date = current_date + timedelta(days=1)

    while current_date < next_date:
        last_price = Price.objects.filter(
            asset_id=asset_id,
            timestamp__lt=current_date
        ).order_by('-timestamp').first()

        hourly_values.append(last_price.price if last_price is not None else 0.0)
        current_date += timedelta(hours=1)

    return hourly_values


def get_monthly_values(asset_id: int, year: int, month: int) -> List[dict]:
    """
    Calcula a variação mensal dos preços de um ativo para um mês específico.

    Returns:
        List[float]: Uma lista de preços por dia ao longo do mês.
    """
    current_date = make_aware(datetime(year, month, 2))
    monthly_values = []
    next_month = current_date + timedelta(days=31)
    next_month = next_month.replace(day=2)

    while current_date < next_month:
        last_price = Price.objects.filter(
            asset_id=asset_id,
            timestamp__lt=current_date
        ).order_by('-timestamp').first()

        monthly_values.append(last_price.price if last_price is not None else 0.0)
        current_date += timedelta(days=1)

    return monthly_values


def get_annual_values(asset_id: int, year: int) -> List[dict]:
    """
    Calcula a variação anual dos preços de um ativo para um ano específico.

    Returns:
        List[float]: Uma lista de preços por mês ao longo do ano.
    """
    current_date = make_aware(datetime(year, 2, 1))
    annual_values = []
    next_year = current_date.replace(month=12, day=31) + timedelta(days=32)

    while current_date < next_year:
        last_price = Price.objects.filter(
            asset_id=asset_id,
            timestamp__lt=current_date
        ).order_by('-timestamp').first()

        annual_values.append(last_price.price if last_price is not None else 0.0)
        current_date = (current_date + timedelta(days=31)).replace(day=1)

    return annual_values