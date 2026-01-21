import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { FarmRisk } from "@shared/schema";

interface RiskAssessmentCardProps {
  data: FarmRisk;
  language: "en" | "hi";
}

const translations = {
  en: {
    title: "Farm Risk Assessment",
    overallRisk: "Overall Risk",
    riskFactors: "Risk Factors",
    viewDetails: "View Details",
    hideDetails: "Hide Details",
    lastUpdated: "Last updated",
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",
    impactLabels: {
      LOW: "Low Impact",
      MEDIUM: "Medium Impact",
      HIGH: "High Impact",
    },
  },
  hi: {
    title: "फार्म जोखिम मूल्यांकन",
    overallRisk: "समग्र जोखिम",
    riskFactors: "जोखिम कारक",
    viewDetails: "विवरण देखें",
    hideDetails: "विवरण छुपाएं",
    lastUpdated: "अंतिम अपडेट",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    impactLabels: {
      LOW: "कम प्रभाव",
      MEDIUM: "मध्यम प्रभाव",
      HIGH: "उच्च प्रभाव",
    },
  },
};

const riskConfig = {
  LOW: {
    icon: ShieldCheck,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    progressColor: "bg-green-500",
  },
  MEDIUM: {
    icon: Shield,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    progressColor: "bg-amber-500",
  },
  HIGH: {
    icon: ShieldAlert,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    progressColor: "bg-red-500",
  },
};

const severityConfig = {
  LOW: {
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
  },
  MEDIUM: {
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
  },
  HIGH: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
  },
};

export function RiskAssessmentCard({ data, language }: RiskAssessmentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const t = translations[language];
  const config = riskConfig[data.overallRisk];
  const RiskIcon = config.icon;

  const riskLabel = t[data.overallRisk.toLowerCase() as "low" | "medium" | "high"];

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border`} data-testid="card-risk-assessment">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <RiskIcon className={`h-5 w-5 ${config.color}`} />
            {t.title}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {t.lastUpdated}: {new Date(data.lastUpdated).toLocaleTimeString(language === "en" ? "en-IN" : "hi-IN")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Risk Score */}
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-full ${config.bgColor} border-4 ${config.borderColor} flex items-center justify-center`}>
              <div className="text-center">
                <div className={`text-2xl font-bold ${config.color}`}>{data.riskScore}</div>
                <div className="text-xs text-muted-foreground">/100</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">{t.overallRisk}</div>
              <div className={`text-3xl font-bold ${config.color}`}>{riskLabel}</div>
              <Progress 
                value={data.riskScore} 
                className="h-2 mt-2 w-32" 
              />
            </div>
          </div>

          {/* Key Factors Summary */}
          <div className="space-y-2">
            <div className="text-sm font-medium">{t.riskFactors}</div>
            {data.factors.slice(0, expanded ? undefined : 3).map((factor, i) => {
              const sevConfig = severityConfig[factor.severity];
              const SevIcon = sevConfig.icon;
              return (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <SevIcon className={`h-4 w-4 mt-0.5 ${sevConfig.color}`} />
                  <div>
                    <span className="font-medium">{factor.name}:</span>{" "}
                    <span className="text-muted-foreground">{factor.impact}</span>
                  </div>
                </div>
              );
            })}
            {data.factors.length > 3 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 gap-1"
                onClick={() => setExpanded(!expanded)}
                data-testid="button-toggle-risk-details"
              >
                {expanded ? (
                  <>
                    {t.hideDetails}
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    {t.viewDetails}
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
