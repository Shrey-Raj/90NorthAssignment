
# Faiz-Z Tech Task

## This repository contains a Django WebSocket server and a React client for a real-time chat application.



### Demonstration Video

Watch the demonstration video below to see the application in action:

<video width="640" height="360" controls>
  <source src="https://github.com/Faizgeeky/Faiz-Z_Tech-Task/raw/main/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>



## Setup Instructions

### Clone the Repository

To get started, clone the repository to your local machine:

```sh
git clone https://github.com/Faizgeeky/Faiz-Z_Tech-Task.git
cd Faiz-Z_Tech-Task
```

### Setting Up the Django WebSocket Server

1. Navigate to the `server` folder:
    ```sh
    cd server
    ```

2. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

3. Run the Daphne server:
    ```sh
    daphne -p 8000 server.asgi:application
    ```

### Setting Up the React Client

1. Navigate to the `client` folder:
    ```sh
    cd ../client
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3. Start the React application:
    ```sh
    npm start
    ```

### How the Application Works

This project uses Django Rest Framework (DRF) APIs and Django Channels to build a real-time chat application. 

### Postman Collection

A `collection.json` file is included for easy testing of the API endpoints with Postman. Simply import this file into Postman to get started.

