# BudgetProjects

This repository contains three projects: DigitalVRF, rental-car-claims, and BoothTracker. Each project addresses specific needs in the vehicle management and tracking domain.

## Projects

### 1. DigitalVRF

**Description**: DigitalVRF is designed to track and log Vehicle Release Forms (VRF) for a car rental or sales business. Users can register and log in, submit vehicle release forms with various details, and admins can view and print PDFs of the forms.

**Technologies Used**:
- Backend: Node.js, Express, MongoDB
- Frontend: HTML, CSS, JavaScript

**Features**:
- User authentication (registration and login)
- Vehicle release form submission with:
  - MVA
  - VIN
  - Car Make and Model
  - Color
  - Images and videos upload
  - Car miles
  - Purchase order number
  - Sold to information
- Admin page to view and print PDFs of forms

### 2. rental-car-claims

**Description**: rental-car-claims helps a rental car company track and manage vehicle claims. Users can register and log in, submit vehicle claims with descriptions and images, and admins can view and manage claims.

**Technologies Used**:
- Backend: Node.js, Express, MongoDB
- Frontend: HTML, CSS, JavaScript

**Features**:
- User authentication (registration and login)
- Vehicle claim submission with:
  - Description of the claim
  - Images of the vehicle
  - Status of the claim (Pending, Approved, Rejected)
- Admin page to view and manage claims
- Email notifications for claim status updates

### 3. BoothTracker

**Description**: BoothTracker tracks cars entering a garage, using employee IDs and car numbers. It saves both numbers along with a timestamp to a CSV file.

**Technologies Used**:
- Backend: Python
- Data Storage: CSV

**Features**:
- Track car entries with employee ID and car number
- Save data with timestamps to a CSV file

## Installation

### MongoDB Setup

1. **Download and Install MongoDB**:
   - Visit the [MongoDB Download Center](https://www.mongodb.com/try/download/community) and download the MongoDB Community Server installer for your operating system.
   - Follow the installation prompts.

2. **Start MongoDB**:
   - Windows:
     ```bash
     net start MongoDB
     ```
   - macOS:
     ```bash
     brew services start mongodb/brew/mongodb-community
     ```
   - Linux:
     ```bash
     sudo systemctl start mongod
     ```

3. **Verify Installation**:
   ```bash
   mongo --version

DigitalVRF and rental-car-claims Setup

    Clone the repository:

    bash

git clone https://github.com/yourusername/BudgetProjects.git
cd BudgetProjects

Install Dependencies:

    For DigitalVRF:

    bash

cd DigitalVRF
npm install

For rental-car-claims:

bash

    cd rental-car-claims
    npm install

Configure Environment Variables:

    Create a .env file in the root directory of each project and add the following environment variables:

    env

    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password

Start the Backend Server:

    For DigitalVRF:

    bash

npm start

For rental-car-claims:

bash

        npm start

    Open the Frontend:
        Navigate to http://localhost:3000 in your browser to access the application.

BoothTracker Setup

    Install Dependencies:

    bash

pip install -r requirements.txt

Run the Application:

bash

    python booth_tracker.py

Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.
License

This project is licensed under the MIT License. See the LICENSE file for details.