import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "client/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "client/src/components/ui/card";
import { Input } from "client/src/components/ui/input";
import { ScrollArea } from "client/src/components/ui/scroll-area";
import { Badge } from "client/src/components/ui/badge";
import { Avatar, AvatarFallback } from "client/src/components/ui/avatar";
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  Maximize2,
  Bot,
  User,
  Loader2,
  Leaf
} from "lucide-react";
import { apiRequest } from "client/src/lib/queryClient";
import type { ChatMessage, DashboardData } from "@shared/schema";

interface ChatBotProps {
  language: "en" | "hi";
  dashboardData?: DashboardData;
}

const translations = {
  en: {
    title: "Kisan e-Mitra",
    subtitle: "Your AI Farming Assistant",
    placeholder: "Ask me anything about farming...",
    send: "Send",
    suggestedQuestions: [
      "What is my current risk level?",
      "Should I irrigate today?",
      "When should I sell my crop?",
      "What schemes am I eligible for?",
    ],
    greeting: "Namaste! I'm Kisan e-Mitra, your AI farming assistant. How can I help you today? You can ask me about:",
    topics: [
      "Farm risk assessment",
      "Irrigation guidance",
      "Market timing",
      "Government schemes",
      "Crop advice",
    ],
    typing: "Thinking...",
    error: "Sorry, I encountered an error. Please try again.",
  },
  hi: {
    title: "किसान ई-मित्र",
    subtitle: "आपका AI खेती सहायक",
    placeholder: "खेती के बारे में कुछ भी पूछें...",
    send: "भेजें",
    suggestedQuestions: [
      "मेरा वर्तमान जोखिम स्तर क्या है?",
      "क्या मुझे आज सिंचाई करनी चाहिए?",
      "मुझे अपनी फसल कब बेचनी चाहिए?",
      "मैं किन योजनाओं के लिए पात्र हूं?",
    ],
    greeting: "नमस्ते! मैं किसान ई-मित्र हूं, आपका AI खेती सहायक। आज मैं आपकी कैसे मदद कर सकता हूं? आप मुझसे पूछ सकते हैं:",
    topics: [
      "फार्म जोखिम मूल्यांकन",
      "सिंचाई मार्गदर्शन",
      "बाजार समय",
      "सरकारी योजनाएं",
      "फसल सलाह",
    ],
    typing: "सोच रहा हूं...",
    error: "क्षमा करें, एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
  },
};

export function ChatBot({ language, dashboardData }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = translations[language];

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        language,
        context: dashboardData ? {
          farmRisk: dashboardData.farmRisk,
          irrigation: dashboardData.irrigation,
          market: dashboardData.market,
        } : undefined,
      });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
        language,
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: () => {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: t.error,
        timestamp: new Date().toISOString(),
        language,
      };
      setMessages(prev => [...prev, errorMessage]);
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
      language,
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(input.trim());
    setInput("");
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    handleSend();
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
        data-testid="button-open-chat"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center text-[10px] text-white">
          1
        </span>
      </Button>
    );
  }

  return (
    <Card className={`fixed z-50 shadow-xl transition-all duration-300 ${
      isMinimized 
        ? "bottom-6 right-6 w-72 h-14" 
        : "bottom-6 right-6 w-96 h-[600px] max-h-[80vh]"
    } md:w-96 ${isMinimized ? "" : "max-w-[calc(100vw-2rem)]"}`}
    data-testid="chatbot-container"
    >
      {/* Header */}
      <CardHeader className="p-3 border-b flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">{t.title}</CardTitle>
            {!isMinimized && (
              <p className="text-xs text-muted-foreground">{t.subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="text-xs">
            {language === "en" ? "EN" : "हिं"}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMinimized(!isMinimized)}
            data-testid="button-minimize-chat"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
            data-testid="button-close-chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(100%-60px)]">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="space-y-4">
                {/* Greeting */}
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="bg-muted rounded-md rounded-tl-none p-3 text-sm">
                      <p className="mb-2">{t.greeting}</p>
                      <ul className="space-y-1">
                        {t.topics.map((topic, i) => (
                          <li key={i} className="text-muted-foreground">• {topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Suggested Questions */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground text-center">
                    {language === "en" ? "Quick questions:" : "त्वरित प्रश्न:"}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {t.suggestedQuestions.map((question, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1.5 px-2"
                        onClick={() => handleSuggestedQuestion(question)}
                        data-testid={`button-suggested-${i}`}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={message.role === "user" ? "bg-primary" : "bg-muted"}>
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex-1 max-w-[80%] rounded-md p-3 text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {chatMutation.isPending && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-md rounded-tl-none p-3 text-sm flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.typing}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                disabled={chatMutation.isPending}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || chatMutation.isPending}
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
