FROM python:3.11
WORKDIR /app/backend
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN python manage.py makemigrations
RUN python manage.py migrate
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "--noreload", "0.0.0.0:8000"]
