# Fixing 404 Errors in Your Hugging Face Space

## Current Issue
Your backend at https://nameerasaeda-phase2new1.hf.space is returning 404 errors.

## Root Cause
The issue is likely due to the way the Express.js server is being started in the Hugging Face environment. The original setup tried to run both Flask and Express.js, which can cause conflicts.

## Solution: Replace with Simplified Backend

### Step 1: Download the Corrected Files
Download these files from the repository:
1. `server.js` - Simplified Express.js server that listens on the correct port
2. `package.json` - Dependencies for the backend
3. `Dockerfile` - Updated Docker configuration for Hugging Face
4. `space.yaml` - Updated Space configuration

### Step 2: Update Your Hugging Face Space
1. Go to your Space: https://huggingface.co/spaces/NameeraSyeda/phase2new1
2. Replace the following files:
   - `app.py` - Replace with the simplified server.js approach
   - `Dockerfile` - Use the new Dockerfile
   - `package.json` - Use the new package.json
   - `server.js` - Use the new server.js
   - `space.yaml` - Use the new space.yaml

### Step 3: Updated File Contents

#### server.js (Updated)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Use the PORT provided by Hugging Face or default to 7860
const PORT = process.env.PORT || 7860;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Allow requests from Vercel frontend
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define Todo schema and model
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({ title });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      id, 
      { title, completed }, 
      { new: true }
    );
    
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedTodo = await Todo.findByIdAndDelete(id);
    
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Health check endpoint - this is important for Hugging Face
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo Backend API is running!',
    endpoints: {
      getAllTodos: 'GET /api/todos',
      createTodo: 'POST /api/todos',
      updateTodo: 'PUT /api/todos/:id',
      deleteTodo: 'DELETE /api/todos/:id'
    }
  });
});

// Wildcard route to handle any other requests
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
```

#### Dockerfile (Updated)
```
FROM node:18-alpine

# Install Python and pip (required for Hugging Face Spaces)
RUN apk add --update python3 py3-pip

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy server file
COPY server.js .

# Expose the port
EXPOSE 7860

# Start the application
CMD ["node", "server.js"]
```

#### package.json (Updated)
```json
{
  "name": "todo-backend-hf",
  "version": "1.0.0",
  "description": "Backend API for the Todo application optimized for Hugging Face Spaces",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "keywords": [
    "todo",
    "backend",
    "api",
    "express",
    "mongodb",
    "huggingface"
  ],
  "author": "Todo App Team",
  "license": "MIT"
}
```

#### space.yaml (Updated)
```yaml
runtime:
  huggingface:spaces
  sdk: docker
  hardware: cpu-basic
```

### Step 4: Set Environment Variables
In your Space settings, make sure you have:
- `MONGODB_URI`: Your MongoDB connection string

### Step 5: Wait for Rebuild
After uploading the files, Hugging Face will rebuild your Space automatically. This may take a few minutes.

### Step 6: Test the Backend
Once rebuilt, test:
- Root endpoint: `https://nameerasaeda-phase2new1.hf.space/`
- API endpoint: `https://nameerasaeda-phase2new1.hf.space/api/todos`

## Expected Result
After following these steps, your backend should be accessible without 404 errors, and you can proceed with deploying your frontend to Vercel.