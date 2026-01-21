import { Button } from "client/src/components/ui/button";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "client/src/components/ui/dropdown-menu";

interface LanguageToggleProps {
  language: "en" | "hi";
  onLanguageChange: (lang: "en" | "hi") => void;
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" data-testid="button-language-toggle">
          <Languages className="h-4 w-4" />
          <span className="text-sm font-medium">{language === "en" ? "EN" : "हिं"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onLanguageChange("en")}
          data-testid="menu-item-english"
        >
          <span className="mr-2">🇬🇧</span> English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onLanguageChange("hi")}
          data-testid="menu-item-hindi"
        >
          <span className="mr-2">🇮🇳</span> हिंदी (Hindi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
