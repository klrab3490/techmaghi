# JWT Authentication Backend with MongoDB

A complete JWT authentication system with user registration, login, and profile management using MongoDB and bcrypt for secure password hashing.

## Features

- ✅ User Registration with email and username
- ✅ Secure Password Hashing with bcrypt (salt rounds: 12)
- ✅ JWT Token Authentication
- ✅ MongoDB Integration with Mongoose
- ✅ Input Validation and Error Handling
- ✅ Protected Routes
- ✅ User Profile Management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone/navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and update with your settings:
   ```
   PORT=5000
   JWT_SECRET=your_super_secret_key_here
   MONGODB_URI=mongodb://localhost:27017/jwt-auth-db
   ```

4. Make sure MongoDB is running on your system

5. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

### 1. Register User
**POST** `/register`

Register a new user with username, email, and password.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (Success - 201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1234567890abcdef12345",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### 2. Login User
**POST** `/login`

Authenticate user with username/email and password.

**Request Body:**
```json
{
  "username": "john_doe",  // Can also use email
  "password": "securepassword123"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1234567890abcdef12345",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### 3. Get User Profile
**GET** `/profile`

Get authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (Success - 200):**
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "64f1234567890abcdef12345",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Protected Route (Demo)
**GET** `/protected`

A demo protected route that requires authentication.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (Success - 200):**
```json
{
  "message": "Access granted to protected route!",
  "user": {
    "id": "64f1234567890abcdef12345",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Email already registered"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Token not provided"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error during registration"
}
```

## Testing with curl

### Register a new user:
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com", 
    "password": "password123"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Access protected route:
```bash
curl -X GET http://localhost:5000/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds of 12 for secure password storage
- **JWT Tokens**: Stateless authentication with configurable expiration (1 hour)
- **Input Validation**: Comprehensive validation for email format, username length, password requirements
- **Database Security**: Uses Mongoose with built-in protection against injection attacks
- **Error Handling**: Secure error responses that don't leak sensitive information

## Database Schema

### User Collection
```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email format),
  password: String (required, hashed, min 6 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT implementation
- **dotenv**: Environment variable management

## Development Notes

- JWT tokens expire after 1 hour (configurable)
- Password validation requires minimum 6 characters
- Username must be 3-30 characters
- Email format validation included
- Duplicate email/username prevention
- Automatic password hashing on user save
- Case-insensitive email storage