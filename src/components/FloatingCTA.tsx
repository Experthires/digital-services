import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getMainAffiliateLink } from "./ManageLinksModal";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approximately 100vh)
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <Button
        asChild
        variant="cta"
        size="lg"
        className="shadow-[0_8px_30px_hsl(var(--primary)/0.5)] animate-pulse hover:animate-none"
      >
        <a
          href={getMainAffiliateLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hire Now
          <ArrowRight className="ml-1 h-5 w-5" />
        </a>
      </Button>
    </div>
  );
};

export default FloatingCTA;
