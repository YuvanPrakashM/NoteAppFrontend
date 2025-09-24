NotesApp Backend: A Django REST Framework backend for a simple Notes App with manual JWT authentication and PostgreSQL database.

Features:
1.User registration and login using manual JWT
2.CRUD operations for Notes
3.Notes tied to the logged-in user
4.PostgreSQL database connection
5.Minimal hand-crafted REST API with Django REST Framework


Tech Stack:
Backend: Django, Django REST Framework
Database: PostgreSQL (connected via pgAdmin4)
Authentication: Manual JWT (PyJWT)

Installation:
1.Clone the repository
2.Create Virtual Environment
3.Install Dependencies

4.DataBase Setup
   1.Install PostgreSQL and PgAdmin4
   2.Create a database(eg.Notesdb)
   3.Update Settings.py with your credentials

5.Run Migrations
  python manage.py makemigrations
  python manage.py migrate

6.Run the Backend 
  python manage.py runserver 
