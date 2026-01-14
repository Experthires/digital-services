import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMainAffiliateLink } from "./ManageLinksModal";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const ValuePropositionBanner = () => {
  const benefits = [
    "No hiring headaches",
    "Pay only for results",
    "Cancel anytime",
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/40 to-secondary/20 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="container relative z-10 px-4">
        <ScrollReveal animation="fade-right">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Still Paying Full-Time Salaries for Part-Time Work?
              </h3>
              <p className="text-muted-foreground mb-6">
                Smart businesses hire freelancers for specific projects and save up to 70% on labor costs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button variant="hero" size="xl" asChild className="shrink-0">
              <a href={getMainAffiliateLink() || "#"} target="_blank" rel="noopener noreferrer">
                Start Saving Today <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ValuePropositionBanner;
