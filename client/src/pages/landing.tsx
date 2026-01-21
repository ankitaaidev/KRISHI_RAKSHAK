import { useState } from "react";
import { Link } from "wouter";
import { Button } from "client/src/components/ui/button";
import { Card, CardContent } from "client/src/components/ui/card";
import { Badge } from "client/src/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { 
  Shield, 
  Droplets, 
  TrendingUp, 
  FileText, 
  Map, 
  MessageCircle,
  Wheat,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  Leaf,
  Sun,
  CloudRain,
  BarChart3
} from "lucide-react";
import heroImage from "@assets/generated_images/indian_farmer_using_tech.png";

const translations = {
  en: {
    nav: {
      features: "Features",
      howItWorks: "How It Works",
      testimonials: "Testimonials",
      dashboard: "Go to Dashboard",
    },
    hero: {
      badge: "Trusted by 50,000+ Farmers",
      title: "Smart Farming Decisions,",
      titleHighlight: "Simplified",
      subtitle: "KrishiRakshak converts complex agricultural data into simple, timely recommendations. Get weather-aware irrigation guidance, market timing advice, and government scheme information—all in one dashboard.",
      cta: "Start Free Trial",
      ctaSecondary: "Watch Demo",
      stats: ["15+ States", "50,000+ Farmers", "24/7 Support"],
    },
    features: {
      title: "Everything You Need for",
      titleHighlight: "Smart Farming",
      subtitle: "Our platform combines weather, water, market, soil, and scheme information to guide your farming decisions.",
      items: [
        {
          icon: "Shield",
          title: "Farm Risk Assessment",
          description: "Get an overall LOW/MEDIUM/HIGH risk score with clear explanations of factors affecting your crops.",
        },
        {
          icon: "Droplets",
          title: "Smart Irrigation",
          description: "Know exactly when to irrigate based on weather forecasts, soil moisture, and rain predictions.",
        },
        {
          icon: "TrendingUp",
          title: "Market Timing Advisor",
          description: "Receive 'Sell Now' or 'Wait' recommendations with expected price directions for better profits.",
        },
        {
          icon: "FileText",
          title: "Scheme Eligibility",
          description: "Discover applicable government schemes with benefit summaries and step-by-step application guides.",
        },
        {
          icon: "Map",
          title: "Regional Insights",
          description: "View state-wise soil types, common crops, and seasonal harvest context on an interactive map.",
        },
        {
          icon: "MessageCircle",
          title: "AI Chatbot Assistant",
          description: "Get answers to your farming questions in English or Hindi with our Kisan e-Mitra assistant.",
        },
      ],
    },
    howItWorks: {
      title: "How KrishiRakshak",
      titleHighlight: "Works",
      steps: [
        {
          number: "01",
          title: "Connect Your Farm",
          description: "Enter your location, crop type, and farm size to get personalized recommendations.",
        },
        {
          number: "02",
          title: "Get Daily Insights",
          description: "Receive real-time risk assessments, irrigation guidance, and market updates.",
        },
        {
          number: "03",
          title: "Take Action",
          description: "Follow simple recommendations to optimize irrigation, timing, and scheme applications.",
        },
        {
          number: "04",
          title: "Maximize Returns",
          description: "Make data-driven decisions that improve yield and profitability season after season.",
        },
      ],
    },
    testimonials: {
      title: "Trusted by Farmers",
      titleHighlight: "Across India",
      items: [
        {
          quote: "KrishiRakshak helped me save 30% water by timing irrigation perfectly. The weather predictions are very accurate.",
          name: "Rajesh Kumar",
          location: "Punjab",
          crop: "Wheat",
          rating: 5,
        },
        {
          quote: "I never knew about PM-KISAN until the app showed me I was eligible. Got ₹6000 benefit easily.",
          name: "Lakshmi Devi",
          location: "Maharashtra",
          crop: "Cotton",
          rating: 5,
        },
        {
          quote: "Market timing advice helped me sell rice at peak prices. Made ₹15,000 more than last year.",
          name: "Suresh Patel",
          location: "Gujarat",
          crop: "Rice",
          rating: 5,
        },
        {
          quote: "The Hindi chatbot explains everything simply. Even my father can use it easily.",
          name: "Amit Singh",
          location: "Uttar Pradesh",
          crop: "Sugarcane",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "Ready to Transform Your",
      titleHighlight: "Farming?",
      subtitle: "Join thousands of farmers making smarter decisions with KrishiRakshak.",
      button: "Get Started Free",
      secondary: "Talk to Sales",
    },
    footer: {
      tagline: "Smart farming decisions, simplified.",
      links: {
        features: "Features",
        pricing: "Pricing",
        about: "About Us",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      copyright: "© 2024 KrishiRakshak. All rights reserved.",
    },
  },
  hi: {
    nav: {
      features: "विशेषताएं",
      howItWorks: "कैसे काम करता है",
      testimonials: "प्रशंसापत्र",
      dashboard: "डैशबोर्ड पर जाएं",
    },
    hero: {
      badge: "50,000+ किसानों द्वारा विश्वसनीय",
      title: "स्मार्ट खेती के फैसले,",
      titleHighlight: "सरल",
      subtitle: "कृषिरक्षक जटिल कृषि डेटा को सरल, समय पर सिफारिशों में बदलता है। मौसम-जागरूक सिंचाई मार्गदर्शन, बाजार समय सलाह और सरकारी योजना जानकारी—सब एक डैशबोर्ड में।",
      cta: "मुफ्त शुरू करें",
      ctaSecondary: "डेमो देखें",
      stats: ["15+ राज्य", "50,000+ किसान", "24/7 सहायता"],
    },
    features: {
      title: "स्मार्ट खेती के लिए",
      titleHighlight: "सब कुछ",
      subtitle: "हमारा प्लेटफॉर्म मौसम, पानी, बाजार, मिट्टी और योजना जानकारी को जोड़कर आपके खेती के फैसलों में मदद करता है।",
      items: [
        {
          icon: "Shield",
          title: "फार्म जोखिम मूल्यांकन",
          description: "अपनी फसलों को प्रभावित करने वाले कारकों की स्पष्ट व्याख्या के साथ कम/मध्यम/उच्च जोखिम स्कोर प्राप्त करें।",
        },
        {
          icon: "Droplets",
          title: "स्मार्ट सिंचाई",
          description: "मौसम पूर्वानुमान, मिट्टी की नमी और बारिश की भविष्यवाणी के आधार पर जानें कि कब सिंचाई करनी है।",
        },
        {
          icon: "TrendingUp",
          title: "बाजार समय सलाहकार",
          description: "बेहतर मुनाफे के लिए अपेक्षित मूल्य दिशाओं के साथ 'अभी बेचें' या 'प्रतीक्षा करें' सिफारिशें प्राप्त करें।",
        },
        {
          icon: "FileText",
          title: "योजना पात्रता",
          description: "लाभ सारांश और चरण-दर-चरण आवेदन गाइड के साथ लागू सरकारी योजनाएं खोजें।",
        },
        {
          icon: "Map",
          title: "क्षेत्रीय अंतर्दृष्टि",
          description: "इंटरैक्टिव मैप पर राज्य-वार मिट्टी के प्रकार, आम फसलें और मौसमी फसल संदर्भ देखें।",
        },
        {
          icon: "MessageCircle",
          title: "AI चैटबॉट सहायक",
          description: "हमारे किसान ई-मित्र सहायक के साथ अंग्रेजी या हिंदी में अपने खेती के सवालों के जवाब पाएं।",
        },
      ],
    },
    howItWorks: {
      title: "कृषिरक्षक कैसे",
      titleHighlight: "काम करता है",
      steps: [
        {
          number: "01",
          title: "अपना फार्म कनेक्ट करें",
          description: "व्यक्तिगत सिफारिशें प्राप्त करने के लिए अपना स्थान, फसल प्रकार और फार्म का आकार दर्ज करें।",
        },
        {
          number: "02",
          title: "दैनिक अंतर्दृष्टि प्राप्त करें",
          description: "रीयल-टाइम जोखिम मूल्यांकन, सिंचाई मार्गदर्शन और बाजार अपडेट प्राप्त करें।",
        },
        {
          number: "03",
          title: "कार्रवाई करें",
          description: "सिंचाई, समय और योजना आवेदनों को अनुकूलित करने के लिए सरल सिफारिशों का पालन करें।",
        },
        {
          number: "04",
          title: "रिटर्न अधिकतम करें",
          description: "डेटा-संचालित निर्णय लें जो हर मौसम उपज और लाभप्रदता में सुधार करते हैं।",
        },
      ],
    },
    testimonials: {
      title: "भारत भर के किसानों द्वारा",
      titleHighlight: "विश्वसनीय",
      items: [
        {
          quote: "कृषिरक्षक ने सिंचाई का सही समय बताकर मुझे 30% पानी बचाने में मदद की। मौसम की भविष्यवाणी बहुत सटीक है।",
          name: "राजेश कुमार",
          location: "पंजाब",
          crop: "गेहूं",
          rating: 5,
        },
        {
          quote: "मुझे PM-KISAN के बारे में तब तक नहीं पता था जब तक ऐप ने नहीं बताया कि मैं पात्र हूं। आसानी से ₹6000 का लाभ मिला।",
          name: "लक्ष्मी देवी",
          location: "महाराष्ट्र",
          crop: "कपास",
          rating: 5,
        },
        {
          quote: "बाजार समय सलाह ने मुझे चावल को चरम कीमतों पर बेचने में मदद की। पिछले साल से ₹15,000 ज्यादा कमाए।",
          name: "सुरेश पटेल",
          location: "गुजरात",
          crop: "चावल",
          rating: 5,
        },
        {
          quote: "हिंदी चैटबॉट सब कुछ सरलता से समझाता है। मेरे पिताजी भी इसे आसानी से उपयोग कर सकते हैं।",
          name: "अमित सिंह",
          location: "उत्तर प्रदेश",
          crop: "गन्ना",
          rating: 5,
        },
      ],
    },
    cta: {
      title: "अपनी खेती को बदलने के लिए",
      titleHighlight: "तैयार हैं?",
      subtitle: "कृषिरक्षक के साथ स्मार्ट निर्णय लेने वाले हजारों किसानों से जुड़ें।",
      button: "मुफ्त शुरू करें",
      secondary: "बिक्री से बात करें",
    },
    footer: {
      tagline: "स्मार्ट खेती के फैसले, सरल।",
      links: {
        features: "विशेषताएं",
        pricing: "मूल्य निर्धारण",
        about: "हमारे बारे में",
        contact: "संपर्क",
        privacy: "गोपनीयता नीति",
        terms: "सेवा की शर्तें",
      },
      copyright: "© 2024 कृषिरक्षक। सर्वाधिकार सुरक्षित।",
    },
  },
};

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Droplets,
  TrendingUp,
  FileText,
  Map,
  MessageCircle,
};

export default function LandingPage() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-xl">KrishiRakshak</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">
                {t.nav.features}
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-how-it-works">
                {t.nav.howItWorks}
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-testimonials">
                {t.nav.testimonials}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
              <ThemeToggle />
              <Link href="/dashboard">
                <Button data-testid="button-dashboard">
                  {t.nav.dashboard}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Indian farmer using technology in field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-6 bg-primary/20 text-primary-foreground border-primary/30">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {t.hero.badge}
            </Badge>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.hero.title}
              <span className="text-primary"> {t.hero.titleHighlight}</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                  {t.hero.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20" data-testid="button-hero-demo">
                {t.hero.ctaSecondary}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6">
              {t.hero.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-white font-medium">{stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              {t.features.title} <span className="text-primary">{t.features.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              return (
                <Card key={i} className="group hover-elevate transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              {t.howItWorks.title} <span className="text-primary">{t.howItWorks.titleHighlight}</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.number}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {i < t.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent transform translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
                {language === "en" ? "Your Complete" : "आपका पूरा"}{" "}
                <span className="text-primary">{language === "en" ? "Farm Dashboard" : "फार्म डैशबोर्ड"}</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                {language === "en" 
                  ? "All the information you need to make smart farming decisions, presented in a simple, actionable format."
                  : "स्मार्ट खेती के फैसले लेने के लिए आपको जो सभी जानकारी चाहिए, एक सरल, कार्रवाई योग्य प्रारूप में प्रस्तुत की गई है।"
                }
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Shield, text: language === "en" ? "Real-time risk monitoring" : "रीयल-टाइम जोखिम निगरानी" },
                  { icon: Droplets, text: language === "en" ? "Smart irrigation alerts" : "स्मार्ट सिंचाई अलर्ट" },
                  { icon: BarChart3, text: language === "en" ? "Market price tracking" : "बाजार मूल्य ट्रैकिंग" },
                  { icon: Wheat, text: language === "en" ? "Yield predictions" : "उपज भविष्यवाणी" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-4 bg-card">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">{language === "en" ? "Risk Level" : "जोखिम स्तर"}</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">LOW</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-500/5 border-blue-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">{language === "en" ? "Irrigation" : "सिंचाई"}</span>
                      </div>
                      <div className="text-lg font-bold text-blue-600">{language === "en" ? "Delay 24h" : "24 घंटे बाद"}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-500/5 border-amber-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-amber-500" />
                        <span className="text-xs text-muted-foreground">{language === "en" ? "Market" : "बाजार"}</span>
                      </div>
                      <div className="text-lg font-bold text-amber-600">{language === "en" ? "Wait" : "प्रतीक्षा करें"}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-emerald-500/5 border-emerald-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Wheat className="h-4 w-4 text-emerald-500" />
                        <span className="text-xs text-muted-foreground">{language === "en" ? "Yield" : "उपज"}</span>
                      </div>
                      <div className="text-lg font-bold text-emerald-600">{language === "en" ? "Normal" : "सामान्य"}</div>
                    </CardContent>
                  </Card>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              {t.testimonials.title} <span className="text-primary">{t.testimonials.titleHighlight}</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {t.testimonials.items.map((testimonial, i) => (
              <Card key={i} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                    <Badge variant="secondary">{testimonial.crop}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            {t.cta.title} <span className="text-primary">{t.cta.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2" data-testid="button-cta-start">
                {t.cta.button}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" data-testid="button-cta-sales">
              {t.cta.secondary}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
                <span className="font-serif font-bold text-xl">KrishiRakshak</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                {t.footer.tagline}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{language === "en" ? "Quick Links" : "त्वरित लिंक"}</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.features}
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.pricing}
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.about}
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.contact}
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{language === "en" ? "Legal" : "कानूनी"}</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.privacy}
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.links.terms}
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
            <div className="flex items-center gap-4">
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
