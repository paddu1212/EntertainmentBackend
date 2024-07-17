# Entertainment-Backend Web Application

## Introduction

Entertainment-Backend is a comprehensive backend service designed to support a front-end application for browsing, managing, and tracking movies and TV shows. It includes functionalities for user authentication, managing watchlists, and accessing detailed information about various entertainment media.

## Tech Stack Used:

- **Backend Framework**: Node.js with Express.js
- **Middleware**: Cors
- **HTTP Requests**: Axios
- **Server Monitoring**: Nodemon
- **Authentication**: JWT Token
- **Database**: MongoDB with Mongoose
- **API Documentation**: Postman
- **IDE**: Visual Studio Code
- **Backend Hosting**: Render

## Features

- **User Authentication**: Secure registration and login processes with JWT for maintaining sessions.
- **Media Catalog**: Access to a wide range of movies and TV shows, including search functionality and detailed media information.
- **Personal Bookmark**: Users can create and manage a personal bookmark for tracking their favorite movies and TV shows.
- **Trending Content**: Endpoint to fetch trending content based on popularity or other criteria.

## Prerequisites

To set up the backend for the Entertainment Web Application, you'll need the following prerequisites:

- **Node.js**: JavaScript runtime environment for server-side code execution.
- **npm**: Node Package Manager, for managing dependencies.
- **Express.js**: Web application framework for building APIs and handling HTTP requests.
- **npm**: Node Package Manager for managing project dependencies.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: MongoDB object modeling tool for Node.js, providing a schema-based solution for modeling application data.
- **Axios**: HTTP client for making requests to external APIs or services.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing, allowing frontend and backend servers to communicate securely.
- **Nodemon**: Utility for automatically restarting the server during development upon file changes, enhancing the development workflow.
- **JWT (JSON Web Tokens)**: For user authentication and maintaining sessions securely.
- **API Documentation Tool**: Such as Postman, for documenting and testing API endpoints effectively.
- **IDE (Integrated Development Environment)**: Such as Visual Studio Code, for writing and debugging backend code efficiently.
- **GitHub**: Version control system for collaborating on codebase and hosting repositories.
- **Backend Hosting Provider**: Such as Render, for deploying and hosting the backend application.


## Setup Instructions

### Step 1: Clone the Repository

   Start by cloning the repository to your local computer:

```sh
git clone https://github.com/dreamboyguru/EntertainmentBackend
cd EntertainmentBackend
```


### Step 2: Environment Configuration

Ensure that you set up the following environment variables for the backend of the Entertainment Web Application:

- **PORT**: Set to `3001` to specify the port number on which the server will listen.
- **DB_URL**: MongoDB connection string for connecting to the database. Use one of the following options:
  - For local development: `'mongodb://127.0.0.1:27017/entertainment'`
  - For MongoDB Atlas (cloud-hosted): Uncomment the line below and replace it with your MongoDB Atlas connection string.
    ```
    # DB_URL = 'mongodb+srv://<username>:<password>@<cluster>/<database>'
    ```
- **SECRET**: Secret key for JWT token generation and verification. Choose a strong and secure secret key.
- **API_KEY**: API key for accessing external APIs or services

Ensure that these environment variables are correctly configured before running the backend server.

### Step 3: Install Dependencies

```sh
npm install
```

### Step 4: Running the Server

- **Development Mode**: `npm run dev` (uses `nodemon` for auto reloads)
- **Production Mode**: `npm start`


## Short API Endpoints

### User Endpoints

- `POST /signUp`: Register a new user.

  - **Body**: `{ "Email": "user@example.com", "Password": "password123" }`
  - **Response**: User object with JWT token.

- `POST /login`: Authenticate and log in a user.

  - **Body**: `{ "userName": "user@example.com", "password": "password123" }`
  - **Response**: User object with JWT token.

- `GET /check-token-validity`: Retrieve details of the currently logged-in user.
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: User object without sensitive information like password.

### Movie Endpoints

- `GET /videos/:useName`: Fetch a list of movies

  - **Path Parameters**: `id` (useName) [optional]
  - **Response**: Array of movie objects.

- `GET /api/videos/:video_id`: video key for movies play.

  - **Path Parameters**: `id` (Movie ID)
  - **Response**: Array of movies.

- `GET /api/video/genre/:video_id`: Get detailed information about a specific movie.
  - **Path Parameters**: `id` (Movie ID)
  - **Response**: Movie object with detailed information.

### TV Show Endpoints

- `GET /tv/:userName`: Fetch a list of TV shows.

  - **Path Parameters**: `id` (userName) [Optional]
  - **Response**: Array of TV show objects.

- `GET /api/tv/:video_id`: video key for tv show video play.

  - **Path Parameters**: `id` (tv show ID)
  - **Response**: Array of movies.

- `GET /api/tv/genre/:video_id`: Get detailed information about a specific tv show.
  - **Path Parameters**: `id` (tv show ID)
  - **Response**: Movie object with detailed information.

### Bookmark Endpoints

- `POST /bookmark`: Retrieve the current user's Bookmark.

  - **body parameter**: `email: userName, video_id: 1234`
  - **Response**: Success message or error.

- `GET /bookmark/:userName`: Add a movie or TV show to the bookmark.

  - **Response**: Array of items in the user's bookmark.

- `DELETE /bookmark/:id`: Remove an item from the watchlist.

  - **Response**: Success message or error.

### Trending Endpoint

- `GET /trending/userName`: Fetch trending movies and TV shows.

  - **Response**: Array of trending movies and TV shows.

### recommend Endpoint

- `GET /recommend/userName`: Fetch trending movies and TV shows.

  - **Response**: Array of trending movies and TV shows.


## API Documentation And Summary

  [API Documentation](https://documenter.getpostman.com/view/31401821/2sA2xb6axK)
  
  [Summary](https://docs.google.com/document/d/19SNoMbD3gXv3zEg5p8xuo0TLN1Ug9UY0/edit?usp=sharing&ouid=101631406661075244481&rtpof=true&sd=true)


## Additional Notes

- Ensure MongoDB is running and accessible through the `DATABASE_URL` specified in the `.env` file.

- All endpoints requiring authentication expect a JWT token to be provided in the `Authorization` header as a Bearer token.



## Contact

- **Gurusidda Hanamannavar** - [guruhanamannavar676@gmail.com](mailto:guruhanamannavar676@gmail.com)

Feel free to reach out if you have any questions or suggestions!
"# EntertainmentBackend" 
