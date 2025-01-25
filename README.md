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

1. **Clone & Install**

   ```bash
   git clone https://github.com/yourusername/expeditions-server.git
   cd expeditions-server
   npm install

   ```

## API Testing with Postman

### Setup Postman Environment

1. Open Postman and create a new Environment:

   - Click "Environments" tab
   - Click "Create Environment"
   - Name it "Expeditions API Environment"
   - Add the following variables:
     ```
     base_url: http://localhost:5000
     USER_JWT_TOKEN: (leave empty initially)
     ADMIN_JWT_TOKEN: (leave empty initially)
     MAGIC_LINK_TOKEN: (leave empty initially)
     EXPEDITION_ID: (leave empty initially)
     BOOKING_ID: (leave empty initially)
     ```

2. Import the [postman.json](postman.json) collection:
   - Click "Import" button
   - Select the `postman.json` file
   - The collection "Expeditions API" will appear in your workspace

### Testing Flow

1. **Authentication**

   - Use "Send Login Link" with your email
   - Check your email for the magic link token
   - Copy the token parameter and set as `MAGIC_LINK_TOKEN`
   - Use "Verify Login Link" to get JWT token
   - Set the received token as `USER_JWT_TOKEN` or `ADMIN_JWT_TOKEN` (based on user role)

2. **Expeditions (Admin Only)**

   - Create Expedition (requires `ADMIN_JWT_TOKEN`)
   - Copy the received expedition ID to `EXPEDITION_ID`
   - Test Update and Delete operations

3. **Bookings**
   - Create Booking (requires `USER_JWT_TOKEN`)
   - Copy the received booking ID to `BOOKING_ID`
   - Test Get and Delete operations

### Available Routes

#### Authentication

- `POST /api/auth/send-link` - Send magic login link
- `GET /api/auth/verify` - Verify magic link token
- `GET /api/auth/me` - Get current user info

#### Expeditions

- `POST /api/expeditions` - Create expedition (Admin)
- `PUT /api/expeditions/:id` - Update expedition (Admin)
- `DELETE /api/expeditions/:id` - Delete expedition (Admin)
- `GET /api/expeditions` - Get all expeditions
- `GET /api/expeditions/analytics/popular` - Get popular destinations
- `GET /api/expeditions/analytics/bookings-per-month` - Get monthly bookings

#### Bookings

2. Import the [postman.json](postman.json) collection:
   - Click "Import" button
   - Select the `postman.json` file
   - The collection "Expeditions API" will appear in your workspace

### Testing Flow

1. **Authentication**

   - Use "Send Login Link" with your email
   - Check your email for the magic link token
   - Copy the token parameter and set as `MAGIC_LINK_TOKEN`
   - Use "Verify Login Link" to get JWT token
   - Set the received token as `USER_JWT_TOKEN` or `ADMIN_JWT_TOKEN` (based on user role)

2. **Expeditions (Admin Only)**

   - Create Expedition (requires `ADMIN_JWT_TOKEN`)
   - Copy the received expedition ID to `EXPEDITION_ID`
   - Test Update and Delete operations

3. **Bookings**
   - Create Booking (requires `USER_JWT_TOKEN`)
   - Copy the received booking ID to `BOOKING_ID`
   - Test Get and Delete operations

### Available Routes

#### Authentication

- `POST /api/auth/send-link` - Send magic login link
- `GET /api/auth/verify` - Verify magic link token
- `GET /api/auth/me` - Get current user info

#### Expeditions

- `POST /api/expeditions` - Create expedition (Admin)
- `PUT /api/expeditions/:id` - Update expedition (Admin)
- `DELETE /api/expeditions/:id` - Delete expedition (Admin)
- `GET /api/expeditions` - Get all expeditions
- `GET /api/expeditions/analytics/popular` - Get popular destinations
- `GET /api/expeditions/analytics/bookings-per-month` - Get monthly bookings

#### Bookings

- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get specific booking
- `DELETE /api/bookings/:id` - Delete booking (Admin)

### Testing with Postman

1. **Setup Environment**

   ```bash
   # Import collection
   curl -o postman.json https://raw.githubusercontent.com/yourusername/expeditions-server/main/postman.json

   ```
