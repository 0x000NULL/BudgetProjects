# Rental Car Claims

The Rental Car Claims system is designed to help a rental car company track and manage vehicle claims. This project includes a backend built with Node.js, Express, and MongoDB, and a frontend built with HTML, CSS, and JavaScript. Users can register and log in, submit vehicle claims with pictures, and admins can view and manage claims.

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
- Vehicle claim submission with:
  - Description of the claim
  - Images of the vehicle
  - Status of the claim (Pending, Approved, Rejected)
- Admin page to view and manage claims
- Email notifications for claim status updates

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rental-car-claims.git
   cd rental-car-claims
```
    Install the backend dependencies:

```    bash

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

Claim Routes

    POST /api/claims: Submit a new vehicle claim.
        Request headers: { "Authorization": "Bearer <token>" }
        Request body: Claim data with images as multipart/form-data.
        Response: Created claim object.

    GET /api/claims: Get all vehicle claims for the logged-in user.
        Request headers: { "Authorization": "Bearer <token>" }
        Response: Array of claim objects.

    POST /api/claims/email: Send an email notification for a claim.
        Request headers: { "Authorization": "Bearer <token>" }
        Request body: { "to": "string", "subject": "string", "text": "string" }
        Response: Email sent confirmation.

Project Structure

```bash

rental-car-claims/
│
├── controllers/
│   ├── claimController.js      # Handles claim-related operations
│   └── userController.js       # Handles user authentication
│
├── middleware/
│   └── auth.js                 # Middleware to protect routes
│
├── models/
│   ├── User.js                 # User model schema
│   └── Claim.js                # Claim model schema
│
├── routes/
│   ├── claimRoutes.js          # Routes for claim operations
│   └── userRoutes.js           # Routes for user authentication
│
├── uploads/                    # Directory for uploaded images
│
├── frontend/                   # Frontend directory
│   ├── index.html              # Landing page
│   ├── login.html              # Login page
│   ├── register.html           # Registration page
│   ├── claims.html             # User claims page
│   ├── add-claim.html          # Add claim page
│   ├── css/
│   │   └── styles.css          # CSS styles
│   └── js/
│       └── main.js             # JavaScript functionality
│
├── .env                        # Environment variables
├── app.js                      # Main server file
├── package.json                # NPM package configuration
└── README.md                   # Project documentation
```
Detailed Explanation of the Project
Backend

    User Authentication:
        The backend uses JWT (JSON Web Tokens) for user authentication.
        Users can register and log in with their credentials.
        Passwords are hashed using bcrypt before storing them in the database.

    Vehicle Claims:
        Users can submit vehicle claims with a description and images.
        Claims have statuses (Pending, Approved, Rejected).
        Claims are associated with the user who submitted them.
        Images are uploaded and stored in the uploads directory.

    Email Notifications:
        The system can send email notifications about the status of claims using the nodemailer package.

Frontend

    Login and Registration Pages:
        Users can register and log in using the provided forms.
        After successful login, users are redirected to the claims page.

    Claim Submission:
        Users can submit new claims using a form that includes fields for the claim description and images.
        Images are uploaded using the multipart/form-data encoding.

    Admin Page:
        Admin users can view all claims and manage their statuses.
        Admins can generate and download PDF reports of claims.

Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.
License

This project is licensed under the MIT License. See the LICENSE file for details.