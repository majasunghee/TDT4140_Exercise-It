cd exercise-api
if [ -d "$env" ]; then echo "env exists"; else python3 -m virtualenv env || python -m virtualenv env; fi
cd ..
source exercise-api/env/bin/activate || source exercise-api/env/Scripts/activate
pip install -r requirements.txt
python3 manage.py runserver || python manage.py runserver