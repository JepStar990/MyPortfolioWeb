# Zwiswa Muridili's Data Engineer Portfolio Website

## Overview
This application is a responsive portfolio website for Zwiswa Muridili, a data engineer, designed to showcase his projects, skills, and professional experience. The website features a modern design with smooth animations, responsive layouts, and a dark/light theme toggle. It is built as a single-page application (SPA) with dynamic content loading from a backend API.

## Table of Contents
1. [Architecture](#architecture)
2. [Technology Stack](#technology-stack)
3. [Data Models](#data-models)
4. [Backend Implementation](#backend-implementation)
5. [Frontend Implementation](#frontend-implementation)
   - [Components](#components)
   - [Pages](#pages)
   - [Hooks](#hooks)
   - [Libraries](#libraries)
6. [Animations](#animations)
7. [Theme System](#theme-system)
8. [Responsive Design](#responsive-design)
9. [API Endpoints](#api-endpoints)
10. [Storage Implementation](#storage-implementation)
11. [Installation and Setup](#installation-and-setup)
12. [Deployment](#deployment)
13. [Future Enhancements](#future-enhancements)

## Architecture
The application follows a client-server architecture with clear separation of concerns:
- **Frontend**: React-based SPA with TypeScript for type safety
- **Backend**: Express.js server with RESTful API endpoints
- **Storage**: In-memory storage implementation (MemStorage)

## Technology Stack

### Frontend
- **React**
- **TypeScript**
- **TanStack Query (React Query)**
- **Wouter**
- **Framer Motion**
- **Lucide React**
- **Tailwind CSS**
- **shadcn/ui**

### Backend
- **Express.js**
- **Drizzle ORM**
- **Zod**

## Data Models
Data models are defined in `shared/schema.ts` using Drizzle ORM with Zod for validation. Key models include:
- **User**
- **Project**
- **Skill**
- **Message**

## Backend Implementation
The backend is set up with Express.js, implementing RESTful endpoints for projects, skills, and contact forms with input validation using Zod schemas.

## Frontend Implementation

### Components
- **Layout Components**: Header and Footer
- **Section Components**: Hero, About, Skills, Projects, DataViz, Contact
- **UI Components**: ProjectCard, SkillBar, ThemeToggle, BackToTop

### Pages
- **Home**
- **ProjectDetails**
- **NotFound**

### Hooks
Custom hooks for managing state, theme, and animations.

### Libraries
Utilities for handling queries, animations, types, and custom functions.

## Animations
The portfolio uses Framer Motion for entrance, interactive, and data visualization animations.

## Theme System
Features a dark/light theme toggle with persistence in localStorage and detection of system preferences.

## Responsive Design
The website is fully responsive, optimized for all device sizes with a mobile-first approach.

## API Endpoints
Key endpoints include:
- **GET /api/projects**
- **GET /api/skills**
- **POST /api/contact**

## Storage Implementation
Uses an in-memory storage (`MemStorage`) for development and testing, with plans for future database integration.

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
Configured for deployment with a build process and static file serving via Express.js.

## Future Enhancements
- Database integration
- Authentication system
- Content management system
- Enhanced visualizations
- Blog section
- Performance optimizations
