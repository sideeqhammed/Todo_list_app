#  Todo list Backend
A Todo List API built with Django REST Framework (DRF) and MySQL, containerized with Docker. It allows for creation, deletion, and marking todos as completed.

## Features
- ### Authentication & Users
  - Custom user model with email-based login.
  - Token-based authentication using Django REST Framework.
  - Registration, login, and logout endpoints.
- ### Permissions
  - Users can view and edit the todos which they created.
- ### Filtering
    - Todos can be filtered using search words.
    - Todos can also be filtered with completion states.
 
  ## Installation
  ### Using docker
  - Git clone the repository
  - Change directory into the backend (cd todo_list_be)
  - Create a .env file using the .env.example file as a guide
  - Run "docker compose up --build" to set up the project. This will:
    - Build the Django container.
    - Start the MySQL database container.
    - Run migrations automatically if configured.
   
  ### Manually(Without docker)
  - Git clone the repository
  - Change directory into the backend (cd todo_list_be)
  - Create a python virtual environment, by running the following commands 
    - python -m venv venv
    - venv source/bin/activate
  - Install dependencies (pip install -r requirements.txt)
  - Configure database settings in settings.py
  - Create a .env file using the .env.example file as a guide
  - Run migratons:
    - python manage.py makemigrations
    - python manage.py migrate
    - python manage.py runserver
   
 ## Useful Commands
 - docker exec -it library_container bash Open Django shell in container
 - docker exec -it db_container mysql -u root -p Open MySQL shell
 - python manage.py createsuperuser Create an admin user
 - python manage.py shell Open Django interactive shell
  
