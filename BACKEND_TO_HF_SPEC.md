# Full-Stack Todo App: Deployment Specification

## Overview
This document outlines the process to deploy the full-stack Todo application with the frontend on Vercel and backend on Hugging Face Spaces.

## Architecture
- **Frontend**: Next.js application hosted on Vercel
- **Backend**: Express.js API hosted on Hugging Face Spaces
- **Database**: MongoDB (hosted separately, e.g., MongoDB Atlas)
- **Communication**: Frontend communicates with backend via REST API calls

## Prerequisites
- GitHub account with access to the repository
- Vercel account
- Hugging Face account
- MongoDB database (e.g., MongoDB Atlas)

## Deployment Steps

### Part 1: Deploy Backend to Hugging Face Spaces

1. **Prepare Hugging Face Account**
   - Sign up at [huggingface.co/join](https://huggingface.co/join)
   - Verify your email address

2. **Create a New Space**
   - Go to [huggingface.co/spaces](https://huggingface.co/spaces)
   - Click "Create new Space"
   - Choose:
     - **Space SDK**: Docker (needed for Node.js backend)
     - **Hardware**: CPU Basic (adjust as needed)
     - **Visibility**: Public or Private (as per your preference)

3. **Upload Backend Code**
   - In your Space, click on the "Files" tab
   - Upload all files from the `backend/` directory:
     - `app.py` - Python wrapper for the Express.js app
     - `Dockerfile` - Container configuration
     - `package.json` - Node.js dependencies
     - `package-lock.json` - Locked dependencies
     - `server.js` - Main Express.js server
     - `requirements.txt` - Python dependencies
     - `space.yaml` - Hugging Face Space configuration
     - `.env` - Environment variables (optional, for local testing)

4. **Configure Environment Variables**
   - In your Space, go to the "Settings" tab
   - Under "Secrets", add:
     - `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
     - `NODE_ENV`: Set to `production`

5. **Start the Space**
   - The Space will automatically build and deploy based on the Dockerfile
   - Monitor the "Logs" tab to ensure the application starts correctly
   - Once deployed, you'll get a URL in the format: `https://your-username-huggingface-space.hf.space`

6. **Note the Backend URL**
   - After successful deployment, note down your backend URL
   - Example: `https://your-username-todo-backend.hf.space`
   - API endpoints will be accessible at: `https://your-username-todo-backend.hf.space/api/todos`

### Part 2: Deploy Frontend to Vercel

1. **Prepare Vercel Account**
   - Sign up at [vercel.com/signup](https://vercel.com/signup)
   - Connect with your GitHub account

2. **Import the Project**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository containing the Todo app

3. **Configure the Project**
   - Select the `frontend` directory as the root directory
   - Vercel will automatically detect this is a Next.js project
   - In the "Environment Variables" section, add:
     - `NEXT_PUBLIC_API_BASE_URL`: Set to your Hugging Face backend URL (e.g., `https://your-username-todo-backend.hf.space/api`)

4. **Deploy**
   - Click "Deploy" to start the build process
   - Vercel will build and deploy your frontend
   - Note the assigned frontend URL (e.g., `https://todo-app-frontend.vercel.app`)

### Part 3: Connect Frontend and Backend

1. **Verify Connection**
   - Access your frontend URL
   - Test all functionality:
     - Creating todos
     - Updating todos
     - Deleting todos
     - Loading todos

2. **Troubleshooting Common Issues**
   - **CORS Errors**: Ensure the backend's `FRONTEND_URL` environment variable is set correctly
   - **API Connection Errors**: Verify the `NEXT_PUBLIC_API_BASE_URL` is set correctly in Vercel
   - **Database Connection Errors**: Check that the `MONGODB_URI` is correct in Hugging Face Secrets

## Environment Variables Reference

### Hugging Face Space Secrets
```
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### Vercel Environment Variables
```
NEXT_PUBLIC_API_BASE_URL=https://your-username-todo-backend.hf.space/api
```

## Testing the Deployment

1. **API Endpoint Testing**
   - Test GET `/api/todos`: `curl https://your-username-todo-backend.hf.space/api/todos`
   - Test POST `/api/todos`: Create a new todo via the frontend
   - Verify responses are returned correctly

2. **Frontend Functionality Testing**
   - Load the Vercel frontend URL
   - Create, update, and delete todos
   - Verify data persists in the database

## Maintenance and Updates

### Updating Backend
1. Make changes to backend code
2. Commit and push changes to GitHub
3. Re-upload updated files to Hugging Face Space
4. The Space will rebuild automatically

### Updating Frontend
1. Make changes to frontend code
2. Commit and push changes to GitHub
3. Vercel will automatically redeploy (if connected)

## Security Considerations

1. **Environment Variables**: Never commit sensitive data like database URIs to version control
2. **CORS Policy**: The backend allows requests from any origin during initial setup; tighten this in production
3. **Authentication**: Ensure JWT tokens are properly handled and secured

## Performance Optimization

1. **Backend**: Consider implementing caching for frequently accessed data
2. **Frontend**: Leverage Next.js features like static generation where appropriate
3. **Database**: Ensure proper indexing on MongoDB collections

## Troubleshooting

### Common Issues and Solutions

1. **Backend not starting in Hugging Face Space**
   - Check the logs in the "Logs" tab
   - Ensure all dependencies are listed in package.json
   - Verify the server listens on the PORT environment variable

2. **Frontend can't connect to backend**
   - Verify the NEXT_PUBLIC_API_BASE_URL is set correctly
   - Check browser console for CORS errors
   - Ensure the backend URL is accessible

3. **Database connection issues**
   - Verify MONGODB_URI is correct
   - Check if your MongoDB provider allows connections from Hugging Face IPs
   - Ensure the database cluster is active

## Conclusion

Following this specification will result in a fully deployed full-stack Todo application with the frontend hosted on Vercel and backend on Hugging Face Spaces. The application will be accessible via the Vercel URL, with the frontend communicating with the backend API hosted on Hugging Face.