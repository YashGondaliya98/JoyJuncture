# Backend Setup Instructions

## Quick Start

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   
   Server runs on: http://localhost:5173

## API Endpoints

- **POST /register** - Create new user account
- **POST /login** - User/Admin login

## Database

- **Collection:** users
- **Fields:** fullName, email, phone, password, role, city, joyPoints, joinedAt, lastLogin, status

## Test Registration

Register form should save data to MongoDB "users" collection and redirect to login.

## Test Login

Login form with admin checkbox should authenticate users based on role.