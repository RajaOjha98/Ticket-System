# 🎫 Helpdesk Ticketing System

A comprehensive, full-stack helpdesk ticketing system built with the MERN stack (MongoDB, Express.js, React, Node.js) and Material-UI. This application provides a complete solution for managing customer support tickets with role-based access control, real-time updates, and file attachment support.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.1.0-blue.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green.svg)

## 🌟 Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Role-based access control** (Customer, Agent, Admin)
- **Extended token expiration** for admin users (90 days vs 30 days)
- **Automatic logout** on token expiration

### 🎫 Ticket Management
- **Create, view, and manage tickets** with unique ticket IDs
- **Real-time status updates** (Active, Pending, Closed)
- **Threaded conversation system** with notes and replies
- **File attachment support** with secure file uploads
- **Advanced filtering and search** by status, customer, and keywords
- **Ticket assignment** and tracking

### 👥 User Management
- **Customer self-registration** with email validation
- **Admin user creation** with role assignment
- **Profile management** with password updates
- **Customer directory** for agents and admins

### 📊 Analytics & Reporting
- **Administrative dashboard** with system statistics
- **Ticket metrics** (total, active, pending, closed)
- **Customer analytics** and registration tracking
- **Real-time data updates**

### 🎨 User Interface
- **Responsive Material-UI design** optimized for all devices
- **Dark/Light theme support**
- **Intuitive navigation** with role-based menu items
- **Real-time notifications** and error handling
- **Professional, modern interface**

## 👤 User Roles & Permissions

### 🛒 Customer
- ✅ Self-register and create account
- ✅ Submit and manage tickets
- ✅ Add notes and attachments to own tickets
- ✅ View personal ticket history
- ✅ Update profile information

### 🎧 Customer Service Agent
- ✅ All customer capabilities
- ✅ View and manage all tickets
- ✅ Add notes to any ticket
- ✅ Update ticket statuses
- ✅ Access customer directory
- ✅ View customer ticket history

### 👑 Administrator
- ✅ All agent capabilities
- ✅ Create and manage user accounts
- ✅ Access administrative dashboard
- ✅ View system statistics and analytics
- ✅ Delete users and tickets
- ✅ Full system administration

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v16.0.0 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RajaOjha98/Ticket-System.git
   cd Ticket-System
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `server` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/helpdesk
   
   # JWT Configuration
   JWT_SECRET=your_super_secure_jwt_secret_key_here_min_32_chars
   
   # File Upload Configuration (Optional)
   MAX_FILE_SIZE=5242880
   ```

   Create a `.env` file in the `client` directory (for production):
   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000
   ```

### 🗄️ Database Setup

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Create admin user** (run from server directory)
   ```bash
   npm run create-admin
   ```

3. **Create agent user** (run from server directory)
   ```bash
   npm run create-agent
   ```

### 🎯 Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend client** (in a new terminal)
   ```bash
   cd client
   npm start
   ```
   Client will run on `http://localhost:3000`

#### Production Mode

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server**
   ```bash
   cd server
   npm start
   ```

## 🔑 Default Credentials

### Administrator
- **Email:** `admin@gmail.com`
- **Password:** `admin123`
- **Privileges:** Full system access

### Customer Service Agent
- **Email:** `agent@gmail.com`
- **Password:** `agent123`
- **Privileges:** Ticket and customer management

## 🛠️ API Documentation

### Authentication Endpoints
```
POST /api/users/register    # Register new user
POST /api/users/login       # User login
GET  /api/users/profile     # Get user profile
PUT  /api/users/profile     # Update user profile
```

### Ticket Management
```
GET    /api/tickets           # Get tickets (filtered by role)
POST   /api/tickets           # Create new ticket
GET    /api/tickets/:id       # Get ticket details
PUT    /api/tickets/:id/status # Update ticket status
POST   /api/tickets/:id/notes  # Add note to ticket
GET    /api/tickets/stats      # Get ticket statistics (admin)
```

### User & Customer Management
```
GET    /api/users             # Get all users (admin)
POST   /api/users             # Create user (admin)
PUT    /api/users/:id         # Update user (admin)
DELETE /api/users/:id         # Delete user (admin)
GET    /api/customers         # Get customers (agent/admin)
GET    /api/customers/:id     # Get customer details
```

## 🏗️ Project Structure

```
ticket-system/
├── client/                    # React frontend
│   ├── public/               # Static assets
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React context providers
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service functions
│   │   └── App.js            # Main app component
│   └── package.json
├── server/                   # Express backend
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── scripts/              # Database seed scripts
│   ├── uploads/              # File upload directory
│   └── server.js             # Main server file
└── README.md
```

## 🔧 Technology Stack

### Frontend
- **React 19.1.0** - UI library
- **Material-UI 7.0.2** - Component library
- **React Router 7.5.1** - Client-side routing
- **Axios 1.8.4** - HTTP client
- **React Hook Form 7.56.0** - Form management
- **Moment.js 2.30.1** - Date formatting
- **JWT Decode 4.0.0** - Token handling

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB 8.13.2** - Database
- **Mongoose** - ODM
- **JWT 9.0.2** - Authentication
- **bcryptjs 3.0.2** - Password hashing
- **Multer 1.4.5** - File uploads
- **CORS 2.8.5** - Cross-origin requests

## 🚀 Deployment

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set build directory to `client`
3. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-api-domain.com
   ```

### Heroku/Railway (Backend)
1. Deploy the `server` directory
2. Set environment variables in your hosting platform
3. Ensure MongoDB connection string is properly configured

### Docker (Full Stack)
```dockerfile
# Example Dockerfile for server
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Issues**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

**Port Already in Use**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

**CORS Errors**
- Ensure `REACT_APP_API_URL` is properly set
- Check CORS configuration in server

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the excellent component library
- [MongoDB](https://www.mongodb.com/) for the robust database solution
- [Express.js](https://expressjs.com/) for the minimal web framework
- [React](https://reactjs.org/) for the powerful UI library

## 📧 Support

For support, email [support@example.com](mailto:support@example.com) or create an issue on GitHub.

---

**Made with ❤️ by [Raja Ojha](https://github.com/RajaOjha98)**
