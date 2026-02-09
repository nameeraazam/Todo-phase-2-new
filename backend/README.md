# Todo Backend API

This is the backend API for the Todo application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root of the backend directory with the following content:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

3. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Technologies Used

- Express.js
- MongoDB/Mongoose
- CORS
- Dotenv for environment variables