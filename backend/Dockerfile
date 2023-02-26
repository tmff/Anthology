#!/bin/sh
FROM python:3.10
ENV PYTHONUNBUFFERED=1
WORKDIR .
COPY . . 
RUN pip install pipenv
RUN pipenv requirements > requirements.txt
COPY requirements.txt .

RUN pip install -r requirements.txt

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000

EXPOSE 8000
