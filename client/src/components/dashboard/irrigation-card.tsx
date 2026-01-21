import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

import {
  Droplets,
  CloudRain,
  Clock,
  Sun,
  Cloud,
  CloudSun,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IrrigationGuidance } from "@shared/schema";

interface IrrigationCardProps {
  data: IrrigationGuidance;
  language: "en" | "hi";
}

const translations = {
  en: {
    title: "Smart Irrigation",
    soilMoisture: "Soil Moisture",
    rainProbability: "Rain Probability",
    recommendation: "Recommendation",
    irrigateNow: "Irrigate Now",
    delayIrrigation: "Delay Irrigation",
    hours: "hours",
    weatherForecast: "48h Forecast",
  },
  hi: {
    title: "स्मार्ट सिंचाई",
    soilMoisture: "मिट्टी की नमी",
    rainProbability: "बारिश की संभावना",
    recommendation: "सिफारिश",
    irrigateNow: "अभी सिंचाई करें",
    delayIrrigation: "सिंचाई टालें",
    hours: "घंटे",
    weatherForecast: "48 घंटे पूर्वानुमान",
  },
};

const weatherIcons: Record<string, LucideIcon> = {
  sunny: Sun,
  cloudy: Cloud,
  "partly-cloudy": CloudSun,
  rain: CloudRain,
};

export function IrrigationCard({ data, language }: IrrigationCardProps) {
  const t = translations[language];
  const isIrrigateNow = data.action === "IRRIGATE_NOW";

  return (
    <Card className="border-blue-500/20 bg-blue-500/5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Droplets className="h-5 w-5 text-blue-500" />
          {t.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Action */}
        <div
          className={`p-4 rounded-md text-center ${
            isIrrigateNow
              ? "bg-blue-500 text-white"
              : "bg-amber-500/10 border border-amber-500/30"
          }`}
        >
          {isIrrigateNow ? (
            <>
              <Droplets className="h-8 w-8 mx-auto mb-2" />
              <div className="font-bold text-lg">{t.irrigateNow}</div>
            </>
          ) : (
            <>
              <Clock className="h-8 w-8 mx-auto mb-2 text-amber-500" />
              <div className="font-bold text-lg text-amber-600">
                {t.delayIrrigation}
              </div>

              {/* ✅ SAFE OPTIONAL HANDLING */}
              {data.delayHours !== undefined && (
                <div className="text-2xl font-bold text-amber-600">
                  {data.delayHours} {t.hours}
                </div>
              )}
            </>
          )}
        </div>

        {/* Metrics */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>{t.soilMoisture}</span>
            <span>{data.soilMoisture}%</span>
          </div>
          <Progress value={data.soilMoisture} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>{t.rainProbability}</span>
            <span>{data.rainProbability}%</span>
          </div>
          <Progress value={data.rainProbability} />
        </div>

        {/* Weather */}
        <div>
          <div className="text-sm mb-2">{t.weatherForecast}</div>
          <div className="flex gap-2 overflow-x-auto">
            {data.weatherForecast.slice(0, 4).map((forecast, i) => {
              const WeatherIcon = weatherIcons[forecast.icon] ?? Sun;

              return (
                <div
                  key={i}
                  className="text-center p-2 rounded-md bg-background/50 min-w-[60px]"
                >
                  <div className="text-xs">{forecast.date}</div>
                  <WeatherIcon className="h-5 w-5 mx-auto my-1" />
                  <div className="text-sm">{forecast.temperature}°</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendation */}
        <div className="p-3 rounded-md bg-background/50 text-sm">
          <strong>{t.recommendation}:</strong> {data.recommendation}
        </div>
      </CardContent>
    </Card>
  );
}
