# CVACare Backend API

A simple backend API for user authentication with MongoDB.

## Features

- User Registration
- User Login with JWT authentication
- Protected routes
- User profile management
- MongoDB integration
- PM2 daemon support for production

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- PM2 (for daemon mode)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install PM2 globally (for daemon mode):
```bash
npm install -g pm2
```

3. Configure environment variables:
   - Copy `.env` file and update the values:
     - `PORT`: Server port (default: 5000)
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your secret key for JWT (change in production!)
     - `NODE_ENV`: development or production

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Daemon Mode (PM2)
```bash
npm run daemon
```

### PM2 Commands
```bash
# Start the app
pm2 start ecosystem.config.js

# Stop the app
pm2 stop cvacare-backend

# Restart the app
pm2 restart cvacare-backend

# Delete the app from PM2
pm2 delete cvacare-backend

# View logs
pm2 logs cvacare-backend

# Monitor
pm2 monit

# List all apps
pm2 list

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

## API Endpoints

### Public Routes

#### Register User
- **POST** `/api/auth/register`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1990-01-01"
}
```

#### Login User
- **POST** `/api/auth/login`
- Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Routes (Require JWT Token)

Add token to request headers:
```
Authorization: Bearer <your_jwt_token>
```

#### Get Current User
- **GET** `/api/auth/me`

#### Update Profile
- **PUT** `/api/auth/updateprofile`
- Body:
```json
{
  "name": "John Updated",
  "phoneNumber": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

## User Model Schema

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin/doctor),
  phoneNumber: String,
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   └── auth.js              # JWT verification
├── models/
│   └── User.js              # User model
├── routes/
│   └── authRoutes.js        # API routes
├── logs/                    # PM2 logs directory
├── .env                     # Environment variables
├── .gitignore
├── ecosystem.config.js      # PM2 configuration
├── package.json
├── server.js                # Main entry point
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- Protected routes
- Role-based access control ready

## License

ISC
