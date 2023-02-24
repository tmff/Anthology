<h1>Anthology</h1>
This is the repository for anthology, a daily poetry writing web application.

<h2>Architecture & Techstack</h2>
We are using a combination of React, Django and Postgresql for this app.

React is our front end web application, which calls our rest api. This can be found in the poemfrontend directory.

Our rest api has been made with Django, utilising a postgresql database. This can be found in the backend directory.

A good example of how we have linked these together is the Register form. On the frontend, it has input fields for name, email, username and password.

On submit, it uses axios to send a POST request to our backend django server at /register. It then returns a response which will be processed by our front end.

If successful, it uses the user model to create a new user and adds them to the database.