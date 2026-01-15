import { Clock, DollarSign, Shield, Zap, Users, Award } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Weeks of Time",
    description: "Skip the lengthy hiring process. Find verified freelancers in minutes and get projects started the same day.",
  },
  {
    icon: DollarSign,
    title: "Cut Costs by 70%",
    description: "No overhead, no office space, no benefits to pay. Get the same quality work at a fraction of traditional hiring costs.",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Delivery",
    description: "Most projects delivered in 1-7 days. Rush options available for time-sensitive needs.",
  },
  {
    icon: Shield,
    title: "Risk-Free Guarantee",
    description: "Your payment is protected until you approve the work. Not satisfied? Get a full refund.",
  },
  {
    icon: Users,
    title: "Global Talent Pool",
    description: "Access specialized skills from 160+ countries. Find the perfect expert for any niche project.",
  },
  {
    icon: Award,
    title: "Verified Excellence",
    description: "Every freelancer is rated and reviewed. See portfolios and past work before you hire.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      
      {/* Accent orb */}
      <div className="absolute -left-32 top-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Why Smart Businesses Choose{" "}
            <span className="text-gradient">Freelance Talent</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Traditional hiring is slow, expensive, and risky. Here's why 
            forward-thinking companies are switching to on-demand expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-glow transition-all">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
