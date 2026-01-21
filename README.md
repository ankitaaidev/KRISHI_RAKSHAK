# 🌾 KrishiRakshak – AI Assistant for Farmers

KrishiRakshak is a **smart agriculture decision-intelligence platform** designed to support **Indian farmers** with timely, simple, and actionable guidance.  
It acts as a **personal agronomist, market advisor, and scheme navigator**, helping farmers make better decisions using data and AI.

The platform converts complex agricultural data into **easy-to-understand recommendations** for daily farming needs and works in **English and Hindi**.

---

## 🔍 Problem Statement

Millions of farmers in India struggle with:
- Fragmented agricultural information
- Lack of timely weather and risk alerts
- Unclear irrigation planning
- Poor market timing decisions
- Difficulty understanding government schemes

Most solutions are either too technical or scattered across multiple platforms.

**KrishiRakshak solves this by providing a single, intelligent, farmer-friendly assistant accessible via smartphone.**

---

## 🚀 Key Features

- 🌦 **Farm Risk Assessment**  
  Identifies risks like drought, heavy rainfall, or crop stress with severity levels.

- 💧 **Smart Irrigation Guidance**  
  Suggests when and how much to irrigate based on weather and crop data.

- 📈 **Market Timing Advisor**  
  Shows price trends and helps farmers decide the best time to sell.

- 🌾 **Yield Outlook Prediction**  
  Estimates expected crop yield to support planning and storage.

- 🏛 **Government Scheme Navigator**  
  Explains scheme eligibility and benefits in simple language.

- 🤖 **Kisan e-Mitra (AI Chatbot)**  
  An AI-powered assistant that answers farming queries in **English & Hindi**.

---

## 🧠 System Architecture

### Frontend
- React 18 + TypeScript
- Wouter (lightweight routing)
- TanStack React Query
- Tailwind CSS + shadcn/ui
- Recharts for data visualization
- Vite for fast development

### Backend
- Node.js + Express
- TypeScript (ES Modules)
- REST APIs under `/api`
- OpenAI API for chatbot intelligence
- Graceful fallback when AI is unavailable

### Data Layer
- PostgreSQL database
- Drizzle ORM
- Zod-based schema validation
- Shared schema between frontend & backend

---

## 🧩 Key Design Patterns

- **Shared Types**  
  Common schemas stored in `shared/` and used across the entire system.

- **Bilingual Support**  
  English and Hindi text handled via translation objects.

- **Mobile-First Design**  
  Optimized for smartphones with responsive layouts.

- **Theme System**  
  Light & Dark mode using CSS custom properties.

---

## 🛠 Tech Stack

| Component | Technology |
|---------|-----------|
| Frontend | React + TypeScript |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| AI | OpenAI API |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Build Tool | Vite |

---

## 🤖 AI Integration

- Uses **OpenAI API** for contextual farming advice
- Environment variable:
  ```bash

🗄 Database Configuration
-PostgreSQL used for persistent storage

-Environment variable:

*DATABASE_URL*

-Drizzle ORM handles migrations and queries

📦 Installation & Setup
# Clone the repository
git clone https://github.com/your-username/krishirakshak.git

# Move into the project directory
cd krishirakshak

# Install dependencies
npm install

# Run the project in development mode
npm run dev


