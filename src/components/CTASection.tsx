import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { getMainAffiliateLink } from "./ManageLinksModal";

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Limited Time: New users get 10% off first order
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Ready to Grow Your{" "}
            <span className="text-gradient">Business?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Stop wasting time and money on outdated hiring methods. 
            Join millions of businesses getting work done smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href={getMainAffiliateLink() || "#"} target="_blank" rel="noopener noreferrer">
                Hire a Freelancer Today
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Free to sign up • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
