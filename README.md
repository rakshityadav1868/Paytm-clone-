# Paytm Clone

A full-stack payment application clone built with modern web technologies, featuring user authentication, account management, and money transfer functionality.

## 🎯 Project Overview

This is a complete implementation of a Paytm-like payment platform with both frontend and backend components. Users can sign up, sign in, view their dashboard, and transfer money to other users.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Docker Setup](#docker-setup)

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv for configuration

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Linting**: ESLint

## 📁 Project Structure

```
paytm/
├── Dockerfile              # MongoDB replica set configuration
├── README.md              # This file
├── backend/               # Express.js server
│   ├── config.js          # Configuration setup
│   ├── db.js              # Database connection
│   ├── index.js           # Server entry point
│   ├── middleware.js      # Custom middleware
│   ├── package.json       # Backend dependencies
│   └── routes/
│       ├── index.js       # Main router
│       ├── user.js        # User routes
│       └── account.js     # Account routes
└── frontend/              # React + Vite application
    ├── index.html         # HTML entry point
    ├── vite.config.js     # Vite configuration
    ├── tailwind.config.js # Tailwind CSS config
    ├── postcss.config.js  # PostCSS config
    ├── package.json       # Frontend dependencies
    ├── src/
    │   ├── main.jsx       # React entry point
    │   ├── App.jsx        # Root component
    │   ├── index.css      # Global styles
    │   ├── App.css        # App styles
    │   ├── components/
    │   │   ├── Dashboard.jsx      # Dashboard page
    │   │   ├── Dashboard.css
    │   │   ├── Send.jsx           # Money transfer page
    │   │   ├── Send.css
    │   │   ├── Signin.jsx         # Login page
    │   │   ├── Signin.css
    │   │   ├── Signup.jsx         # Registration page
    │   │   └── Signup.css
    │   ├── services/
    │   │   └── api.js             # API client setup
    │   ├── assets/
    │   │   └── react.svg
    │   └── styles/
    │       └── auth.css           # Authentication styles
    └── public/
        └── vite.svg
```

## ✅ Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Docker)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rakshityadav1868/Paytm-clone-.git
cd paytm
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/paytm
NODE_ENV=development
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## ▶️ Running the Application

### Start MongoDB (if running locally)

```bash
# On macOS with Homebrew
brew services start mongodb-community

# Or using Docker
docker-compose up -d
```

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:3000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will typically run on `http://localhost:5173`

### Build for Production

Frontend:
```bash
cd frontend
npm run build
```

This creates an optimized build in the `dist/` directory.

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Sign Up
- **POST** `/user/signup`
- Create a new user account

#### Sign In
- **POST** `/user/signin`
- Authenticate user and receive token

### Account Endpoints

#### Get Balance
- **GET** `/account/balance`
- Retrieve current account balance

#### Transfer Money
- **POST** `/account/transfer`
- Transfer funds to another user

### User Endpoints

Additional user-related operations

## ✨ Features

- **User Authentication**: Sign up and sign in functionality
- **Secure Account Management**: View account balance and transaction history
- **Money Transfer**: Send money to other users with validation
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Real-time Updates**: React-based dynamic user interface
- **Data Validation**: Zod-based input validation on the backend
- **CORS Support**: Secure cross-origin requests

## 🐳 Docker Setup

A Dockerfile is included for containerizing the MongoDB database with replica set support:

```bash
# Build the MongoDB container with replica set
docker build -t paytm-mongo .

# Run the container
docker run -d -p 27017:27017 paytm-mongo
```

## 📦 Available Scripts

### Backend
- `npm start` - Start the server (port 3000)

### Frontend
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/paytm
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

Rakshit Yadav ([@rakshityadav1868](https://github.com/rakshityadav1868))

## 🤔 Support

For questions or issues, please open an issue on the GitHub repository.

---

**Happy Coding!** 💻
