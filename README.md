# InstaFest - Instagram-Inspired Login Application

A modern, responsive login page inspired by Instagram's design, featuring user authentication with database storage.

## Features

✅ Instagram-inspired UI design  
✅ Responsive layout (mobile, tablet, desktop)  
✅ User registration and login  
✅ Secure password hashing with bcryptjs  
✅ SQLite database for user storage  
✅ Real-time form validation  
✅ Error/success notifications  
✅ Phone mockup design for desktop view  

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. Navigate to project directory:
```bash
cd instafesing
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Or with auto-reload (requires nodemon):
```bash
npm run dev
```

4. Open in browser:
```
http://localhost:3000
```

## Project Structure

```
instafesing/
├── public/
│   ├── index.html          # Login page HTML
│   ├── style.css           # Instagram-inspired styling
│   └── script.js           # Form handling and validation
├── database/
│   └── users.db            # SQLite database (auto-created)
├── server.js               # Express backend server
├── package.json            # Dependencies
└── README.md              # This file
```

## API Endpoints

### POST /api/login
Handles both login and user registration.

**Request:**
```json
{
  "username": "john_doe",
  "password": "secure_password"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": null
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid password"
}
```

### GET /api/users
Returns list of all registered users (for testing purposes).

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "username": "john_doe",
      "email": null,
      "created_at": "2024-01-15 10:30:45"
    }
  ]
}
```

## Usage

1. **First-time users**: Enter any username and password to create an account
2. **Existing users**: Use your credentials to log in
3. **Password requirements**: Minimum 6 characters
4. **Username requirements**: Minimum 3 characters

## Security Features

- Passwords are hashed using bcryptjs (10 salt rounds)
- CORS enabled for cross-origin requests
- Input validation on both client and server
- SQL injection prevention through parameterized queries

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Customization

### Change Colors
Edit the gradient in `public/style.css`:
```css
background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
```

### Change App Title
Update the logo text in `public/index.html` (InstaFest → Your App Name)

### Port Configuration
Change PORT in `server.js` (default: 3000)

## Troubleshooting

**Port already in use:**
```bash
# Windows - Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Database errors:**
Delete `database/users.db` and restart the server to reinitialize

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

Before deploying:
1. Set NODE_ENV=production
2. Use environment variables for PORT
3. Remove /api/users endpoint
4. Implement HTTPS
5. Add rate limiting
6. Use proper database (PostgreSQL, MongoDB, etc.)
7. Add CSRF protection
8. Implement email verification
9. Add password reset functionality

## License

MIT
