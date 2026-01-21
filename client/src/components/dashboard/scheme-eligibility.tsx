import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronDown,
  ExternalLink,
  IndianRupee,
  Calendar,
  FileCheck
} from "lucide-react";
import { useState } from "react";
import type { Scheme } from "@shared/schema";

interface SchemeEligibilityCardProps {
  schemes: Scheme[];
  language: "en" | "hi";
}

const translations = {
  en: {
    title: "Scheme Eligibility",
    viewAll: "View All Schemes",
    eligible: "Eligible",
    applied: "Applied",
    received: "Received",
    notEligible: "Not Eligible",
    benefit: "Benefit",
    deadline: "Deadline",
    documents: "Required Documents",
    eligibility: "Eligibility Criteria",
    applyNow: "Apply Now",
    viewDetails: "View Details",
    noSchemes: "No schemes available",
  },
  hi: {
    title: "योजना पात्रता",
    viewAll: "सभी योजनाएं देखें",
    eligible: "पात्र",
    applied: "आवेदन किया",
    received: "प्राप्त",
    notEligible: "पात्र नहीं",
    benefit: "लाभ",
    deadline: "समय सीमा",
    documents: "आवश्यक दस्तावेज",
    eligibility: "पात्रता मानदंड",
    applyNow: "अभी आवेदन करें",
    viewDetails: "विवरण देखें",
    noSchemes: "कोई योजना उपलब्ध नहीं",
  },
};

const statusConfig = {
  ELIGIBLE: {
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  APPLIED: {
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  RECEIVED: {
    icon: CheckCircle,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  NOT_ELIGIBLE: {
    icon: XCircle,
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
    borderColor: "border-muted",
  },
};

export function SchemeEligibilityCard({ schemes, language }: SchemeEligibilityCardProps) {
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);
  const t = translations[language];

  const statusLabel = (status: keyof typeof statusConfig) => {
    const labels = {
      ELIGIBLE: t.eligible,
      APPLIED: t.applied,
      RECEIVED: t.received,
      NOT_ELIGIBLE: t.notEligible,
    };
    return labels[status];
  };

  return (
    <Card data-testid="card-scheme-eligibility">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            {t.title}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {schemes.filter(s => s.status === "ELIGIBLE").length} {t.eligible}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {schemes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {t.noSchemes}
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {schemes.map((scheme) => {
                const config = statusConfig[scheme.status];
                const StatusIcon = config.icon;
                const isExpanded = expandedScheme === scheme.id;

                return (
                  <Collapsible
                    key={scheme.id}
                    open={isExpanded}
                    onOpenChange={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                  >
                    <div className={`rounded-md border ${config.borderColor} ${config.bgColor} overflow-hidden`}>
                      <CollapsibleTrigger className="w-full">
                        <div className="p-4 flex items-start gap-4">
                          <StatusIcon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                          <div className="flex-1 text-left">
                            <div className="font-medium">
                              {language === "en" ? scheme.name : scheme.nameHindi}
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {language === "en" ? scheme.description : scheme.descriptionHindi}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              <div className="flex items-center gap-1 text-sm">
                                <IndianRupee className="h-3 w-3 text-primary" />
                                <span className="font-medium">{scheme.benefitAmount}</span>
                              </div>
                              {scheme.deadline && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {scheme.deadline}
                                </div>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {scheme.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${config.bgColor} ${config.color} border ${config.borderColor}`}>
                              {statusLabel(scheme.status)}
                            </Badge>
                            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="px-4 pb-4 pt-2 border-t border-border/50 space-y-4">
                          {/* Eligibility */}
                          <div>
                            <div className="text-sm font-medium mb-2">{t.eligibility}</div>
                            <ul className="space-y-1">
                              {scheme.eligibility.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle className="h-3 w-3 mt-1 text-green-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Documents */}
                          <div>
                            <div className="text-sm font-medium mb-2">{t.documents}</div>
                            <ul className="space-y-1">
                              {scheme.documents.map((doc, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <FileCheck className="h-3 w-3 mt-1" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Button */}
                          {scheme.status === "ELIGIBLE" && scheme.applyUrl && (
                            <Button className="w-full gap-2" data-testid={`button-apply-${scheme.id}`}>
                              {t.applyNow}
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
