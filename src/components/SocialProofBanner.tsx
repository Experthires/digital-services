import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMainAffiliateLink } from "./ManageLinksModal";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const SocialProofBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-y border-primary/20">
      <div className="container px-4">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-glow">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-display text-xl md:text-2xl font-bold">
                  Every 4 Seconds, Someone Hires on Fiverr
                </p>
                <p className="text-muted-foreground text-sm">
                  Don't let your competition get ahead. Start your project now.
                </p>
              </div>
            </div>
            <Button variant="hero" size="lg" asChild>
              <a href={getMainAffiliateLink() || "#"} target="_blank" rel="noopener noreferrer">
                Hire Now <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SocialProofBanner;
