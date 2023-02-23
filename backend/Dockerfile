
FROM python:3.10
WORKDIR .
COPY . . 
RUN pip install pipenv
RUN pipenv install
CMD ["python", "manage.py", "runserver"]
EXPOSE 8000
