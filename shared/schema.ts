import { z } from "zod";

/* =========================
   ENUMS
========================= */

// Risk Level
export const RiskLevelEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
export type RiskLevel = z.infer<typeof RiskLevelEnum>;

// Yield Outlook LEVEL (FIXED NAME)
export const YieldOutlookLevelEnum = z.enum(["LOW", "NORMAL", "HIGH"]);
export type YieldOutlookLevel = z.infer<typeof YieldOutlookLevelEnum>;

// Irrigation Action
export const IrrigationActionEnum = z.enum(["IRRIGATE_NOW", "DELAY"]);
export type IrrigationAction = z.infer<typeof IrrigationActionEnum>;

// Market Action
export const MarketActionEnum = z.enum(["SELL_NOW", "WAIT"]);
export type MarketAction = z.infer<typeof MarketActionEnum>;

/* =========================
   WEATHER
========================= */

export const weatherForecastSchema = z.object({
  date: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  precipitation: z.number(),
  condition: z.string(),
  icon: z.string(),
});
export type WeatherForecast = z.infer<typeof weatherForecastSchema>;

/* =========================
   FARM RISK
========================= */

export const farmRiskSchema = z.object({
  overallRisk: RiskLevelEnum,
  riskScore: z.number().min(0).max(100),
  factors: z.array(
    z.object({
      name: z.string(),
      impact: z.string(),
      severity: RiskLevelEnum,
    }),
  ),
  lastUpdated: z.string(),
});
export type FarmRisk = z.infer<typeof farmRiskSchema>;

/* =========================
   IRRIGATION
========================= */

export const irrigationGuidanceSchema = z.object({
  action: IrrigationActionEnum,
  delayHours: z.number().optional(),
  soilMoisture: z.number().min(0).max(100),
  nextRainExpected: z.string().optional(),
  rainProbability: z.number().min(0).max(100),
  recommendation: z.string(),
  weatherForecast: z.array(weatherForecastSchema),
});
export type IrrigationGuidance = z.infer<typeof irrigationGuidanceSchema>;

/* =========================
   MARKET
========================= */

export const marketPriceSchema = z.object({
  date: z.string(),
  price: z.number(),
  volume: z.number().optional(),
});
export type MarketPrice = z.infer<typeof marketPriceSchema>;

export const marketTimingSchema = z.object({
  action: MarketActionEnum,
  currentPrice: z.number(),
  expectedDirection: z.enum(["UP", "DOWN", "STABLE"]),
  priceChange: z.number(),
  priceChangePercent: z.number(),
  regionalAverage: z.number(),
  recommendation: z.string(),
  priceHistory: z.array(marketPriceSchema),
  crop: z.string(),
});
export type MarketTiming = z.infer<typeof marketTimingSchema>;

/* =========================
   GOVERNMENT SCHEMES
========================= */

export const schemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  nameHindi: z.string(),
  description: z.string(),
  descriptionHindi: z.string(),
  benefitAmount: z.string(),
  eligibility: z.array(z.string()),
  documents: z.array(z.string()),
  deadline: z.string().optional(),
  status: z.enum(["ELIGIBLE", "APPLIED", "RECEIVED", "NOT_ELIGIBLE"]),
  applyUrl: z.string().optional(),
  category: z.string(),
});
export type Scheme = z.infer<typeof schemeSchema>;

/* =========================
   REGIONAL DATA
========================= */

export const stateDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  nameHindi: z.string(),
  soilTypes: z.array(z.string()),
  majorCrops: z.array(z.string()),
  currentSeason: z.string(),
  harvestPeriod: z.string(),
  averageRainfall: z.number(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});
export type StateData = z.infer<typeof stateDataSchema>;

/* =========================
   YIELD OUTLOOK (FINAL)
========================= */

export const yieldOutlookSchema = z.object({
  outlook: YieldOutlookLevelEnum,
  confidence: z.number().min(0).max(100),
  factors: z.array(
    z.object({
      name: z.string(),
      impact: z.enum(["POSITIVE", "NEGATIVE", "NEUTRAL"]),
      description: z.string(),
    }),
  ),
  historicalComparison: z.object({
    lastYear: z.number(),
    fiveYearAvg: z.number(),
    predicted: z.number(),
  }),
});
export type YieldOutlook = z.infer<typeof yieldOutlookSchema>;

/* =========================
   CHAT
========================= */

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.string(),
  language: z.enum(["en", "hi"]).optional(),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatRequestSchema = z.object({
  message: z.string(),
  language: z.enum(["en", "hi"]).default("en"),
  context: z
    .object({
      farmRisk: farmRiskSchema.optional(),
      irrigation: irrigationGuidanceSchema.optional(),
      market: marketTimingSchema.optional(),
    })
    .optional(),
});
export type ChatRequest = z.infer<typeof chatRequestSchema>;

/* =========================
   DASHBOARD
========================= */

export const dashboardDataSchema = z.object({
  farmRisk: farmRiskSchema,
  irrigation: irrigationGuidanceSchema,
  market: marketTimingSchema,
  yieldOutlook: yieldOutlookSchema,
  schemes: z.array(schemeSchema),
  weather: z.array(weatherForecastSchema),
});
export type DashboardData = z.infer<typeof dashboardDataSchema>;

/* =========================
   USER
========================= */

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & { id: string };
