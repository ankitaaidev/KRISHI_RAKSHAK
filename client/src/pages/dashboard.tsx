import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";

import { RiskAssessmentCard } from "@/components/dashboard/risk-assessment-card";
import { IrrigationCard } from "@/components/dashboard/irrigation-card";
import { MarketTimingCard } from "@/components/dashboard/market-timing";
import { SchemeEligibilityCard } from "@/components/dashboard/scheme-eligibility";
import { YieldOutlookCard } from "@/components/dashboard/yield-outlook";
import { RegionalMapCard } from "@/components/dashboard/regional-map";


import { ChatBot } from "@/components/chatbot";

import type { DashboardData } from "@shared/schema";

import {
  Leaf,
  Bell,
  User,
  Menu,
  Home,
  LayoutDashboard,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const translations = {
  en: {
    title: "Dashboard",
    welcome: "Welcome back, Farmer",
    lastUpdated: "Last updated",
    farmSelector: "My Farm - Punjab",
    notifications: "Notifications",
    profile: "Profile",
    settings: "Settings",
    help: "Help",
    logout: "Log Out",
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      map: "Regional Map",
      settings: "Settings",
    },
    loading: "Loading dashboard data...",
    error: "Failed to load dashboard data",
  },
  hi: {
    title: "डैशबोर्ड",
    welcome: "वापसी पर स्वागत है, किसान",
    lastUpdated: "अंतिम अपडेट",
    farmSelector: "मेरा फार्म - पंजाब",
    notifications: "सूचनाएं",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    help: "मदद",
    logout: "लॉग आउट",
    nav: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      map: "क्षेत्रीय मैप",
      settings: "सेटिंग्स",
    },
    loading: "डैशबोर्ड डेटा लोड हो रहा है...",
    error: "डैशबोर्ड डेटा लोड करने में विफल",
  },
};

export default function DashboardPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <nav className="p-4 space-y-2">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Home className="h-4 w-4" />
                      {t.nav.home}
                    </Button>
                  </Link>
                  <Button variant="secondary" className="w-full justify-start gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    {t.nav.dashboard}
                  </Button>
                  <Link href="/map" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <MapPin className="h-4 w-4" />
                      {t.nav.map}
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-lg hidden sm:block">
                KrishiRakshak
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    {t.settings}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <Skeleton className="h-64" />
        ) : error ? (
          <Card className="p-6 text-center text-destructive">{t.error}</Card>
        ) : data ? (
          <div className="space-y-6">
            <RiskAssessmentCard data={data.farmRisk} language={language} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IrrigationCard data={data.irrigation} language={language} />
              <MarketTimingCard data={data.market} language={language} />
              <YieldOutlookCard data={data.yieldOutlook} language={language} />
            </div>
            <SchemeEligibilityCard schemes={data.schemes} language={language} />
            <RegionalMapCard language={language} />
          </div>
        ) : null}
      </main>

      <ChatBot language={language} dashboardData={data} />
    </div>
  );
}
