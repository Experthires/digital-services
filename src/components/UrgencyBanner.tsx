import { Clock, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMainAffiliateLink } from "./ManageLinksModal";

const UrgencyBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary mb-6">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-semibold">Limited Time: New Users Get Extra Perks</span>
          </div>
          <h3 className="font-display text-2xl md:text-4xl font-bold mb-4">
            Your Competitors Are Already Scaling With Freelancers
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            While you're reading this, thousands of businesses are getting work done at a fraction of the cost. 
            Stop waiting. Start winning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href={getMainAffiliateLink() || "#"} target="_blank" rel="noopener noreferrer">
                Start My First Project <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>Average delivery: 2-3 days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencyBanner;
