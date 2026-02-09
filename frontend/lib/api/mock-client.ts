// API service for the Todo application
// Uses localStorage as a mock backend for demonstration purposes

// Define the Todo type
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Initialize mock data in localStorage if not present
if (typeof window !== 'undefined') {
  if (!localStorage.getItem('todos')) {
    const initialTodos: Todo[] = [
      { id: '1', title: 'Learn Next.js', completed: true, createdAt: new Date().toISOString() },
      { id: '2', title: 'Build a Todo App', completed: false, createdAt: new Date().toISOString() },
    ];
    localStorage.setItem('todos', JSON.stringify(initialTodos));
  }
}

// Get all todos
export async function getTodos(): Promise<{ data?: Todo[]; error?: any }> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    return { data: todos };
  } catch (error) {
    return { error: { message: 'Failed to get todos' } };
  }
}

// Create a new todo
export async function createTodo(title: string): Promise<{ data?: Todo; error?: any }> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    
    return { data: newTodo };
  } catch (error) {
    return { error: { message: 'Failed to create todo' } };
  }
}

// Update a todo
export async function updateTodo(id: string, updates: Partial<Todo>): Promise<{ data?: Todo; error?: any }> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const index = todos.findIndex((todo: Todo) => todo.id === id);
    
    if (index === -1) {
      return { error: { message: 'Todo not found' } };
    }
    
    todos[index] = { ...todos[index], ...updates };
    localStorage.setItem('todos', JSON.stringify(todos));
    
    return { data: todos[index] };
  } catch (error) {
    return { error: { message: 'Failed to update todo' } };
  }
}

// Delete a todo
export async function deleteTodo(id: string): Promise<{ data?: any; error?: any }> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const index = todos.findIndex((todo: Todo) => todo.id === id);
    
    if (index === -1) {
      return { error: { message: 'Todo not found' } };
    }
    
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    
    return { data: { message: 'Todo deleted successfully' } };
  } catch (error) {
    return { error: { message: 'Failed to delete todo' } };
  }
}