# Project Name

## Overview

This is a full-stack blog application built with Django (backend) and React (frontend).
The project demonstrates a REST API with JWT authentication, article management,
commenting system, and role-based access (regular users and admins).

## Features

- User registration and login (JWT authentication)
- Role-based access: regular users vs. admins
- CRUD operations for articles (admins only)
- Commenting system (users can comment, admins can delete any comment)
- Article search by title, content, tags, or author
- Initial database seeding with sample users, articles, and comments

## Project Structure

- **frontend/** – Contains the frontend React application  
  See [frontend README](./frontend/blog-client/README.md) for instructions on how to install dependencies and run the frontend.
- **backend/** – Contains the backend Django application  
  See [backend README](./backend/blogapi/README.md) for instructions on how to install dependencies and run the backend.
- **README.md** – This file, providing an overview of the project and links to sub-projects.

## Installation

1. Clone the repository
2. Set up `.env` file with your environment variables
3. Follow README instructions in `/backend` and `/frontend` for setup

## How to Run the Project

1. **Clone the repository**  
   Open a terminal and run:  
   git clone <repository URL>  
   cd <cloned-folder-name>

2. **Install dependencies**  
   Install all required packages using pip:  
   pip install -r requirements.txt

3. **Run the project**  
   Start the server (for example, if it’s a Django project):  
   python manage.py runserver  
   The server will be available at http://127.0.0.1:8000/

4. **Check the project**  
   Open your browser and go to the server address to make sure everything works.  
   You can also run tests if available:  
   python manage.py test
