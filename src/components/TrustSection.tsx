import { Star, Users, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "4M+",
    label: "Active Buyers",
  },
  {
    icon: Globe,
    value: "160+",
    label: "Countries Served",
  },
  {
    icon: Star,
    value: "50M+",
    label: "5-Star Reviews",
  },
  {
    icon: Award,
    value: "800K+",
    label: "Expert Freelancers",
  },
];

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
    <section className="py-20 md:py-32">
      <div className="container px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Join Millions of{" "}
            <span className="text-gradient">Satisfied Customers</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-card border border-border"
            >
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
          ))}
        </div>

        {/* Trust badges */}
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
      </div>
    </section>
  );
};

export default TrustSection;
