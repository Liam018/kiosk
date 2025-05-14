INTERACTIVE CAMPUS KIOSK WITH FEEDBACK MANAGEMENT SYSTEM

A full-stack web application designed to enhance campus interaction and feedback management. Built with Django REST Framework for the backend API, ReactJS + Vite for the frontend, MariaDB as the database, and Tailwind CSS for styling.

Table of Contents





- Project Overview



- Features



- Technologies Used



- Project Structure



- Installation



Usage

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

Feedback Form:

Accessible at http://localhost:5173/feedbackform





Adding feedback

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

Installation

Prerequisites





Python 3.x



Node.js and npm/yarn



MariaDB server installed and running



Git



requirements.txt - For installation of Dependencies in python



users.sql - Database for demo

Usage





Admin Panel: Access the backend admin interface (usually at http://localhost:8000/admin) to manage users, announcements, feedback, and reports.



User Dashboard: Open http://localhost:5173/user-dashboard in your browser to access the user interface with school info, announcements, campus map, and feedback submission via QR code.
