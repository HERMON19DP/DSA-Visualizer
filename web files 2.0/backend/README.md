# DSA Visualiser — Backend

## Setup

1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values:
   - Create a free MongoDB cluster at mongodb.com/atlas
   - For Gmail: enable 2FA, then create an App Password at myaccount.google.com/apppasswords
4. Start the dev server: `npm run dev`
5. You should see:
   - `Server running on port 5000`
   - `MongoDB connected successfully`

## Test the API with Thunder Client or Postman

### Sign Up
POST http://localhost:5000/api/auth/signup
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Password123"
}
Expected: 201 with message to check email

### Sign In (after verifying email)
POST http://localhost:5000/api/auth/signin
Body (JSON):
{
  "email": "test@example.com",
  "password": "Password123"
}
Expected: 200 with accessToken and user object

### Get current user (protected route)
GET http://localhost:5000/api/auth/me
Header: Authorization: Bearer <accessToken from signin>
Expected: 200 with user object

### Sign Out
POST http://localhost:5000/api/auth/signout
(No body needed — refresh token comes from cookie)
Expected: 200 with success message
