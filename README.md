<<<<<<< HEAD
# Helpdesk Ticketing System

A full-featured helpdesk web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication and role-based access control (Customer, Agent, Admin)
- Ticket management with status tracking
- Support for notes and file attachments
- Customer management
- Dashboard with statistics for admins
- Responsive interface built with Material UI

## User Roles

1. **Customer**
   - Self-register and create account
   - Submit tickets
   - Add notes to tickets
   - View their ticket history

2. **Customer Service Agent**
   - View all tickets
   - Add notes to any ticket
   - Update ticket status
   - View customer information

3. **Admin**
   - All agent capabilities
   - Create and manage users
   - View dashboard statistics
   - Administrative functions

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local installation or Atlas connection)

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ticketsystem
   ```

2. **Set up the backend**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory with:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/helpdesk
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

3. **Set up the frontend**

   ```bash
   cd ../client
   npm install
   ```

4. **Start the application**

   For development, start both backend and frontend:

   In the server directory:
   ```bash
   npm run dev
   ```

   In the client directory:
   ```bash
   npm start
   ```

   The app will be available at: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Tickets
- `GET /api/tickets` - Get all tickets (filtered by user role)
- `GET /api/tickets/:id` - Get ticket details
- `POST /api/tickets` - Create a new ticket
- `PUT /api/tickets/:id/status` - Update ticket status
- `POST /api/tickets/:id/notes` - Add note to ticket
- `GET /api/tickets/stats` - Get ticket statistics (admin only)

### Users & Customers
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create new user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/customers` - Get all customers (agent, admin only)
- `GET /api/customers/:id` - Get customer by ID (agent, admin only)

## License

MIT 
=======
# Ticket-System
The app will feature two main sections accessible via a left-side menu: Tickets and Customers.
>>>>>>> 2c6da07fd83aba5a76c7e58edf08f3a6442156ca
