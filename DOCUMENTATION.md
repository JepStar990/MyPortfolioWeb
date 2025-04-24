# Zwiswa Muridili's Data Engineer Portfolio Website Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Data Models](#data-models)
5. [Backend Implementation](#backend-implementation)
6. [Frontend Implementation](#frontend-implementation)
   - [Components](#components)
   - [Pages](#pages)
   - [Hooks](#hooks)
   - [Libraries](#libraries)
7. [Animations](#animations)
8. [Theme System](#theme-system)
9. [Responsive Design](#responsive-design)
10. [API Endpoints](#api-endpoints)
11. [Storage Implementation](#storage-implementation)
12. [Installation and Setup](#installation-and-setup)
13. [Deployment](#deployment)
14. [Future Enhancements](#future-enhancements)

## Overview

This application is a responsive portfolio website for Zwiswa Muridili, a data engineer, designed to showcase his projects, skills, and professional experience. The website features a modern design with smooth animations, responsive layouts, and a dark/light theme toggle. It is built as a single-page application (SPA) with dynamic content loading from a backend API.

## Architecture

The application follows a client-server architecture with clear separation of concerns:

- **Frontend**: React-based SPA with TypeScript for type safety
- **Backend**: Express.js server with RESTful API endpoints
- **Storage**: In-memory storage implementation (MemStorage)
- **Shared**: Common type definitions and schemas used across frontend and backend

The project structure is organized as follows:

```
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── layout
│   │   │   ├── sections
│   │   │   └── ui
│   │   ├── hooks
│   │   ├── lib
│   │   ├── pages
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── index.html
├── server
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
└── shared
    └── schema.ts
```

## Technology Stack

### Frontend
- **React**: UI library for building component-based interfaces
- **TypeScript**: Strongly typed JavaScript for better developer experience
- **TanStack Query (React Query)**: For server state management and API requests
- **Wouter**: Lightweight routing library
- **Framer Motion**: Animation library for smooth transitions and effects
- **Lucide React**: Icon library for UI elements
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Reusable UI component library built on Radix UI primitives

### Backend
- **Express.js**: Web framework for Node.js
- **Drizzle ORM**: ORM for database interactions
- **Zod**: Schema validation library

## Data Models

The data models are defined in `shared/schema.ts` and use Drizzle ORM with Zod for validation:

### User Model
```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
```

### Project Model
```typescript
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  categories: text("categories").array().notNull(), // e.g. ["data-engineering", "visualization"]
  technologies: text("technologies").array().notNull(), // e.g. ["Python", "React", "AWS"]
  featured: boolean("featured").default(false),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  content: text("content").notNull(), // Markdown content
  createdAt: timestamp("created_at").defaultNow()
});
```

### Skill Model
```typescript
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // e.g. "data-engineering", "visualization", "cloud"
  percentage: integer("percentage").notNull(), // 0-100 indicating proficiency
  createdAt: timestamp("created_at").defaultNow()
});
```

### Message Model
```typescript
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
```

## Backend Implementation

### Server Setup (`server/index.ts`)
- Express.js server setup with middleware configurations
- API route registration
- Error handling middleware
- Server startup on port 5000

### API Routes (`server/routes.ts`)
- Implements RESTful endpoints for projects, skills, and contact forms
- Uses storage interface for data operations
- Input validation with Zod schemas
- Consistent response formats with proper HTTP status codes

## Frontend Implementation

### Components

#### Layout Components

1. **Header (`components/layout/Header.tsx`)**
   - Responsive navigation bar with mobile menu toggle
   - Theme toggle button integration
   - Smooth scroll to section functionality
   - Transparent to solid background transition on scroll

2. **Footer (`components/layout/Footer.tsx`)**
   - Copyright information
   - Social media links
   - Quick navigation links

#### Section Components

1. **Hero (`components/sections/Hero.tsx`)**
   - Animated introduction with typing effect
   - Call-to-action buttons
   - Background animation elements

2. **About (`components/sections/About.tsx`)**
   - Professional summary
   - Key highlights and achievements
   - Animated statistics counters

3. **Skills (`components/sections/Skills.tsx`)**
   - Animated skill bars with percentages
   - Categorized skills (Data Engineering, Visualization, Cloud)
   - Technology icons with hover effects

4. **Projects (`components/sections/Projects.tsx`)**
   - Filterable project grid
   - Category filter buttons
   - Project cards with animations

5. **DataViz (`components/sections/DataViz.tsx`)**
   - Interactive chart demonstrations
   - Chart type selector (Bar, Pie, Line, Scatter)
   - Animated data insights panel

6. **Contact (`components/sections/Contact.tsx`)**
   - Contact form with validation
   - Form submission with API integration
   - Animated success/error feedback
   - Contact information panel

#### UI Components

1. **ProjectCard (`components/ui/ProjectCard.tsx`)**
   - Image with overlay effect
   - Project details and technologies
   - Links to GitHub and live demo
   - Category badges

2. **SkillBar (`components/ui/SkillBar.tsx`)**
   - Animated progress bar
   - Percentage indicator
   - Color customization based on category

3. **ThemeToggle (`components/ui/ThemeToggle.tsx`)**
   - Light/dark mode toggle
   - Theme persistence with localStorage
   - Animated icon transition

4. **BackToTop (`components/ui/BackToTop.tsx`)**
   - Scroll-to-top button
   - Appears after scrolling threshold
   - Smooth scroll animation

### Pages

1. **Home (`pages/Home.tsx`)**
   - Container for all section components
   - Sections rendered in sequence

2. **ProjectDetails (`pages/ProjectDetails.tsx`)**
   - Dynamic route with project ID parameter
   - Fetches project details from API
   - Renders detailed project information
   - Related projects section

3. **NotFound (`pages/not-found.tsx`)**
   - 404 error page
   - Animated illustration
   - Return to home button

### Hooks

1. **useIntersectionObserver (`hooks/use-intersection-observer.tsx`)**
   - Custom hook for detecting element visibility
   - Triggers animations when elements enter viewport
   - Configurable threshold and root margin
   - Optional one-time trigger functionality

2. **useTheme (`hooks/use-theme.tsx`)**
   - Theme management with context API
   - Toggles between light and dark modes
   - Persists theme preference in localStorage
   - Syncs with OS theme preference

3. **useIsMobile (`hooks/use-mobile.tsx`)**
   - Detects mobile viewport
   - Window resize listener
   - Breakpoint configuration

4. **useToast (`hooks/use-toast.ts`)**
   - Toast notification system
   - Multiple toast types (success, error, info)
   - Customizable duration and positioning

### Libraries

1. **queryClient (`lib/queryClient.ts`)**
   - TanStack Query configuration
   - API request utilities
   - Error handling and response transformation

2. **animations (`lib/animations.ts`)**
   - Reusable animation variants for Framer Motion
   - Fade, slide, and scale animations
   - Stagger effects for sequential animations

3. **types (`lib/types.ts`)**
   - Common type definitions used across components
   - Project and skill category types
   - Chart type definitions

4. **utils (`lib/utils.ts`)**
   - Utility functions
   - Class name merging with clsx/tailwind-merge

## Animations

The portfolio website uses Framer Motion for rich animations that enhance the user experience:

1. **Entrance Animations**
   - Components fade in and slide up when entering the viewport
   - Staggered animations for list items
   - Controlled timing with intersection observer

2. **Interactive Animations**
   - Hover effects on buttons and cards
   - Click animations on interactive elements
   - Smooth transitions between states

3. **Data Visualization Animations**
   - Chart data animations with sequential revealing
   - Smooth transitions between chart types
   - Progress bar animations for skill levels and statistics

4. **Page Transitions**
   - Page entrance and exit animations
   - Content reveal animations

## Theme System

The website implements a dark/light theme system with the following features:

1. **Theme Toggle**
   - User-controllable theme switching
   - Animated icon transition between sun and moon

2. **Theme Persistence**
   - Theme preference stored in localStorage
   - Retrieved on application startup

3. **System Preference Detection**
   - Detects OS/browser theme preference
   - Uses system preference as initial theme if no stored preference exists

4. **Tailwind Dark Mode**
   - Utilizes Tailwind's dark mode with class strategy
   - All components styled for both light and dark themes

## Responsive Design

The website is fully responsive across all device sizes:

1. **Mobile-First Approach**
   - Base styles optimized for mobile
   - Progressive enhancement for larger screens

2. **Responsive Layouts**
   - Flex and grid layouts for adaptive content organization
   - Column count adjustments based on screen width
   - Proper spacing and text sizing across devices

3. **Mobile Navigation**
   - Collapsible mobile menu
   - Touch-friendly interaction targets
   - Smooth transitions for menu open/close

4. **Media Queries**
   - Tailwind breakpoints (sm, md, lg, xl, 2xl)
   - Custom media queries for specific components

## API Endpoints

### Projects Endpoints

1. **GET /api/projects**
   - Returns all projects
   - No parameters required
   - Response: Array of Project objects

2. **GET /api/projects/:id**
   - Returns a specific project by ID
   - Parameters: id (number) - Project ID
   - Response: Project object or 404 if not found

3. **POST /api/projects**
   - Creates a new project
   - Body: InsertProject object
   - Response: Created Project object

### Skills Endpoints

1. **GET /api/skills**
   - Returns all skills
   - Optional query parameter: category (string)
   - Response: Array of Skill objects

2. **POST /api/skills**
   - Creates a new skill
   - Body: InsertSkill object
   - Response: Created Skill object

### Contact Endpoint

1. **POST /api/contact**
   - Submits a contact message
   - Body: InsertMessage object
   - Response: Created Message object

## Storage Implementation

The application uses an in-memory storage implementation (`MemStorage`) that:

1. **Initializes Sample Data**
   - Creates realistic placeholder data for development and testing
   - Populates projects, skills, and user data

2. **Implements Storage Interface**
   - CRUD operations for all data models
   - Async interface compatible with future database implementations

3. **Unique ID Generation**
   - Auto-incrementing IDs for each data type
   - Data integrity maintenance

The storage implementation could be easily replaced with a database implementation in the future without changing the API interface.

## Installation and Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the application at `http://localhost:5000`

### Environment Variables
- `NODE_ENV`: Development or production mode
- `PORT`: Server port (default: 5000)

## Deployment

The application is configured for deployment with the following features:

1. **Build Process**
   - Frontend assets are built with Vite
   - TypeScript compilation for backend

2. **Static File Serving**
   - Express.js serves static files from the build directory

3. **API Routing**
   - All API routes are prefixed with `/api`
   - Frontend routes are handled by client-side routing

## Future Enhancements

1. **Database Integration**
   - Replace in-memory storage with PostgreSQL database
   - Implement database migrations

2. **Authentication System**
   - Admin login for content management
   - Secure API endpoints

3. **Content Management System**
   - Admin dashboard for content updates
   - Project and skill management interface

4. **Enhanced Visualizations**
   - Interactive data visualizations with real datasets
   - Downloadable reports and case studies

5. **Blog Section**
   - Technical blog with article management
   - Code snippet highlighting and sharing

6. **Performance Optimizations**
   - Implement code splitting and lazy loading
   - Add service worker for offline capabilities
