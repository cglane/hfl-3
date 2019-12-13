# !/bin/bash

source env/bin/activate

python Backend/manage.py runserver &

cd ./Frontend

npm run start