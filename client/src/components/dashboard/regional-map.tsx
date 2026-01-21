import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MapPin, 
  Layers,
  Wheat,
  Cloud,
  Droplets
} from "lucide-react";
import type { StateData } from "@shared/schema";

interface RegionalMapCardProps {
  language: "en" | "hi";
}

const translations = {
  en: {
    title: "Regional Map View",
    selectState: "Select State",
    soilTypes: "Soil Types",
    majorCrops: "Major Crops",
    currentSeason: "Current Season",
    harvestPeriod: "Harvest Period",
    avgRainfall: "Average Rainfall",
    mm: "mm/year",
    filterBy: "Filter by",
    soilType: "Soil Type",
    crop: "Crop",
    season: "Season",
    allStates: "All States",
  },
  hi: {
    title: "क्षेत्रीय मैप दृश्य",
    selectState: "राज्य चुनें",
    soilTypes: "मिट्टी के प्रकार",
    majorCrops: "प्रमुख फसलें",
    currentSeason: "वर्तमान मौसम",
    harvestPeriod: "फसल अवधि",
    avgRainfall: "औसत वर्षा",
    mm: "मिमी/वर्ष",
    filterBy: "द्वारा फ़िल्टर करें",
    soilType: "मिट्टी का प्रकार",
    crop: "फसल",
    season: "मौसम",
    allStates: "सभी राज्य",
  },
};

const statePositions: Record<string, { top: string; left: string }> = {
  "jammu-kashmir": { top: "8%", left: "28%" },
  "himachal-pradesh": { top: "18%", left: "32%" },
  "punjab": { top: "22%", left: "26%" },
  "uttarakhand": { top: "24%", left: "38%" },
  "haryana": { top: "28%", left: "30%" },
  "delhi": { top: "30%", left: "34%" },
  "rajasthan": { top: "38%", left: "20%" },
  "uttar-pradesh": { top: "36%", left: "45%" },
  "bihar": { top: "38%", left: "58%" },
  "west-bengal": { top: "48%", left: "65%" },
  "jharkhand": { top: "45%", left: "58%" },
  "odisha": { top: "55%", left: "58%" },
  "chhattisgarh": { top: "50%", left: "48%" },
  "madhya-pradesh": { top: "42%", left: "38%" },
  "gujarat": { top: "48%", left: "18%" },
  "maharashtra": { top: "58%", left: "32%" },
  "karnataka": { top: "70%", left: "35%" },
  "andhra-pradesh": { top: "65%", left: "48%" },
  "telangana": { top: "60%", left: "45%" },
  "tamil-nadu": { top: "78%", left: "45%" },
  "kerala": { top: "82%", left: "38%" },
  "goa": { top: "68%", left: "28%" },
};

export function RegionalMapCard({ language }: RegionalMapCardProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [filter, setFilter] = useState<"soil" | "crop" | "season">("crop");
  const t = translations[language];

  const { data: states } = useQuery<StateData[]>({
    queryKey: ["/api/states"],
  });

  const selectedStateData = states?.find(s => s.id === selectedState);

  return (
    <Card data-testid="card-regional-map">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-primary" />
            {t.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t.filterBy}:</span>
            <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
              <SelectTrigger className="w-[120px]" data-testid="select-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soil">{t.soilType}</SelectItem>
                <SelectItem value="crop">{t.crop}</SelectItem>
                <SelectItem value="season">{t.season}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Visualization */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-b from-primary/5 to-primary/10 rounded-md aspect-[4/3] overflow-hidden">
              {/* Simple India Map Outline */}
              <svg 
                viewBox="0 0 400 450" 
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
              >
                <path
                  d="M160,20 L200,15 L240,25 L270,40 L280,60 L290,80 L285,100 L295,120 L300,140 L310,160 L320,180 L335,200 L350,230 L360,260 L355,290 L340,320 L320,350 L290,380 L260,400 L230,420 L200,430 L170,425 L140,410 L120,380 L100,350 L85,320 L75,290 L70,260 L75,230 L85,200 L100,170 L115,140 L130,110 L140,80 L150,50 L160,20 Z"
                  fill="hsl(var(--primary) / 0.15)"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
              </svg>
              
              {/* State Markers */}
              {states?.map((state) => {
                const pos = statePositions[state.id];
                if (!pos) return null;
                
                const isSelected = selectedState === state.id;
                
                return (
                  <button
                    key={state.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                      isSelected 
                        ? "z-10 scale-125" 
                        : "hover:scale-110"
                    }`}
                    style={{ top: pos.top, left: pos.left }}
                    onClick={() => setSelectedState(isSelected ? null : state.id)}
                    data-testid={`marker-${state.id}`}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
                      isSelected 
                        ? "bg-primary border-primary-foreground" 
                        : "bg-primary/60 border-primary hover:bg-primary"
                    }`} />
                    {isSelected && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-popover border border-border rounded text-xs whitespace-nowrap shadow-md">
                        {language === "en" ? state.name : state.nameHindi}
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-md p-3 text-xs space-y-2">
                <div className="font-medium">{t.filterBy}: {filter === "soil" ? t.soilType : filter === "crop" ? t.crop : t.season}</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>{language === "en" ? "State" : "राज्य"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* State Details Panel */}
          <div className="space-y-4">
            <Select value={selectedState || ""} onValueChange={setSelectedState}>
              <SelectTrigger data-testid="select-state">
                <SelectValue placeholder={t.selectState} />
              </SelectTrigger>
              <SelectContent>
                {states?.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {language === "en" ? state.name : state.nameHindi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedStateData ? (
              <ScrollArea className="h-[280px]">
                <div className="space-y-4 pr-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {language === "en" ? selectedStateData.name : selectedStateData.nameHindi}
                    </h3>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Layers className="h-4 w-4 text-amber-600" />
                      {t.soilTypes}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedStateData.soilTypes.map((soil, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {soil}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Wheat className="h-4 w-4 text-green-600" />
                      {t.majorCrops}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedStateData.majorCrops.map((crop, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Cloud className="h-3 w-3" />
                        {t.currentSeason}
                      </div>
                      <div className="font-medium">{selectedStateData.currentSeason}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{t.harvestPeriod}</div>
                      <div className="font-medium">{selectedStateData.harvestPeriod}</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <Droplets className="h-3 w-3" />
                      {t.avgRainfall}
                    </div>
                    <div className="font-medium">
                      {selectedStateData.averageRainfall} {t.mm}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-muted-foreground text-sm">
                {language === "en" 
                  ? "Select a state to view details" 
                  : "विवरण देखने के लिए राज्य चुनें"
                }
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
