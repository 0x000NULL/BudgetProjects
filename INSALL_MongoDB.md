Installing and Configuring MongoDB
Step 1: Install MongoDB
Windows

    Download the MongoDB Installer:
        Go to the MongoDB Download Center and download the MongoDB Community Server installer for Windows.

    Run the Installer:
        Follow the installation prompts. Choose the Complete installation type.

    Configure MongoDB:
        During installation, make sure to select the option to install MongoDB as a service. This will allow MongoDB to start automatically with your system.

    Set up the MongoDB environment:
        Add the MongoDB bin directory (e.g., C:\Program Files\MongoDB\Server\<version>\bin) to your system's PATH environment variable.

    Start MongoDB:
        MongoDB should start automatically. You can check if it's running by opening a command prompt and typing:

        bash

        mongo --version

macOS

    Install Homebrew:
        If you haven't already, install Homebrew by running the following command in your terminal:

        bash

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Install MongoDB:

    Run the following command to install MongoDB using Homebrew:

    bash

    brew tap mongodb/brew
    brew install mongodb-community@6.0

Start MongoDB:

    Start MongoDB with the following command:

    bash

    brew services start mongodb/brew/mongodb-community

Verify Installation:

    Verify that MongoDB is running by typing:

    bash

        mongo --version

Linux

    Import the MongoDB public GPG Key:
        Run the following commands to import the MongoDB GPG key:

        bash

    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

Create a MongoDB List File:

    Create a list file for MongoDB:

    bash

    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

Install MongoDB Packages:

    Update your local package database and install MongoDB:

    bash

    sudo apt-get update
    sudo apt-get install -y mongodb-org

Start MongoDB:

    Start MongoDB with the following command:

    bash

    sudo systemctl start mongod

Enable MongoDB to Start on Boot:

    Enable MongoDB to start on boot:

    bash

    sudo systemctl enable mongod

Verify Installation:

    Verify that MongoDB is running by typing:

    bash

        mongo --version

Step 2: Configure MongoDB

    Create a Database:
        Open a terminal or command prompt and run:

        bash

mongo

Switch to the admin database:

js

use admin

Create a new user (replace username and password with your own values):

js

    db.createUser(
      {
        user: "username",
        pwd: "password",
        roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
      }
    )

Create a Project-Specific Database:

    Switch to your project database (e.g., DigitalVRF or rentalCarClaims):

    js

use DigitalVRF
// or
use rentalCarClaims

Create a new user for this database:

js

        db.createUser(
          {
            user: "projectUser",
            pwd: "projectPassword",
            roles: [ { role: "dbOwner", db: "DigitalVRF" } ] // or rentalCarClaims
          }
        )

Step 3: Update Project Configuration

    Update Environment Variables:

        Open the .env file in your project directory and update the MONGO_URI variable with the connection string. Replace <username>, <password>, and <database> with your values:

        env

MONGO_URI=mongodb://<username>:<password>@localhost:27017/<database>?authSource=admin
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

Example for DigitalVRF:

env

MONGO_URI=mongodb://projectUser:projectPassword@localhost:27017/DigitalVRF?authSource=admin

Example for rental-car-claims:

env

        MONGO_URI=mongodb://projectUser:projectPassword@localhost:27017/rentalCarClaims?authSource=admin

Step 4: Start the Project

    Start the Backend Server:
        Navigate to the project directory and start the server:

        bash

        npm start

    Open the Frontend:
        Navigate to http://localhost:3000 in your browser to access the application.

Troubleshooting

    Ensure MongoDB is Running:
        If you encounter connection issues, make sure MongoDB is running. Use the following commands based on your operating system:
            Windows:

            bash

net start MongoDB

macOS:

bash

brew services start mongodb/brew/mongodb-community

Linux:

bash

            sudo systemctl start mongod

    Check Firewall and Network Settings:
        Ensure that your firewall or network settings are not blocking the connection to MongoDB.

By following these steps, you should be able to install and configure MongoDB for both the DigitalVRF and rental-car-claims projects.