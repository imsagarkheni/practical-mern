MERN Recipe App

Project Overview

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application that provides users with a recipe dashboard. Users can register, log in, view recipes, filter them by ingredients, add them to favorites, view their favorite recipes, and remove them from their favorites. The app also integrates the Spoonacular API to fetch recipe data.

Setup Instructions
Prerequisites
Ensure you have the following installed on your machine:

Node.js (version >= 14.x)
MongoDB (running locally or a cloud instance)


Client Setup
Clone the repository:
1.) https://github.com/imsagarkheni/practical-mern.git

2.) Navigate to the client directory and install dependencies:
cd client
npm install

3.) Start the client:
    npm start

The React app will start on http://localhost:3000 by default.


Server Setup

1.) Open another terminal and navigate to the server directory:
cd server
npm install


2.) Set up the .env file. Create a .env file in the root of the server directory with the following variables:
PORT=3100
MONGO_URI=mongodb://localhost:27017
APP_LOGIN_AUTH_TOKEN=
PASSWORD_ENCRYPTION_SECRET=
SPOONACULAR_API_KEY=

3.) Start the server:
npm start

The server will run on http://localhost:3100. Ensure your MongoDB connection is successful.


Usage Instructions
Register: Sign up with your details.
Login: Once registered, log in to access the dashboard.
Dashboard: The dashboard displays a list of recipes. You can filter the recipes by different ingredients.
Favorites: Add your favorite recipes by clicking the "Add to Favorites" button. You can access these by navigating to the "My Favorites" page in the sidebar.
Search: On the "My Favorites" page, you can search for a specific recipe in your favorites list.
Remove: You can also remove recipes from your favorites.
Logout: A logout button is located at the bottom left corner of the sidebar.


Environment Variables
The following environment variables are required:

PORT: The port on which the server runs.
MONGO_URI: MongoDB connection string.
APP_LOGIN_AUTH_TOKEN: Token for app login authentication.
PASSWORD_ENCRYPTION_SECRET: Secret key for password encryption.
SPOONACULAR_API_KEY: Your API key for the Spoonacular service.


License
This project is licensed under the MIT License.

