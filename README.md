# 🌾 KrishiRakshak – Smart Agriculture Decision Platform

KrishiRakshak is a **smart agriculture decision-intelligence platform** designed to support **Indian farmers** with timely, simple, and actionable guidance.  
It acts as a **personal agronomist, market advisor, and government scheme navigator**, helping farmers make better decisions using data and AI.

The platform converts complex agricultural data into **easy-to-understand recommendations** for daily farming needs and works in **English and Hindi**.

---

## 🌍 Overview

Indian farmers often face challenges like unpredictable weather, water scarcity, crop risks, fluctuating market prices, and lack of awareness about government schemes.

**KrishiRakshak brings all critical agricultural intelligence into one unified platform**, making farming decisions simpler, smarter, and more profitable.

---

## 🔍 Problem Statement

Millions of farmers in India struggle with:
- Fragmented agricultural information
- Lack of timely weather and farm risk alerts
- Inefficient irrigation planning
- Poor market timing decisions
- Difficulty understanding government schemes

Most existing solutions are either **too technical**, **not localized**, or **spread across multiple platforms**.

**KrishiRakshak solves this by providing a single, intelligent, farmer-friendly assistant accessible via smartphone.**

---

## 🚀 Key Features

- 🌦 **Farm Risk Assessment**  
  Identifies risks such as drought, heavy rainfall, or crop stress with severity levels (Low / Medium / High).

- 💧 **Smart Irrigation Guidance**  
  Recommends optimal irrigation timing and water usage based on crop and weather data.

- 📈 **Market Timing Advisor**  
  Analyzes price trends and suggests the best time to sell crops.

- 🌾 **Yield Outlook Prediction**  
  Predicts expected crop yield to support planning, storage, and income estimation.

- 🏛 **Government Scheme Navigator**  
  Explains relevant government schemes and eligibility in simple language.

- 🤖 **Kisan e-Mitra (AI Chatbot)**  
  AI-powered assistant that answers farming queries in **English & Hindi**.

---

## 🧠 System Architecture

### 🖥 Frontend Architecture
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight router)
- **State Management:** TanStack React Query
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Charts:** Recharts
- **Build Tool:** Vite

#### Frontend Routes
- `/` – Landing Page (Introduction & marketing)
- `/dashboard` – Main farmer dashboard
- `/map` – Regional and state-wise agricultural visualization

---

### ⚙ Backend Architecture
- **Runtime:** Node.js with Express
- **Language:** TypeScript (ES Modules)
- **API Pattern:** RESTful APIs under `/api`
- **AI Integration:** OpenAI API for chatbot intelligence
- **Fallback Handling:** Graceful responses when AI is unavailable

During development, the backend uses an **in-memory storage (`MemStorage`)** to simulate:
- Weather forecasts
- Farm risk assessments
- Irrigation guidance
- Market timing data
- Yield predictions
- Government schemes

---

### 🗄 Data Layer
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Validation:** Zod
- **Schema Location:** `shared/schema.ts`
- **Shared Types:** Same schema used by frontend and backend

---

## 📊 Schema Coverage

The schema defines types for:
- Weather forecasts
- Farm risk assessments with severity levels
- Irrigation guidance with action recommendations
- Market timing with price history
- Yield outlook predictions
- Government scheme eligibility
- State and regional agricultural data

---

## 🧩 Key Design Patterns

- **Shared Types**  
  Schema definitions stored in the `shared/` directory and reused across frontend and backend.

- **Bilingual Support**  
  Translation objects enable seamless English and Hindi support.

- **Mobile-First Design**  
  Optimized for smartphones with responsive layouts and mobile detection hooks.

- **Theme System**  
  Light and Dark mode using CSS custom properties.

---

## 🤖 AI Integration

- Uses **OpenAI API** to power the **Kisan e-Mitra** chatbot
- Provides contextual farming advice
- Environment variable required:
  ```bash
  OPENAI_API_KEY

🗄 Database Configuration

PostgreSQL is used for persistent storage
Environment variable:
DATABASE_URL
Drizzle ORM manages:
-Database schema
-Migrations
-Queries

📦 Installation & Setup

# Clone the repository
git clone https://github.com/ankitaaidev/KRISHI_RAKSHAK.git

# Navigate into the project directory
cd KRISHI_RAKSHAK

# Install dependencies
npm install

# Run the project in development mode
npm run dev

⚙ Environment Variables

Create a .env file in the root directory and add:
DATABASE_URL=your_postgresql_database_url
OPENAI_API_KEY=your_openai_api_key

🤝 Contributing

Contributions are welcome!
Feel free to open issues, suggest improvements, or submit pull requests.

📜 License

This project is licensed under the MIT License.

🌾 KrishiRakshak

Smart decisions. Better farming. Stronger future.
