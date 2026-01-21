KrishiRakshak - Smart Agriculture Decision Platform
Overview
KrishiRakshak is a digital decision-intelligence assistant designed for farmers in India. The platform converts complex agricultural data into simple, timely recommendations covering farm risk assessment, smart irrigation guidance, market timing advice, yield outlook predictions, and government scheme eligibility. The application supports bilingual operation (English and Hindi) and features an AI-powered chatbot assistant called "Kisan e-Mitra".

User Preferences
Preferred communication style: Simple, everyday language.

System Architecture
Frontend Architecture
Framework: React 18 with TypeScript
Routing: Wouter (lightweight React router)
State Management: TanStack React Query for server state
Styling: Tailwind CSS with custom design tokens
Component Library: shadcn/ui (Radix UI primitives with custom styling)
Charts: Recharts for data visualization
Build Tool: Vite
The frontend follows a page-based structure with three main routes:

Landing page (/) - Marketing and introduction
Dashboard (/dashboard) - Main farmer interface with all decision cards
Regional Map (/map) - Geographic data visualization
Backend Architecture
Runtime: Node.js with Express
Language: TypeScript (ES modules)
API Pattern: RESTful endpoints under /api prefix
AI Integration: OpenAI API for chatbot responses with fallback logic when API unavailable
The backend uses an in-memory storage pattern (MemStorage class) for mock data during development. This simulates realistic agricultural data including weather forecasts, farm risk assessments, irrigation guidance, market timing, yield outlook, and government schemes.

Data Layer
ORM: Drizzle ORM configured for PostgreSQL
Schema Location: shared/schema.ts using Zod for validation
Database: PostgreSQL (connection via DATABASE_URL environment variable)
The schema defines types for:

Weather forecasts
Farm risk assessments with severity levels
Irrigation guidance with action recommendations
Market timing with price history
Yield outlook predictions
Government scheme eligibility
State/regional agricultural data
Key Design Patterns
Shared Types: Schema definitions in shared/ directory used by both frontend and backend
Bilingual Support: Translation objects in components for English/Hindi
Responsive Design: Mobile-first with dedicated mobile detection hooks
Theme System: Light/dark mode via CSS custom properties
External Dependencies
AI Services
OpenAI API: Powers the Kisan e-Mitra chatbot for contextual farming advice
Environment variable: OPENAI_API_KEY
Graceful fallback responses when API unavailable
Database
PostgreSQL: Primary database for persistent storage
Environment variable: DATABASE_URL
Drizzle ORM for migrations and queries
Frontend Libraries
Radix UI: Accessible component primitives
Recharts: Chart visualizations for price history and data trends
Embla Carousel: Touch-friendly carousel components
date-fns: Date formatting utilities
Development Tools
Vite: Development server with HMR
esbuild: Production bundling for server
Drizzle Kit: Database migration tooling