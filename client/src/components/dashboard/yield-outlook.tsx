import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wheat, 
  TrendingUp, 
  TrendingDown,
  Minus,
  BarChart
} from "lucide-react";
import type { YieldOutlook } from "@shared/schema";

interface YieldOutlookCardProps {
  data: YieldOutlook;
  language: "en" | "hi";
}

const translations = {
  en: {
    title: "Yield Outlook",
    confidence: "Confidence",
    factors: "Contributing Factors",
    comparison: "Historical Comparison",
    lastYear: "Last Year",
    fiveYearAvg: "5-Year Avg",
    predicted: "Predicted",
    quintals: "quintals/hectare",
    low: "Low Yield Expected",
    normal: "Normal Yield Expected",
    high: "High Yield Expected",
    positive: "Positive",
    negative: "Negative",
    neutral: "Neutral",
  },
  hi: {
    title: "उपज दृष्टिकोण",
    confidence: "विश्वास",
    factors: "योगदान कारक",
    comparison: "ऐतिहासिक तुलना",
    lastYear: "पिछले साल",
    fiveYearAvg: "5 साल औसत",
    predicted: "अनुमानित",
    quintals: "क्विंटल/हेक्टेयर",
    low: "कम उपज अपेक्षित",
    normal: "सामान्य उपज अपेक्षित",
    high: "उच्च उपज अपेक्षित",
    positive: "सकारात्मक",
    negative: "नकारात्मक",
    neutral: "तटस्थ",
  },
};

const outlookConfig = {
  LOW: {
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: TrendingDown,
  },
  NORMAL: {
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: Minus,
  },
  HIGH: {
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: TrendingUp,
  },
};

const impactConfig = {
  POSITIVE: { color: "text-green-600 dark:text-green-400", icon: TrendingUp },
  NEGATIVE: { color: "text-red-600 dark:text-red-400", icon: TrendingDown },
  NEUTRAL: { color: "text-muted-foreground", icon: Minus },
};

export function YieldOutlookCard({ data, language }: YieldOutlookCardProps) {
  const t = translations[language];
  const config = outlookConfig[data.outlook];
  const OutlookIcon = config.icon;

  const outlookLabel = t[data.outlook.toLowerCase() as "low" | "normal" | "high"];

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border`} data-testid="card-yield-outlook">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wheat className="h-5 w-5 text-emerald-600" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary Indicator */}
        <div className={`p-4 rounded-md text-center ${config.bgColor} border ${config.borderColor}`}>
          <OutlookIcon className={`h-8 w-8 mx-auto mb-2 ${config.color}`} />
          <div className={`font-bold text-lg ${config.color}`}>{outlookLabel}</div>
        </div>

        {/* Confidence */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">{t.confidence}</span>
            <span className="font-medium">{data.confidence}%</span>
          </div>
          <Progress value={data.confidence} className="h-2" />
        </div>

        {/* Historical Comparison */}
        <div>
          <div className="text-sm font-medium mb-2">{t.comparison}</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-md bg-background/50">
              <div className="text-xs text-muted-foreground">{t.lastYear}</div>
              <div className="font-bold">{data.historicalComparison.lastYear}</div>
              <div className="text-[10px] text-muted-foreground">{t.quintals}</div>
            </div>
            <div className="p-2 rounded-md bg-background/50">
              <div className="text-xs text-muted-foreground">{t.fiveYearAvg}</div>
              <div className="font-bold">{data.historicalComparison.fiveYearAvg}</div>
              <div className="text-[10px] text-muted-foreground">{t.quintals}</div>
            </div>
            <div className={`p-2 rounded-md ${config.bgColor} border ${config.borderColor}`}>
              <div className="text-xs text-muted-foreground">{t.predicted}</div>
              <div className={`font-bold ${config.color}`}>{data.historicalComparison.predicted}</div>
              <div className="text-[10px] text-muted-foreground">{t.quintals}</div>
            </div>
          </div>
        </div>

        {/* Factors */}
        <div>
          <div className="text-sm font-medium mb-2">{t.factors}</div>
          <div className="space-y-2">
            {data.factors.slice(0, 3).map((factor, i) => {
              const factorConfig = impactConfig[factor.impact];
              const ImpactIcon = factorConfig.icon;
              return (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <ImpactIcon className={`h-4 w-4 mt-0.5 ${factorConfig.color}`} />
                  <div>
                    <span className="font-medium">{factor.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
