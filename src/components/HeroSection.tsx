import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { getMainAffiliateLink } from "./ManageLinksModal";
import { useMemo } from "react";

// Optimized StarField with fewer DOM elements and CSS-based animation
const StarField = () => {
  const stars = useMemo(() => {
    // Reduced to 40 stars for better performance
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white will-change-transform"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-mesh" />
      
      {/* Star field particles */}
      <StarField />
      
      {/* Animated floating orbs */}
      <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse-slow" />
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Trusted by 4M+ businesses worldwide
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="animate-fade-up-delay-1 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Get Quality Work Done{" "}
            <span className="text-shimmer">10x Faster</span>{" "}
            Than Traditional Hiring
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Access 800,000+ skilled freelancers ready to bring your vision to life. 
            No interviews. No delays. Just results delivered in days, not months.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl" 
              asChild
            >
              <a href={getMainAffiliateLink() || "#"} target="_blank" rel="noopener noreferrer">
                Get Started on Fiverr
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              asChild
            >
              <a href="#services">
                Explore Services
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-up-delay-3 mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
              <span className="text-sm">No upfront fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
              <span className="text-sm">Pay only when satisfied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
              <span className="text-sm">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
