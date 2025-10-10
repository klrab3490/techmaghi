# JWT Authentication API Testing Guide

## Overview
This guide covers comprehensive testing for your JWT authentication backend with Node.js, Express, and MongoDB.

## Prerequisites
- Server running on `http://localhost:5000`
- MongoDB connected
- Environment variables configured (.env file)

## API Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/register` | No | Create new user account |
| POST | `/login` | No | Authenticate user and get JWT token |
| GET | `/profile` | Yes | Get user profile information |
| GET | `/protected` | Yes | Access protected resource |

---

## 1. Registration Tests (POST /register)

### ✅ Valid Registration
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser1",
    "email": "test1@example.com",
    "password": "password123"
  }'
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673123456789abcdef123456",
    "username": "testuser1",
    "email": "test1@example.com"
  }
}
```

### ❌ Duplicate Email Test
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser2",
    "email": "test1@example.com",
    "password": "password123"
  }'
```

**Expected Response (400):**
```json
{
  "message": "Email already registered"
}
```

### ❌ Duplicate Username Test
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser1",
    "email": "test2@example.com",
    "password": "password123"
  }'
```

**Expected Response (400):**
```json
{
  "message": "Username already taken"
}
```

### ❌ Missing Fields Test
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser3",
    "password": "password123"
  }'
```

**Expected Response (400):**
```json
{
  "message": "Path `email` is required."
}
```

---

## 2. Login Tests (POST /login)

### ✅ Valid Login with Username
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser1", 
    "password": "password123"
  }'
```

### ✅ Valid Login with Email
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test1@example.com",
    "password": "password123"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673123456789abcdef123456",
    "username": "testuser1", 
    "email": "test1@example.com"
  }
}
```

### ❌ Invalid Password
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser1",
    "password": "wrongpassword"
  }'
```

**Expected Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

### ❌ Non-existent User
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nonexistentuser",
    "password": "password123"
  }'
```

**Expected Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

## 3. Protected Route Tests

> **Note:** Replace `YOUR_TOKEN_HERE` with actual JWT token from login response

### ✅ Valid Token Access
```bash
curl -X GET http://localhost:5000/protected \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "message": "Access granted to protected route!",
  "user": {
    "id": "673123456789abcdef123456",
    "username": "testuser1",
    "email": "test1@example.com",
    "iat": 1673123456,
    "exp": 1673127056
  }
}
```

### ❌ No Token Provided
```bash
curl -X GET http://localhost:5000/protected
```

**Expected Response (403):**
```json
{
  "message": "Token not provided"
}
```

### ❌ Invalid Token
```bash
curl -X GET http://localhost:5000/protected \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Response (401):**
```json
{
  "message": "Invalid or expired token"
}
```

### ❌ Malformed Authorization Header
```bash
curl -X GET http://localhost:5000/protected \
  -H "Authorization: YOUR_TOKEN_HERE"
```

**Expected Response (403):**
```json
{
  "message": "Token not provided"
}
```

---

## 4. Profile Route Tests

### ✅ Get User Profile
```bash
curl -X GET http://localhost:5000/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "673123456789abcdef123456",
    "username": "testuser1",
    "email": "test1@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 5. Token Expiration Tests

### Test Short Expiry (Development Only)
1. **Modify server.js temporarily:**
   ```javascript
   // Change expiresIn to 5 seconds for testing
   const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5s" });
   ```

2. **Get new token and wait:**
   ```bash
   # Get token
   curl -X POST http://localhost:5000/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser1", "password": "password123"}'
   
   # Wait 6 seconds, then try protected route
   curl -X GET http://localhost:5000/protected \
     -H "Authorization: Bearer EXPIRED_TOKEN_HERE"
   ```

**Expected Response (401):**
```json
{
  "message": "Invalid or expired token"
}
```

---

## 6. Error Scenario Tests

### ❌ Malformed JSON
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "test@test.com", "password"}'
```

### ❌ Empty Request Body
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{}'
```

### ❌ Missing Content-Type Header
```bash
curl -X POST http://localhost:5000/register \
  -d '{"username": "test", "email": "test@test.com", "password": "123"}'
```

---

## Testing Workflow

1. **Start your server:** `npm start` or `node server.js`
2. **Test in this order:**
   - Register a new user
   - Login with that user
   - Copy the JWT token from login response
   - Test protected routes with the token
   - Test error scenarios

## Tools for Testing

### Option 1: cURL (Command Line)
Use the commands provided above

### Option 2: Postman
1. Create a new collection
2. Set up requests for each endpoint
3. Use variables for tokens
4. Set up test scripts

### Option 3: Thunder Client (VS Code Extension)
1. Install Thunder Client extension
2. Create requests in VS Code
3. Organize by collections

### Option 4: Create Test Scripts
Consider adding automated tests with:
- Jest + Supertest
- Mocha + Chai
- Vitest

---

## Expected Status Codes Summary

| Scenario | Status Code | Description |
|----------|-------------|-------------|
| Successful registration | 201 | Created |
| Successful login | 200 | OK |
| Successful protected access | 200 | OK |
| Validation error | 400 | Bad Request |
| Authentication failed | 401 | Unauthorized |
| Token not provided | 403 | Forbidden |
| User not found | 404 | Not Found |
| Server error | 500 | Internal Server Error |

---

## Next Steps After Testing

1. **Add Rate Limiting** - Prevent brute force attacks
2. **Add Input Validation** - Sanitize and validate all inputs
3. **Add Logging** - Log important events and errors
4. **Add Password Reset** - Allow users to reset passwords
5. **Add Email Verification** - Verify user emails
6. **Add Refresh Tokens** - Implement token refresh mechanism
7. **Add User Roles** - Implement role-based access control
8. **Add API Documentation** - Use Swagger/OpenAPI
9. **Add Automated Tests** - Unit and integration tests
10. **Add CORS Configuration** - Configure for frontend integration