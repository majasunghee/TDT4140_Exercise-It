![Exercise.it](./feed.png)

## `exercise-web :muscle:`

## Start the app

```bash
cd exercise-web
npm start
```

Runs the app on [http://localhost:3000](http://localhost:3000).
You will see any errors in the console.

## Install the app in a new local repo

```bash
cd exercise-web
npm install
npm start
```

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

# Backend: Django

## Start by creating a virtual environment

```bash
virtualenv env
source exercise.api/env/bin/activate
```

## Install Django and Django REST into virtualenv

```bash
pip install django
pip install djangorestframework
```

## Sync database

```bash
python manage.py migrate
```

## Start server

```bash
python manage.py runserver
```
