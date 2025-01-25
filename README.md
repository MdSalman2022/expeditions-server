# Expeditions Server

## Overview

Expeditions Server is a backend application built with Node.js and Express.js, providing APIs for managing expeditions, bookings, and user authentication. It integrates real-time functionalities using Socket.IO and sends emails via Resend.

## Tech Stack

- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT and Magic URL
- **Real-time:** Socket.IO
- **Email Service:** Resend
- **Environment Management:** dotenv

## Project Structure

- **controllers/**: Handles the business logic for different routes.
- **models/**: Defines the data schemas using Mongoose.
- **routes/**: Sets up the API endpoints and associates them with controllers.
- **utils/**: Contains utility functions and helpers (e.g., email, Socket.IO).
- **config/**: Configuration files, including database setup.
- **middlewares/**: Custom middleware functions for authentication and authorization.
- **app.js**: The main server file that initializes and configures the Express application.
- **package.json**: Lists project dependencies and scripts.
- **.env**: Environment variables (refer to `.env.example` for required variables).
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **README.md**: Project documentation.

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** instance
- **npm** or **yarn**

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/expeditions-server.git
   cd expeditions-server
   ```
