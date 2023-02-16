
<h1>Backend Setup</h1>

To work in this directory please use a virtual enviroment with python 3.10, these commands are unix ones they will be similar on windows but not too bad.

<h2>Setting up virtual enviroment with django and postgresql library</h2>

<ol>
    <li>pip install pipenv</li>
    <li>pipenv install django</li>
    <li>pipenv shell</li>
    <li>pipenv install psycopg2-binary(if this doenst work try without -binary)</li>
</ol>

<h2>Postgresql setup</h2>

<ol>
    <li>Install Postrgesql</li>
    <li>Create database named usersdb</li>
    <li>Create user named anth with password eevee</li>
    <li>Start postgresql server on your machine, im sure we will change this once we have made a proper </li>
</ol>


Thanks!

<h2>Useful commands</h2>

<h3>Start Server</h3>

python manage.py runserver

Go to localhost:8000 in web browser to see this, to specify port add it as an arguement in the previous command

<h3>Create App</h3>

python manage.py startapp yourappnamehere

