import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { chatRequestSchema } from "../shared/schema.js";
import OpenAI from "openai";
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Fallback responses when OpenAI is not available
function getFallbackResponse(message: string, language: "en" | "hi", context?: any): string {
  const lowerMessage = message.toLowerCase();
  
  // Risk-related questions
  if (lowerMessage.includes("risk") || lowerMessage.includes("जोखिम")) {
    if (context?.farmRisk) {
      const risk = context.farmRisk;
      return language === "hi"
        ? `आपका वर्तमान फार्म जोखिम स्तर ${risk.overallRisk === "LOW" ? "कम" : risk.overallRisk === "MEDIUM" ? "मध्यम" : "उच्च"} है (स्कोर: ${risk.riskScore}/100)। मुख्य कारक: ${risk.factors.slice(0, 2).map((f: any) => f.name).join(", ")}।`
        : `Your current farm risk level is ${risk.overallRisk} (Score: ${risk.riskScore}/100). Key factors: ${risk.factors.slice(0, 2).map((f: any) => f.name).join(", ")}.`;
    }
    return language === "hi"
      ? "आपके फार्म का जोखिम मूल्यांकन डैशबोर्ड पर उपलब्ध है। कृपया मुख्य कार्ड देखें।"
      : "Your farm risk assessment is available on the dashboard. Please check the main risk card.";
  }

  // Irrigation-related questions
  if (lowerMessage.includes("irrigat") || lowerMessage.includes("water") || lowerMessage.includes("सिंचाई") || lowerMessage.includes("पानी")) {
    if (context?.irrigation) {
      const irr = context.irrigation;
      return language === "hi"
        ? irr.action === "IRRIGATE_NOW"
          ? `अभी सिंचाई करने की सिफारिश है। मिट्टी की नमी ${irr.soilMoisture}% है।`
          : `सिंचाई को ${irr.delayHours} घंटे के लिए टालें। बारिश की ${irr.rainProbability}% संभावना है। मिट्टी की नमी ${irr.soilMoisture}% है।`
        : irr.action === "IRRIGATE_NOW"
          ? `It's recommended to irrigate now. Soil moisture is at ${irr.soilMoisture}%.`
          : `Delay irrigation by ${irr.delayHours} hours. There's ${irr.rainProbability}% chance of rain. Soil moisture is ${irr.soilMoisture}%.`;
    }
    return language === "hi"
      ? "सिंचाई मार्गदर्शन के लिए डैशबोर्ड पर स्मार्ट सिंचाई कार्ड देखें।"
      : "For irrigation guidance, please check the Smart Irrigation card on your dashboard.";
  }

  // Market-related questions
  if (lowerMessage.includes("sell") || lowerMessage.includes("market") || lowerMessage.includes("price") || lowerMessage.includes("बेच") || lowerMessage.includes("बाजार") || lowerMessage.includes("कीमत")) {
    if (context?.market) {
      const mkt = context.market;
      return language === "hi"
        ? mkt.action === "SELL_NOW"
          ? `अभी बेचने का अच्छा समय है। वर्तमान मूल्य ₹${mkt.currentPrice} प्रति क्विंटल है।`
          : `अभी प्रतीक्षा करें। कीमतें ${mkt.expectedDirection === "UP" ? "बढ़" : mkt.expectedDirection === "DOWN" ? "गिर" : "स्थिर"} रही हैं। वर्तमान मूल्य ₹${mkt.currentPrice} है।`
        : mkt.action === "SELL_NOW"
          ? `It's a good time to sell now. Current price is ₹${mkt.currentPrice} per quintal.`
          : `Wait for now. Prices are trending ${mkt.expectedDirection.toLowerCase()}. Current price is ₹${mkt.currentPrice}.`;
    }
    return language === "hi"
      ? "बाजार समय सलाह के लिए डैशबोर्ड पर मार्केट टाइमिंग कार्ड देखें।"
      : "For market timing advice, please check the Market Timing card on your dashboard.";
  }

  // Scheme-related questions
  if (lowerMessage.includes("scheme") || lowerMessage.includes("yojana") || lowerMessage.includes("योजना") || lowerMessage.includes("subsidy") || lowerMessage.includes("सब्सिडी")) {
    return language === "hi"
      ? "आप कई सरकारी योजनाओं के लिए पात्र हो सकते हैं जैसे PM-KISAN (₹6,000/वर्ष), PM फसल बीमा योजना, और किसान क्रेडिट कार्ड। पूरी सूची के लिए डैशबोर्ड पर योजना पात्रता अनुभाग देखें।"
      : "You may be eligible for several government schemes like PM-KISAN (₹6,000/year), PM Fasal Bima Yojana, and Kisan Credit Card. Check the Scheme Eligibility section on your dashboard for the complete list.";
  }

  // Default response
  return language === "hi"
    ? "मैं किसान ई-मित्र हूं। मैं आपकी खेती संबंधी प्रश्नों में मदद कर सकता हूं - जोखिम मूल्यांकन, सिंचाई, बाजार समय, या सरकारी योजनाओं के बारे में पूछें।"
    : "I'm Kisan e-Mitra. I can help with your farming questions - ask me about risk assessment, irrigation, market timing, or government schemes.";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Dashboard data endpoint
  app.get("/api/dashboard", async (req, res) => {
    try {
      const data = await storage.getDashboardData();
      res.json(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });

  // Farm risk endpoint
  app.get("/api/farm-risk", async (req, res) => {
    try {
      const data = await storage.getFarmRisk();
      res.json(data);
    } catch (error) {
      console.error("Error fetching farm risk:", error);
      res.status(500).json({ error: "Failed to fetch farm risk data" });
    }
  });

  // Irrigation guidance endpoint
  app.get("/api/irrigation", async (req, res) => {
    try {
      const data = await storage.getIrrigationGuidance();
      res.json(data);
    } catch (error) {
      console.error("Error fetching irrigation guidance:", error);
      res.status(500).json({ error: "Failed to fetch irrigation guidance" });
    }
  });

  // Market timing endpoint
  app.get("/api/market", async (req, res) => {
    try {
      const data = await storage.getMarketTiming();
      res.json(data);
    } catch (error) {
      console.error("Error fetching market timing:", error);
      res.status(500).json({ error: "Failed to fetch market timing data" });
    }
  });

  // Yield outlook endpoint
  app.get("/api/yield", async (req, res) => {
    try {
      const data = await storage.getYieldOutlook();
      res.json(data);
    } catch (error) {
      console.error("Error fetching yield outlook:", error);
      res.status(500).json({ error: "Failed to fetch yield outlook" });
    }
  });

  // Schemes endpoint
  app.get("/api/schemes", async (req, res) => {
    try {
      const data = await storage.getSchemes();
      res.json(data);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      res.status(500).json({ error: "Failed to fetch schemes" });
    }
  });

  // States endpoint for regional map
  app.get("/api/states", async (req, res) => {
    try {
      const data = await storage.getStates();
      res.json(data);
    } catch (error) {
      console.error("Error fetching states:", error);
      res.status(500).json({ error: "Failed to fetch states data" });
    }
  });

  // Weather forecast endpoint
  app.get("/api/weather", async (req, res) => {
    try {
      const data = await storage.getWeatherForecast();
      res.json(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // AI Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const parsed = chatRequestSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const { message, language, context } = parsed.data;

      // If OpenAI is not available, provide intelligent fallback responses
      if (!openai) {
        const fallbackResponses = getFallbackResponse(message, language, context);
        return res.json({ response: fallbackResponses });
      }

      // Build context string for AI
      let contextString = "";
      if (context) {
        if (context.farmRisk) {
          contextString += `Current Farm Risk: ${context.farmRisk.overallRisk} (Score: ${context.farmRisk.riskScore}/100). `;
          contextString += `Factors: ${context.farmRisk.factors.map(f => `${f.name}: ${f.impact}`).join(", ")}. `;
        }
        if (context.irrigation) {
          contextString += `Irrigation: ${context.irrigation.action === "IRRIGATE_NOW" ? "Irrigate Now" : `Delay ${context.irrigation.delayHours} hours`}. `;
          contextString += `Soil Moisture: ${context.irrigation.soilMoisture}%, Rain Probability: ${context.irrigation.rainProbability}%. `;
        }
        if (context.market) {
          contextString += `Market: ${context.market.action === "SELL_NOW" ? "Sell Now" : "Wait"}. `;
          contextString += `Current Price: ₹${context.market.currentPrice}, Trend: ${context.market.expectedDirection}. `;
        }
      }

      const systemPrompt = language === "hi" 
        ? `आप किसान ई-मित्र हैं, एक मददगार AI कृषि सहायक। आप हिंदी में जवाब देते हैं। 
           आप किसानों को खेती की सलाह, मौसम की जानकारी, सिंचाई मार्गदर्शन, बाजार समय और सरकारी योजनाओं के बारे में मदद करते हैं।
           संक्षिप्त, व्यावहारिक उत्तर दें जो किसान आसानी से समझ सकें।
           ${contextString ? `वर्तमान फार्म स्थिति: ${contextString}` : ""}`
        : `You are Kisan e-Mitra, a helpful AI farming assistant. You respond in English.
           You help farmers with agricultural advice, weather information, irrigation guidance, market timing, and government schemes.
           Provide concise, practical answers that farmers can easily understand.
           ${contextString ? `Current farm status: ${contextString}` : ""}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_completion_tokens: 500,
      });

      const assistantResponse = response.choices[0].message.content || 
        (language === "hi" ? "क्षमा करें, मैं अभी जवाब नहीं दे पा रहा हूं।" : "Sorry, I couldn't generate a response.");

      res.json({ response: assistantResponse });
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      const errorMessage = req.body?.language === "hi" 
        ? "क्षमा करें, एक त्रुटि हुई। कृपया पुनः प्रयास करें।"
        : "Sorry, an error occurred. Please try again.";
      res.status(500).json({ error: errorMessage, response: errorMessage });
    }
  });

  return httpServer;
}

