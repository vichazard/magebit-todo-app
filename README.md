# Todo List Application

A full-stack todo list application built with TypeScript, Express, PostgreSQL, and React.

## Architecture

The application consists of three main components:

- Frontend: React-based web application
- Backend: Express.js REST API
- Database: PostgreSQL for data persistence

## Prerequisites

- Docker and Docker Compose
- Node.js and npm/yarn (for local development)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/secret-glimmer/magebit-todo-app.git
   cd magebit-todo-app
   ```

2. Set up environment variables:

   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Adjust variables if needed (default values should work for local development)

3. Start the application:

   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:4173
   - Backend API: http://localhost:3000

## Development

To run the application in development mode:

1. Start the database:

   ```bash
   docker-compose up postgres -d
   ```

2. Start the backend:

   ```bash
   cd backend
   yarn install
   yarn dev
   ```

3. Start the frontend:
   ```bash
   cd frontend
   yarn install
   yarn dev
   ```
