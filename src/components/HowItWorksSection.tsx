import { Search, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMainAffiliateLink } from "./ManageLinksModal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse & Choose",
    description: "Search thousands of services. Filter by price, delivery time, and seller ratings to find your perfect match.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Discuss & Order",
    description: "Chat with freelancers, share your vision, and place your order with secure payment protection.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Review & Approve",
    description: "Receive your completed work, request revisions if needed, and only pay when you're 100% satisfied.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Getting Started is{" "}
            <span className="text-gradient">Incredibly Simple</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From idea to delivered project in three easy steps. 
            No complicated contracts or lengthy negotiations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-secondary border border-border flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" asChild>
            <a href={getMainAffiliateLink() || "#"} target="_blank" rel="noopener noreferrer">
              Start Your First Project
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
