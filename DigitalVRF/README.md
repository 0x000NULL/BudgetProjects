# Budget-Digital-VRF

Budget-Digital-VRF is a comprehensive system designed to track and log Vehicle Release Forms (VRF) for a car rental or sales business. The system includes a backend built with Node.js, Express, and MongoDB, and a frontend built with HTML, CSS, and JavaScript. The project allows users to register and log in, submit vehicle release forms, upload pictures and videos, and for admins to view and print PDFs of the forms.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (registration and login)
- Vehicle Release Form submission with:
  - MVA
  - VIN
  - Car Make and Model
  - Color
  - Images and videos upload
  - Car miles
  - Purchase order number
  - Sold to information
- Admin page to view and print PDFs of Vehicle Release Forms
- PDF generation for each form

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Budget-Digital-VRF.git
   cd Budget-Digital-VRF
	```
    Install the backend dependencies:

    ```bash

npm install
```
Navigate to the frontend directory and install the frontend dependencies:

```bash

    cd frontend
    npm install
```
Configuration

    Create a .env file in the root directory of the project and add the following environment variables:

```    env

    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
```
    Replace the placeholder values with your actual credentials.

Usage

    Start the backend server:

 ```   bash

    npm start
```
    Open the frontend in your browser:
    Navigate to http://localhost:3000 to access the login page.

API Endpoints
User Routes

    POST /api/users/register: Register a new user.
        Request body: { "username": "string", "password": "string" }
        Response: User object with JWT token.

    POST /api/users/login: Log in a user.
        Request body: { "username": "string", "password": "string" }
        Response: User object with JWT token.

Form Routes

    POST /api/forms: Submit a new vehicle release form.
        Request headers: { "Authorization": "Bearer <token>" }
        Request body: Form data with images and videos as multipart/form-data.
        Response: Created form object.

    GET /api/forms: Get all vehicle release forms.
        Request headers: { "Authorization": "Bearer <token>" }
        Response: Array of form objects.

    GET /api/forms/:id/pdf: Generate and download a PDF of a specific form.
        Request headers: { "Authorization": "Bearer <token>" }
        Response: PDF file.

Project Structure

```bash

Budget-Digital-VRF/
│
├── controllers/
│   ├── formController.js      # Handles form-related operations
│   └── userController.js      # Handles user authentication
│
├── middleware/
│   └── auth.js                # Middleware to protect routes
│
├── models/
│   ├── User.js                # User model schema
│   └── VehicleReleaseForm.js  # Vehicle release form model schema
│
├── routes/
│   ├── formRoutes.js          # Routes for form operations
│   └── userRoutes.js          # Routes for user authentication
│
├── uploads/                   # Directory for uploaded images and videos
│
├── frontend/                  # Frontend directory
│   ├── index.html             # Landing page
│   ├── login.html             # Login page
│   ├── form.html              # Form submission page
│   ├── admin.html             # Admin page to view forms
│   ├── css/
│   │   └── styles.css         # CSS styles
│   └── js/
│       └── main.js            # JavaScript functionality
│
├── .env                       # Environment variables
├── app.js                     # Main server file
├── package.json               # NPM package configuration
└── README.md                  # Project documentation
```
Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.
License

This project is licensed under the MIT License. See the LICENSE file for details.