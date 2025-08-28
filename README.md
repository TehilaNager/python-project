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

- `backend/` - Django REST API
- `frontend/` - React client
- `.env` - environment variables for secrets (not included in Git)

## Installation

1. Clone the repository
2. Set up `.env` file with your environment variables
3. Follow README instructions in `/backend` and `/frontend` for setup
