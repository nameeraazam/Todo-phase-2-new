// Mock API service for development/testing without backend
// This simulates the backend API responses

let mockTodos = [
  { id: '1', title: 'Sample Todo 1', completed: false, createdAt: new Date().toISOString() },
  { id: '2', title: 'Sample Todo 2', completed: true, createdAt: new Date().toISOString() },
];

export async function getTodos() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { data: mockTodos };
}

export async function createTodo(title) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newTodo = {
    id: (mockTodos.length + 1).toString(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  mockTodos.push(newTodo);
  return { data: newTodo };
}

export async function updateTodo(id, updates) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockTodos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    mockTodos[index] = { ...mockTodos[index], ...updates };
    return { data: mockTodos[index] };
  }
  
  return { error: { message: 'Todo not found' } };
}

export async function deleteTodo(id) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockTodos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    const deleted = mockTodos.splice(index, 1)[0];
    return { data: { message: 'Todo deleted successfully' } };
  }
  
  return { error: { message: 'Todo not found' } };
}