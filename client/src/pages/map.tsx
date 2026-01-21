import { useState } from "react";
import { Link } from "wouter";
import { Button } from "client/src/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { RegionalMapCard } from "@/components/dashboard/regional-map";
import { 
  Leaf, 
  Home,
  LayoutDashboard,
  MapPin,
  Menu
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "client/src/components/ui/sheet";

const translations = {
  en: {
    title: "Regional Map",
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      map: "Regional Map",
    },
  },
  hi: {
    title: "क्षेत्रीय मैप",
    nav: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      map: "क्षेत्रीय मैप",
    },
  },
};

export default function MapPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

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
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-serif font-bold">KrishiRakshak</span>
                  </div>
                </div>
                <nav className="p-4 space-y-2">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Home className="h-4 w-4" />
                      {t.nav.home}
                    </Button>
                  </Link>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      {t.nav.dashboard}
                    </Button>
                  </Link>
                  <Button variant="secondary" className="w-full justify-start gap-2">
                    <MapPin className="h-4 w-4" />
                    {t.nav.map}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-lg hidden sm:block">KrishiRakshak</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  {t.nav.home}
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  {t.nav.dashboard}
                </Button>
              </Link>
              <Button variant="secondary" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                {t.nav.map}
              </Button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold">{t.title}</h1>
        </div>
        <RegionalMapCard language={language} />
      </main>
    </div>
  );
}
