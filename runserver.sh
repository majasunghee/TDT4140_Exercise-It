cd exercise-api
virtualenv env || echo "env already installed"
cd ..
source exercise-api/env/Scripts/activate || source exercise-api/env/bin/activate
pip install -r requirements.txt
python3 manage.py runserver || python manage.py runserver