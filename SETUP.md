# Dilo School Platform - Setup Guide

This guide will help you set up and run the Dilo School Platform with the frontend, backend, and database connected.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (v5 or higher)
3. **npm** or **pnpm** package manager

## Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend/dilo-backend-main
npm install

# Install frontend dependencies
cd ../../front
npm install
```

### 2. Database Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB (if not already running)
mongod
```

The application will connect to `mongodb://localhost:27017/dilo-school-platform`

### 3. Environment Configuration

The backend environment is already configured with:
- Database URL: `mongodb://localhost:27017/dilo-school-platform`
- JWT Secret: `your-super-secret-jwt-key-change-this-in-production`
- Server Port: `8080`
- CORS enabled for `http://localhost:3000`

The frontend is configured to connect to `http://localhost:8080/api/v1`

### 4. Start the Application

#### Option A: Use the PowerShell script (Windows)
```powershell
.\start-dev.ps1
```

#### Option B: Manual startup

**Terminal 1 - Backend:**
```bash
cd backend/dilo-backend-main
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd front
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/docs

## Project Structure

```
dhia/
├── backend/dilo-backend-main/     # NestJS Backend
│   ├── src/
│   │   ├── auth/                  # Authentication module
│   │   ├── users/                 # User management
│   │   ├── schedule/              # Schedule management
│   │   ├── notifications/         # Notifications
│   │   └── payment/               # Payment processing
│   └── .env.development           # Environment variables
├── front/                         # Next.js Frontend
│   ├── app/                       # App router pages
│   ├── components/                # React components
│   ├── contexts/                  # React contexts
│   ├── lib/                       # Utilities and API client
│   └── .env.local                 # Frontend environment
└── start-dev.ps1                  # Development startup script
```

## API Endpoints

The backend provides the following main endpoints:

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `GET /api/v1/users/teachers` - Get teachers
- `GET /api/v1/users/parents` - Get parents

### Other Modules
- Schedule management
- Notifications
- Payment processing
- Dashboard data

## User Roles

The system supports three user roles:
- **parent** - Parents can view schedules, make payments, etc.
- **teacher** - Teachers can manage schedules, view students, etc.
- **administrator** - Admins have full system access

## Troubleshooting

### Backend Issues
- Ensure MongoDB is running
- Check if port 8080 is available
- Verify environment variables in `.env.development`

### Frontend Issues
- Ensure backend is running on port 8080
- Check browser console for API errors
- Verify `.env.local` configuration

### Database Issues
- Ensure MongoDB is installed and running
- Check MongoDB connection string
- Verify database permissions

## Development Notes

- The frontend uses React Context for state management
- Authentication is handled via JWT tokens
- CORS is configured for localhost:3000
- The API client automatically handles token management
- All API responses follow a consistent format with `success`, `data`, and `error` fields

## Next Steps

1. Test user registration and login
2. Explore the different user dashboards
3. Test the schedule management features
4. Configure additional environment variables for production
5. Set up proper JWT secrets for production deployment
