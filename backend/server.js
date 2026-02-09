const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Todo Backend API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;