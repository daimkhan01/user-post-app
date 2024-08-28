# My Post App Frontend & Backend Project

This is the frontend of a web application built with React, using Tailwind CSS for styling. The application allows users to create, read, update, and delete posts. It also includes user authentication, pagination, search functionality, and responsive design.

## Table of Contents

    Features
    Installation
    Usage
    Components Overview
    Project Structure
    Dependencies
    Contributing
    License

## Features

    User Authentication: Users can sign up, log in, and log out. The authentication state is managed using context.
    CRUD Operations: Authenticated users can create, read, update, and delete posts.
    Pagination: Posts are paginated to improve performance and user experience.
    Search Functionality: Users can search for posts using a search bar.
    Responsive Design: The application is fully responsive and works on various screen sizes.
    Form Validation: Basic form validation is implemented for input fields.
    Toast Notifications: Success and error notifications are shown using react-toastify.

## Installation

### Prerequisites

    Node.js (v12 or higher)
    npm or Yarn

### Clone the Repository

bash

git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

### Install Dependencies

bash

npm install

or if you're using Yarn:

bash

yarn install

## Usage

### Run the Application

bash

npm start

or if you're using Yarn:

bash

yarn start

The application will be available at http://localhost:3000.

### Build for Production

bash

npm run build

or if you're using Yarn:

bash

yarn build

This will create an optimized build of your application in the build/ directory.

## Components Overview

### Login

Handles user login functionality, including form handling, password visibility toggle, and error display.

## CreatePost

Allows authenticated users to create new posts. Includes form validation, error handling, and loading states.

## PostList

Displays a list of posts with pagination and search functionality. It also highlights posts owned by the logged-in user.

## PostDetail

Shows the details of a specific post and allows the owner to edit or delete the post.

## EditPost

Allows users to edit their existing posts. It fetches the current post data, allows modifications, and handles form submission.

## Project Structure

src/
├── components/
│ ├── Login.js
│ ├── CreatePost.js
│ ├── PostList.js
│ ├── PostDetail.js
│ ├── EditPost.js
│ └── pagination/
│ └── Pagination.js
├── pages/
│ ├── Home.js
│ ├── context/
│ │ └── AuthContext.js
│ └── ... (other page components)
├── utils/
│ ├── api.js
│ └── ... (other utility files)
├── App.js
├── index.js
└── ... (other core files)

### Dependencies

    React: Core library for building the user interface.
    React Router DOM: For handling routing in the application.
    Tailwind CSS: Utility-first CSS framework for styling.
    React Toastify: For showing toast notifications.
    Axios: For making API requests.
    React Icons: For including icons in the UI.

### Contributing

Contributions are welcome! If you have any ideas or improvements, feel free to fork the repository and submit a pull request.
Steps to Contribute:

    Fork the repository.
    Create a new branch (git checkout -b feature-name).
    Make your changes.
    Commit your changes (git commit -m 'Add some feature').
    Push to the branch (git push origin feature-name).
    Open a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
