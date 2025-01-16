
# 90North Chat App Assignment  

A **real-time chat application** built with Django and React, featuring WebSocket integration for seamless communication.  

## Overview  

This project combines a Django WebSocket server with a React client to deliver a fully functional chat application. Key features include user authentication, interest management, and real-time messaging.  

## Features  

- **User Authentication**: Secure JWT-based login system.  
- **Interest Management**: Send, accept, or reject interest requests between users.  
- **Real-Time Chat**: Chat instantly with users who have accepted your interest requests.  
- **Dashboard**: Manage pending and accepted users conveniently.  

## LOOKUP 
<video controls src="LOOKUP/demo_django_chat_app.mp4" title=""></video>

![alt text](<LOOKUP/Screenshot 2025-01-16 205740.png>)
![alt text](<LOOKUP/Screenshot 2025-01-16 205801.png>)
![alt text](<LOOKUP/Screenshot 2025-01-16 205818.png>)
---

## Setup Instructions  

Follow these steps to set up the application locally.  

### Clone the Repository  

Clone the repository and navigate to the project directory:  
```bash  
git clone  https://github.com/Shrey-Raj/90NorthAssignment.git
cd  90NorthAssignment
```  

---

### Backend: Django WebSocket Server  

1. Navigate to the `server` directory:  
   ```bash  
   cd server  
   ```  

2. Install dependencies:  
   ```bash  
   pip install -r requirements.txt  
   ```  

3. Run the server using Daphne:  
   ```bash  
   daphne -p 8000 server.asgi:application  
   ```  

---

### Frontend: React Client  

1. Navigate to the `client` directory:  
   ```bash  
   cd ../client  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Start the React application:  
   ```bash  
   npm start  
   ```  

---

## How It Works  

- The application uses **Django Rest Framework (DRF)** APIs and **Django Channels** to enable real-time communication.  
- The client interacts with the backend through WebSocket connections for instant updates.  

---


