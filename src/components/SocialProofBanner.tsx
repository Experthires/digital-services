import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMainAffiliateLink } from "./ManageLinksModal";

const SocialProofBanner = () => {
  return (
    <section className="py-12 bg-primary/5 border-y border-primary/10">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
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
      </div>
    </section>
  );
};

export default SocialProofBanner;
