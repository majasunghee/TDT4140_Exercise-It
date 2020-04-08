cd exercise-api
if [ -d env/ ]; then echo "env exists"; else virtualenv env || python -m virtualenv env || python3 -m virtualenv env || py -m virtualenv env; fi
if [ -d env/bin/ ]; then source env/bin/activate; else source env/Scripts/activate; fi
cd ..
pip install -r requirements.txt
if python3 --version; then python3 manage.py runserver; fi 
if python --version; then python manage.py runserver; fi
if py --version; then py manage.py runserver; fi