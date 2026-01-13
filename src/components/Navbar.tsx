import { Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">
              Expert Hires
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>

          {/* Mobile theme toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
