import type {
  FarmRisk,
  IrrigationGuidance,
  MarketTiming,
  YieldOutlook,
  Scheme,
  StateData,
  WeatherForecast,
  DashboardData
} from "../shared/schema.js";
import { randomUUID } from "crypto";

export interface IStorage {
  getDashboardData(): Promise<DashboardData>;
  getFarmRisk(): Promise<FarmRisk>;
  getIrrigationGuidance(): Promise<IrrigationGuidance>;
  getMarketTiming(): Promise<MarketTiming>;
  getYieldOutlook(): Promise<YieldOutlook>;
  getSchemes(): Promise<Scheme[]>;
  getStates(): Promise<StateData[]>;
  getWeatherForecast(): Promise<WeatherForecast[]>;
}

export class MemStorage implements IStorage {
  private weatherForecast: WeatherForecast[] = [
    { date: "Today", temperature: 32, humidity: 65, precipitation: 0, condition: "Sunny", icon: "sunny" },
    { date: "Tomorrow", temperature: 30, humidity: 70, precipitation: 20, condition: "Partly Cloudy", icon: "partly-cloudy" },
    { date: "Wed", temperature: 28, humidity: 75, precipitation: 60, condition: "Rain Expected", icon: "rain" },
    { date: "Thu", temperature: 27, humidity: 80, precipitation: 80, condition: "Heavy Rain", icon: "rain" },
    { date: "Fri", temperature: 29, humidity: 70, precipitation: 30, condition: "Cloudy", icon: "cloudy" },
    { date: "Sat", temperature: 31, humidity: 65, precipitation: 10, condition: "Partly Cloudy", icon: "partly-cloudy" },
    { date: "Sun", temperature: 33, humidity: 60, precipitation: 5, condition: "Sunny", icon: "sunny" },
  ];

  private farmRisk: FarmRisk = {
    overallRisk: "LOW",
    riskScore: 25,
    factors: [
      { name: "Weather Conditions", impact: "Favorable temperatures and expected rainfall", severity: "LOW" },
      { name: "Soil Health", impact: "Good moisture levels, optimal pH", severity: "LOW" },
      { name: "Pest Pressure", impact: "Minimal pest activity detected", severity: "LOW" },
      { name: "Market Volatility", impact: "Stable prices with slight upward trend", severity: "MEDIUM" },
      { name: "Water Availability", impact: "Adequate groundwater levels", severity: "LOW" },
    ],
    lastUpdated: new Date().toISOString(),
  };

  private irrigationGuidance: IrrigationGuidance = {
    action: "DELAY",
    delayHours: 48,
    soilMoisture: 68,
    nextRainExpected: "Wednesday",
    rainProbability: 75,
    recommendation: "Rain expected in 2 days. Delay irrigation to conserve water and reduce costs. Current soil moisture is adequate for crop needs.",
    weatherForecast: this.weatherForecast,
  };

  private marketTiming: MarketTiming = {
    action: "WAIT",
    currentPrice: 2450,
    expectedDirection: "UP",
    priceChange: 150,
    priceChangePercent: 6.5,
    regionalAverage: 2380,
    recommendation: "Prices are trending upward. Hold your crop for 1-2 weeks for better returns. Expected peak in mid-January.",
    priceHistory: [
      { date: "Dec 9", price: 2300 },
      { date: "Dec 10", price: 2320 },
      { date: "Dec 11", price: 2350 },
      { date: "Dec 12", price: 2380 },
      { date: "Dec 13", price: 2410 },
      { date: "Dec 14", price: 2430 },
      { date: "Dec 15", price: 2450 },
    ],
    crop: "Wheat",
  };

  private yieldOutlook: YieldOutlook = {
    outlook: "NORMAL",
    confidence: 78,
    factors: [
      { name: "Adequate Rainfall", impact: "POSITIVE", description: "Expected rainfall matches crop requirements" },
      { name: "Soil Nutrients", impact: "POSITIVE", description: "Nitrogen and phosphorus levels are optimal" },
      { name: "Temperature Stress", impact: "NEUTRAL", description: "Temperatures within normal range" },
      { name: "Pest Risk", impact: "NEGATIVE", description: "Slight aphid pressure observed" },
    ],
    historicalComparison: {
      lastYear: 42,
      fiveYearAvg: 40,
      predicted: 41,
    },
  };

  private schemes: Scheme[] = [
    {
      id: "pm-kisan",
      name: "PM-KISAN",
      nameHindi: "पीएम-किसान",
      description: "Direct income support of ₹6,000 per year to farmer families",
      descriptionHindi: "किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता",
      benefitAmount: "₹6,000/year",
      eligibility: [
        "Small and marginal farmer families",
        "Landholding up to 2 hectares",
        "Valid Aadhaar card",
        "Active bank account",
      ],
      documents: ["Aadhaar Card", "Land Records", "Bank Passbook", "Passport Photo"],
      deadline: "Rolling enrollment",
      status: "ELIGIBLE",
      applyUrl: "https://pmkisan.gov.in",
      category: "Income Support",
    },
    {
      id: "pmfby",
      name: "PM Fasal Bima Yojana",
      nameHindi: "पीएम फसल बीमा योजना",
      description: "Crop insurance scheme with minimal premium for farmers",
      descriptionHindi: "किसानों के लिए न्यूनतम प्रीमियम पर फसल बीमा योजना",
      benefitAmount: "Up to ₹2,00,000",
      eligibility: [
        "All farmers growing notified crops",
        "Loanee and non-loanee farmers",
        "Share-croppers and tenant farmers",
      ],
      documents: ["Land Records", "Sowing Certificate", "Bank Account Details", "Aadhaar Card"],
      deadline: "Before sowing season",
      status: "ELIGIBLE",
      applyUrl: "https://pmfby.gov.in",
      category: "Insurance",
    },
    {
      id: "kcc",
      name: "Kisan Credit Card",
      nameHindi: "किसान क्रेडिट कार्ड",
      description: "Credit facility for farmers at subsidized interest rates",
      descriptionHindi: "किसानों को रियायती ब्याज दरों पर ऋण सुविधा",
      benefitAmount: "Up to ₹3,00,000",
      eligibility: [
        "All farmers - individual/joint",
        "Tenant farmers",
        "Oral lessees",
        "Share croppers",
      ],
      documents: ["Identity Proof", "Address Proof", "Land Documents", "Passport Photos"],
      status: "APPLIED",
      applyUrl: "https://www.nabard.org",
      category: "Credit",
    },
    {
      id: "smam",
      name: "Sub-Mission on Agricultural Mechanization",
      nameHindi: "कृषि मशीनीकरण पर उप-मिशन",
      description: "Subsidy on purchase of agricultural machinery",
      descriptionHindi: "कृषि मशीनरी की खरीद पर सब्सिडी",
      benefitAmount: "40-50% subsidy",
      eligibility: [
        "Individual farmers",
        "Farmer Producer Organizations",
        "Self Help Groups",
        "Cooperatives",
      ],
      documents: ["Land Records", "Quotation from Dealer", "Bank Account", "Aadhaar Card"],
      deadline: "March 31, 2025",
      status: "ELIGIBLE",
      applyUrl: "https://agrimachinery.nic.in",
      category: "Subsidy",
    },
    {
      id: "pkvy",
      name: "Paramparagat Krishi Vikas Yojana",
      nameHindi: "परंपरागत कृषि विकास योजना",
      description: "Support for organic farming practices",
      descriptionHindi: "जैविक खेती प्रथाओं के लिए सहायता",
      benefitAmount: "₹50,000/hectare",
      eligibility: [
        "Farmers willing to adopt organic farming",
        "Minimum 20 farmers per cluster",
        "Contiguous land area of 20 hectares",
      ],
      documents: ["Land Records", "Group Formation Certificate", "Aadhaar Card"],
      status: "RECEIVED",
      category: "Organic Farming",
    },
  ];

  private states: StateData[] = [
    {
      id: "punjab",
      name: "Punjab",
      nameHindi: "पंजाब",
      soilTypes: ["Alluvial", "Loamy"],
      majorCrops: ["Wheat", "Rice", "Cotton", "Maize"],
      currentSeason: "Rabi",
      harvestPeriod: "April-May",
      averageRainfall: 649,
      coordinates: { lat: 31.1471, lng: 75.3412 },
    },
    {
      id: "haryana",
      name: "Haryana",
      nameHindi: "हरियाणा",
      soilTypes: ["Alluvial", "Sandy Loam"],
      majorCrops: ["Wheat", "Rice", "Sugarcane", "Cotton"],
      currentSeason: "Rabi",
      harvestPeriod: "April-May",
      averageRainfall: 573,
      coordinates: { lat: 29.0588, lng: 76.0856 },
    },
    {
      id: "uttar-pradesh",
      name: "Uttar Pradesh",
      nameHindi: "उत्तर प्रदेश",
      soilTypes: ["Alluvial", "Black", "Sandy"],
      majorCrops: ["Wheat", "Rice", "Sugarcane", "Potato"],
      currentSeason: "Rabi",
      harvestPeriod: "March-May",
      averageRainfall: 990,
      coordinates: { lat: 26.8467, lng: 80.9462 },
    },
    {
      id: "maharashtra",
      name: "Maharashtra",
      nameHindi: "महाराष्ट्र",
      soilTypes: ["Black", "Red", "Laterite"],
      majorCrops: ["Cotton", "Sugarcane", "Soybean", "Jowar"],
      currentSeason: "Rabi",
      harvestPeriod: "February-April",
      averageRainfall: 1139,
      coordinates: { lat: 19.7515, lng: 75.7139 },
    },
    {
      id: "gujarat",
      name: "Gujarat",
      nameHindi: "गुजरात",
      soilTypes: ["Black", "Alluvial", "Sandy"],
      majorCrops: ["Cotton", "Groundnut", "Wheat", "Cumin"],
      currentSeason: "Rabi",
      harvestPeriod: "March-April",
      averageRainfall: 820,
      coordinates: { lat: 22.2587, lng: 71.1924 },
    },
    {
      id: "rajasthan",
      name: "Rajasthan",
      nameHindi: "राजस्थान",
      soilTypes: ["Sandy", "Alluvial", "Saline"],
      majorCrops: ["Wheat", "Bajra", "Mustard", "Pulses"],
      currentSeason: "Rabi",
      harvestPeriod: "March-April",
      averageRainfall: 313,
      coordinates: { lat: 27.0238, lng: 74.2179 },
    },
    {
      id: "madhya-pradesh",
      name: "Madhya Pradesh",
      nameHindi: "मध्य प्रदेश",
      soilTypes: ["Black", "Alluvial", "Red"],
      majorCrops: ["Soybean", "Wheat", "Gram", "Rice"],
      currentSeason: "Rabi",
      harvestPeriod: "March-April",
      averageRainfall: 1160,
      coordinates: { lat: 22.9734, lng: 78.6569 },
    },
    {
      id: "karnataka",
      name: "Karnataka",
      nameHindi: "कर्नाटक",
      soilTypes: ["Red", "Black", "Laterite"],
      majorCrops: ["Rice", "Ragi", "Jowar", "Cotton"],
      currentSeason: "Rabi",
      harvestPeriod: "January-March",
      averageRainfall: 1248,
      coordinates: { lat: 15.3173, lng: 75.7139 },
    },
    {
      id: "tamil-nadu",
      name: "Tamil Nadu",
      nameHindi: "तमिलनाडु",
      soilTypes: ["Red", "Black", "Alluvial"],
      majorCrops: ["Rice", "Sugarcane", "Cotton", "Groundnut"],
      currentSeason: "Rabi",
      harvestPeriod: "January-March",
      averageRainfall: 998,
      coordinates: { lat: 11.1271, lng: 78.6569 },
    },
    {
      id: "andhra-pradesh",
      name: "Andhra Pradesh",
      nameHindi: "आंध्र प्रदेश",
      soilTypes: ["Red", "Black", "Alluvial"],
      majorCrops: ["Rice", "Groundnut", "Cotton", "Chilli"],
      currentSeason: "Rabi",
      harvestPeriod: "January-March",
      averageRainfall: 912,
      coordinates: { lat: 15.9129, lng: 79.74 },
    },
    {
      id: "west-bengal",
      name: "West Bengal",
      nameHindi: "पश्चिम बंगाल",
      soilTypes: ["Alluvial", "Red", "Laterite"],
      majorCrops: ["Rice", "Jute", "Potato", "Wheat"],
      currentSeason: "Rabi",
      harvestPeriod: "March-April",
      averageRainfall: 1750,
      coordinates: { lat: 22.9868, lng: 87.855 },
    },
    {
      id: "bihar",
      name: "Bihar",
      nameHindi: "बिहार",
      soilTypes: ["Alluvial", "Sandy Loam"],
      majorCrops: ["Rice", "Wheat", "Maize", "Sugarcane"],
      currentSeason: "Rabi",
      harvestPeriod: "March-April",
      averageRainfall: 1176,
      coordinates: { lat: 25.0961, lng: 85.3131 },
    },
  ];

  async getDashboardData(): Promise<DashboardData> {
    return {
      farmRisk: this.farmRisk,
      irrigation: this.irrigationGuidance,
      market: this.marketTiming,
      yieldOutlook: this.yieldOutlook,
      schemes: this.schemes,
      weather: this.weatherForecast,
    };
  }

  async getFarmRisk(): Promise<FarmRisk> {
    return this.farmRisk;
  }

  async getIrrigationGuidance(): Promise<IrrigationGuidance> {
    return this.irrigationGuidance;
  }

  async getMarketTiming(): Promise<MarketTiming> {
    return this.marketTiming;
  }

  async getYieldOutlook(): Promise<YieldOutlook> {
    return this.yieldOutlook;
  }

  async getSchemes(): Promise<Scheme[]> {
    return this.schemes;
  }

  async getStates(): Promise<StateData[]> {
    return this.states;
  }

  async getWeatherForecast(): Promise<WeatherForecast[]> {
    return this.weatherForecast;
  }
}

export const storage = new MemStorage();
