# Todo App

This is a full-stack todo application with a Next.js frontend and Express.js backend.

## Project Structure

- `frontend/` - Next.js application
- `backend/` - Express.js API server

## Deployment

### Backend (Express.js) on Hugging Face Spaces

The backend is prepared for deployment on Hugging Face Spaces:

1. Go to [Hugging Face](https://huggingface.co)
2. Create a new Space
3. Upload all files in the `backend` directory
4. Set environment variables:
   - `MONGODB_URI`: your MongoDB connection string (e.g., from MongoDB Atlas)
   - `FRONTEND_URL`: your Vercel frontend URL (after frontend deployment)
5. Note the backend URL after deployment (format: https://your-username-huggingface-space.hf.space)

### Frontend (Next.js) on Vercel

The frontend is ready for deployment on Vercel:

1. Go to [Vercel](https://vercel.com)
2. Sign in and click "New Project"
3. Import your GitHub repository
4. Select the `frontend` directory as the project root
5. Add environment variable:
   - `NEXT_PUBLIC_API_BASE_URL`: your Hugging Face backend URL (e.g., https://your-username-huggingface-space.hf.space/api)
6. Vercel will automatically detect it's a Next.js project and configure the build
7. Click "Deploy"

## Local Development

### Frontend
1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Backend
1. Navigate to the `backend` directory
2. Install dependencies: `npm install`
3. Create a `.env` file with your environment variables
4. Start the server: `npm run dev`

## Tech Stack

- Frontend: Next.js 14, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT tokens
- Deployment: Vercel (frontend), Hugging Face Spaces (backend)
- Styling: Tailwind CSS