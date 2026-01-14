import { Star, Users, Globe, Award } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  {
    icon: Users,
    endValue: 4,
    suffix: "M+",
    label: "Active Buyers",
  },
  {
    icon: Globe,
    endValue: 160,
    suffix: "+",
    label: "Countries Served",
  },
  {
    icon: Star,
    endValue: 50,
    suffix: "M+",
    label: "5-Star Reviews",
  },
  {
    icon: Award,
    endValue: 800,
    suffix: "K+",
    label: "Expert Freelancers",
  },
];

const StatCard = ({ icon: Icon, endValue, suffix, label }: {
  icon: typeof Users;
  endValue: number;
  suffix: string;
  label: string;
}) => {
  const { ref, formattedCount } = useCountUp({ end: endValue, suffix, duration: 2000 });

  return (
    <div ref={ref} className="text-center group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-glow transition-all">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="font-display text-3xl md:text-4xl font-bold text-shimmer mb-2">
        {formattedCount}
      </div>
      <div className="text-muted-foreground text-sm">
        {label}
      </div>
    </div>
  );
};

const testimonials = [
  {
    quote: "Found an amazing designer who understood my vision perfectly. The logo exceeded all expectations.",
    author: "Sarah M.",
    role: "Startup Founder",
    rating: 5,
  },
  {
    quote: "Saved our company thousands by outsourcing video production. Quality rivals expensive agencies.",
    author: "James K.",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote: "Built our entire e-commerce site for a fraction of what local developers quoted. Incredible value.",
    author: "Maria L.",
    role: "Small Business Owner",
    rating: 5,
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        {/* Stats */}
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                endValue={stat.endValue}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Join Millions of{" "}
              <span className="text-gradient">Satisfied Customers</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} animation="fade-left" delay={index * 100 + 200}>
              <div className="p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust badges */}
        <ScrollReveal animation="fade-up" delay={500}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Protected by industry-leading security</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <span className="text-xs font-bold">SSL</span>
                </div>
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <span className="text-xs font-bold">✓</span>
                </div>
                <span className="text-sm">Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <span className="text-xs font-bold">24/7</span>
                </div>
                <span className="text-sm">Customer Support</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustSection;
