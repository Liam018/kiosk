INTERACTIVE CAMPUS KIOSK WITH FEEDBACK MANAGEMENT SYSTEM
A full-stack web application designed to enhance campus interaction and feedback management.
Built with Django REST Framework for the backend API, ReactJS + Vite for the frontend, MariaDB as the database, and Tailwind CSS for styling.

Table of Contents
Project Overview

Features

Technologies Used

Project Structure

Installation

Usage

API Endpoints

Contributing

License

Contact

Project Overview
This system provides an interactive campus kiosk with a feedback management system for administrators and users:

Admin Panel:

Manage Users

Manage Announcements

View Campus Map

Manage Feedback

Generate Reports

User Dashboard:
Accessible at http://localhost:5173/user-dashboard

Dashboard: Information about the school

Announcements: View upcoming events or today's announcements

Map: Interactive campus map

Feedback: Submit feedback via QR code scanning

Features
RESTful API backend with Django REST Framework

Responsive React frontend built with Vite for fast development

MariaDB database for robust data storage

Tailwind CSS for modern, responsive UI design

Admin functionalities to manage users, announcements, feedback, and reports

User-friendly dashboard with search and QR code feedback system

Technologies Used
Backend: Django, Django REST Framework, Python

Frontend: ReactJS, Vite, Tailwind CSS

Database: MariaDB

Others: Git, GitHub, npm/yarn, virtualenv

Project Structure
text
kiosk/
├── backend/               # Django backend project
│   ├── users_api/         # Django app with models, views, serializers
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── frontend/              # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── venv/                  # Python virtual environment (ignored)
├── .gitignore
└── README.md
Installation
Prerequisites
Python 3.x

Node.js and npm/yarn

MariaDB server installed and running

Git

Backend Setup
Clone the repository:

bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo/backend
Create and activate a virtual environment:

bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
Install Python dependencies:

bash
pip install -r requirements.txt
Configure your MariaDB database settings in settings.py.

Apply migrations:

bash
python manage.py migrate
(Optional) Create a superuser:

bash
python manage.py createsuperuser
Run the backend server:

bash
python manage.py runserver
Frontend Setup
Navigate to the frontend directory:

bash
cd ../frontend
Install Node dependencies:

bash
npm install
Run the React development server:

bash
npm run dev
Usage
Admin Panel: Access backend admin interface (usually at http://localhost:8000/admin) to manage users, announcements, feedback, and reports.

User Dashboard: Open http://localhost:5173/user-dashboard in your browser to access the user interface with school info, announcements, campus map, and feedback submission via QR code.

API Endpoints
Endpoint	Method	Description
/api/users/	GET	List all users
/api/announcements/	GET	List announcements
/api/feedback/	POST	Submit feedback
/api/map/	GET	Retrieve campus map data
...	...	...
(Add more endpoints as per your API design)

Contributing
Contributions are welcome! Please:

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature-name)

Open a pull request
