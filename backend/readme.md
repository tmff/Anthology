To work in this directory please use a virtual enviroment.
1. pip install pipenv
2. pipenv shell
3. pipenv install django
4. pipenv install psycopg2-binary       (if this doenst work try without -binary)


Postgresql:
Install Postrgesql

Create database named userdb

Create user named anth with password eevee

Start postgresql server

Thanks!

Usefull commands:
Start Server

python manage.py runserver

Go to localhost:8000 in web browser to see this, to specify port add it as an arguement in the previous command

Create App


python manage.py startapp yourappnamehere