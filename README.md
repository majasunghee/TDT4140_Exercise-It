![Exercise.it](./exercise-web/public/feed.png)

# `exercise-web`

## Start the frontend-server

```bash
cd exercise-web
npm start
```

Runs the app on [http://localhost:3000](http://localhost:3000).
You will see any errors in the console.

## Install the frontend-server in a new local repo

```bash
cd exercise-web
npm install
npm start
```

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

# `exercise-api`

## Start the backend-server

MacOS:

```bash
source exercise-api/env/bin/activate
python manage.py runserver
```

Windows:

```bash
source exercise-api/env/Scripts/activate
python manage.py runserver
```

Runs the app on [http://localhost:8000](http://localhost:8000).

## Start the backend-server in a new virtulenv

```bash
virtualenv exercise-api/env
source exercise-api/env/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## Migrate database after changes to code

```bash
python manage.py makemigrations
python manage.py migrate
```

## Learn More

To learn Django, check out the [Django documentation](https://docs.djangoproject.com/en/3.0/).
To learn Django REST Framework, check out the [documentation](https://www.django-rest-framework.org/).
