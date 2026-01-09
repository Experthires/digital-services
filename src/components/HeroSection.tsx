import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const AFFILIATE_LINK = "https://go.fiverr.com/visit/?bta=YOUR_AFFILIATE_ID&brand=fiverrhybrid";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand Logo */}
          <div className="animate-fade-up flex items-center justify-center gap-3 mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Expert Hires
            </h1>
            <span className="text-muted-foreground text-xl">×</span>
            <svg viewBox="0 0 89 27" fill="none" className="h-6 md:h-8 w-auto">
              <g fill="currentColor" className="text-[#1dbf73]">
                <path d="M81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6V13.1h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6V8.1h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.1 0h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6V8.1h6v2.8c1-2.2 2.3-2.8 4.3-2.8h1.3v5zm-21.5 8.4h7.6l-3.8-10.8-3.8 10.8zm-1.4 5h-6.7L36.8 0h5.8l10 26.5h-6.7l-1.4-4.9h-9.1l-1.4 4.9h-.8zM15.2 8.1h6v18.4h-6v-2.8c-1 2.2-2.6 2.8-4.9 2.8-4.1 0-7.1-3.1-7.1-9.5s3-9.5 7.1-9.5c2.3 0 3.9.6 4.9 2.8V8.1zm-3.7 5.1c-2 0-3.1 1.5-3.1 4.1s1.1 4.1 3.1 4.1 3.1-1.5 3.1-4.1-1.1-4.1-3.1-4.1zM0 27h6V0H0v27z"/>
              </g>
              <circle cx="82.5" cy="5.5" r="4" fill="#1dbf73"/>
            </svg>
          </div>

          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Trusted by 4M+ businesses worldwide
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="animate-fade-up-delay-1 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Get Quality Work Done{" "}
            <span className="text-gradient">10x Faster</span>{" "}
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
              <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer">
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
              <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
              <span className="text-sm">No upfront fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
              <span className="text-sm">Pay only when satisfied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
              <span className="text-sm">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
