# Next.js Development Skill

## Overview
Next.js is a React-based full-stack web development framework that enables functionality such as hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. This skill focuses on Next.js development best practices, patterns, and solutions.

## Key Capabilities

### Project Setup and Configuration
- Initialize new Next.js projects with `create-next-app`
- Configure `next.config.js` for custom builds
- Set up TypeScript with proper type definitions
- Manage environment variables across different environments

### Routing and Navigation
- Implement file-based routing system using the Pages Router and App Router
- Create dynamic routes with catch-all and optional catch-all patterns
- Handle client-side navigation with the Link component and router API
- Implement middleware for route protection and redirects

### Data Fetching and Server-Side Rendering
- Use `getServerSideProps`, `getStaticProps`, and `getStaticPaths` for data fetching
- Implement Incremental Static Regeneration (ISR) for dynamic content
- Work with server components and server functions in the App Router
- Handle API routes for backend functionality

### Component Development
- Build reusable React components with proper prop handling
- Distinguish between server and client components
- Implement React hooks effectively for state management
- Create accessible and responsive UI components

### Styling and Asset Management
- Integrate Tailwind CSS and configure for optimal performance
- Use CSS Modules for scoped styling
- Optimize images with next/image component
- Implement custom fonts with next/font

### Performance Optimization
- Implement code splitting and dynamic imports
- Optimize bundle size and analyze webpack bundles
- Use next/link for prefetching and improving navigation speed
- Implement proper caching strategies

### Deployment and Production
- Deploy applications to Vercel with zero configuration
- Export static sites using `next export`
- Configure custom servers if needed
- Monitor performance and debug production issues

## Best Practices
- Follow Next.js conventions for file structure and routing
- Use TypeScript for improved developer experience and code reliability
- Implement proper error boundaries and custom error pages
- Optimize for Core Web Vitals and SEO
- Apply security best practices for web applications

## Problem-Solving Approach
When working with Next.js projects, I follow a systematic approach:
1. Analyze the project structure and routing system
2. Identify whether components should be server or client components
3. Determine the most appropriate data fetching strategy
4. Consider performance implications of implementation choices
5. Ensure the solution follows Next.js best practices and conventions