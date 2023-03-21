#!/bin/sh
FROM python:3.10

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Copy everything over
WORKDIR /backend
COPY . /backend
RUN pip install pipenv
RUN pipenv requirements > requirements.txt

RUN pip install -r requirements.txt

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000

EXPOSE 8000
