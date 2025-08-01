# CultureAI - AI-Powered Cultural Discovery Platform

## Overview

CultureAI is a full-stack web application that discovers users' cultural preferences and provides personalized recommendations across music, food, travel, art, and lifestyle domains. The platform combines AI-powered insights with cultural intelligence to create unique "Cultural DNA" profiles and deliver tailored experiences.

The application features a React-based frontend with sophisticated UI components, an Express.js backend with RESTful APIs, and integrates with external services including OpenAI for cultural analysis and Qloo for cultural data enrichment. Users complete interactive questionnaires to build their cultural profiles, which are then analyzed to generate insights and personalized recommendations.

## Recent Changes

**January 1, 2025**: Successfully resolved persistent emoji rendering issue in questionnaire form by implementing a clean, minimal design with colored circles instead of emojis/icons. This ensures consistent display across all browsers and devices without compatibility issues.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **Styling**: Tailwind CSS with custom cultural color palette and shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive set of Radix UI primitives wrapped in custom components
- **Build System**: Vite with custom configuration for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful APIs with structured error handling and request logging middleware
- **Database Layer**: Drizzle ORM with PostgreSQL database schema
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Route Organization**: Modular route handlers for users, profiles, insights, and recommendations

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Relational model with users, cultural profiles, insights, recommendations, and questionnaire responses
- **Connection**: Neon Database serverless PostgreSQL with connection pooling
- **Migrations**: Drizzle-kit for database schema migrations and management

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Model**: Email-based user identification with UUID primary keys
- **Profile Association**: One-to-one relationship between users and cultural profiles

## External Dependencies

### AI and Cultural Intelligence Services
- **OpenAI Integration**: GPT-4o model for cultural analysis and insight generation
- **Qloo API**: Cultural taste intelligence platform for data enrichment and recommendations
- **Hybrid Analysis**: Combines OpenAI's language understanding with Qloo's cultural data

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with built-in connection pooling
- **Replit Integration**: Development environment plugins for cartographer and runtime error handling
- **Environment Configuration**: Secure API key management for external services

### UI and Development Tools
- **Radix UI**: Comprehensive primitive component library for accessible UI elements
- **Lucide React**: Icon library for consistent visual elements
- **React Hook Form**: Form state management with Zod schema validation
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Type-safe CSS class composition utility