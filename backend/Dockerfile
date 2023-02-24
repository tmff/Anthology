#!/bin/sh
FROM --platform=linux/amd64 python:3.10
WORKDIR .
COPY . . 
RUN pip install pipenv
RUN pipenv requirements > requirements.txt
COPY requirements.txt .

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver"]

EXPOSE 8000
