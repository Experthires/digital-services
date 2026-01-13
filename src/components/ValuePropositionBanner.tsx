import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMainAffiliateLink } from "./ManageLinksModal";

const ValuePropositionBanner = () => {
  const benefits = [
    "No hiring headaches",
    "Pay only for results",
    "Cancel anytime",
  ];

  return (
    <section className="py-16 bg-secondary/30 border-y border-border">
      <div className="container px-4">
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
      </div>
    </section>
  );
};

export default ValuePropositionBanner;
