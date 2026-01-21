import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ArrowUp,
  ArrowDown,
  BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { MarketTiming } from "@shared/schema";

interface MarketTimingCardProps {
  data: MarketTiming;
  language: "en" | "hi";
}

const translations = {
  en: {
    title: "Market Timing Advisor",
    sellNow: "Sell Now",
    wait: "Wait",
    currentPrice: "Current Price",
    perQuintal: "per quintal",
    change: "Change",
    vs7days: "vs 7 days ago",
    regionalAvg: "Regional Average",
    recommendation: "Recommendation",
    priceHistory: "7-Day Price History",
    expectedDirection: "Expected",
    up: "Prices Rising",
    down: "Prices Falling",
    stable: "Prices Stable",
  },
  hi: {
    title: "बाजार समय सलाहकार",
    sellNow: "अभी बेचें",
    wait: "प्रतीक्षा करें",
    currentPrice: "वर्तमान मूल्य",
    perQuintal: "प्रति क्विंटल",
    change: "बदलाव",
    vs7days: "7 दिन पहले से",
    regionalAvg: "क्षेत्रीय औसत",
    recommendation: "सिफारिश",
    priceHistory: "7 दिन मूल्य इतिहास",
    expectedDirection: "अपेक्षित",
    up: "कीमतें बढ़ रही हैं",
    down: "कीमतें गिर रही हैं",
    stable: "कीमतें स्थिर",
  },
};

export function MarketTimingCard({ data, language }: MarketTimingCardProps) {
  const t = translations[language];
  const isSellNow = data.action === "SELL_NOW";
  const isPositive = data.priceChange >= 0;

  const directionConfig = {
    UP: { icon: TrendingUp, text: t.up, color: "text-green-600 dark:text-green-400" },
    DOWN: { icon: TrendingDown, text: t.down, color: "text-red-600 dark:text-red-400" },
    STABLE: { icon: Minus, text: t.stable, color: "text-muted-foreground" },
  };

  const direction = directionConfig[data.expectedDirection];
  const DirectionIcon = direction.icon;

  return (
    <Card className="border-amber-500/20 bg-amber-500/5" data-testid="card-market-timing">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            {t.title}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">{data.crop}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary Action */}
        <div className={`p-4 rounded-md text-center ${isSellNow ? "bg-green-500 text-white" : "bg-amber-500/10 border border-amber-500/30"}`}>
          {isSellNow ? (
            <>
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <div className="font-bold text-lg">{t.sellNow}</div>
            </>
          ) : (
            <>
              <Minus className="h-8 w-8 mx-auto mb-2 text-amber-500" />
              <div className="font-bold text-lg text-amber-600 dark:text-amber-400">
                {t.wait}
              </div>
            </>
          )}
        </div>

        {/* Price Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">{t.currentPrice}</div>
            <div className="text-2xl font-bold">₹{data.currentPrice.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{t.perQuintal}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t.change}</div>
            <div className={`text-xl font-bold flex items-center gap-1 ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              {Math.abs(data.priceChangePercent).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">{t.vs7days}</div>
          </div>
        </div>

        {/* Price Chart */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">{t.priceHistory}</div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.priceHistory}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip 
                  formatter={(value: number) => [`₹${value}`, 'Price']}
                  labelFormatter={(label) => label}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={isPositive ? "#22c55e" : "#ef4444"} 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expected Direction */}
        <div className="flex items-center justify-between p-3 rounded-md bg-background/50">
          <span className="text-sm text-muted-foreground">{t.expectedDirection}</span>
          <div className={`flex items-center gap-1 text-sm font-medium ${direction.color}`}>
            <DirectionIcon className="h-4 w-4" />
            {direction.text}
          </div>
        </div>

        {/* Regional Average */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t.regionalAvg}</span>
          <span className="font-medium">₹{data.regionalAverage.toLocaleString()}</span>
        </div>

        {/* Recommendation */}
        <div className="p-3 rounded-md bg-background/50 text-sm">
          <span className="font-medium">{t.recommendation}:</span>{" "}
          <span className="text-muted-foreground">{data.recommendation}</span>
        </div>
      </CardContent>
    </Card>
  );
}
