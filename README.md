# dummy-fi
A simple banking API for a fake financial institution built using Django.

## Running the Backend Instructions
- Open a Terminal and navigate to the `dummy_fi` directory of the main repository directory
- Run `python manage.py makemigrations` to generate the migrations files
- Run `python manage.py migrate` to apply the database migrations
- Run `python manage.py runserver` to run the server at `http://localhost:8000`
- Reference the `dummy_fi_app/urls.py` file for the URL schema and access the Django browsable API through your browser as needed

## Shell
- You can interact with the local database using Django's shell by running `python manage.py shell` in a Terminal window