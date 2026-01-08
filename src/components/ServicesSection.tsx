import { Palette, Video, Globe, Sparkles, Share2, PenTool, Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const services = [
  {
    icon: Palette,
    title: "Logo & Branding",
    description: "Professional logos that make your brand unforgettable. From concept to final files.",
    price: "Starting at $5",
    popular: true,
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "YouTube intros, social media clips, promotional videos edited by skilled professionals.",
    price: "Starting at $10",
    popular: false,
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites, landing pages, and web apps built with modern technologies.",
    price: "Starting at $50",
    popular: true,
  },
  {
    icon: Sparkles,
    title: "AI Services",
    description: "AI-powered content, chatbots, automation, and cutting-edge machine learning solutions.",
    price: "Starting at $15",
    popular: true,
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Content creation, management, and growth strategies for all major platforms.",
    price: "Starting at $5",
    popular: false,
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Compelling sales copy, blog posts, email campaigns, and website content that converts.",
    price: "Starting at $10",
    popular: true,
  },
];

const handleShare = async (serviceTitle: string) => {
  const shareData = {
    title: `${serviceTitle} on Fiverr`,
    text: `Check out amazing ${serviceTitle} services!`,
    url: window.location.href,
  };
  
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // User cancelled or error
    }
  } else {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  }
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Services That{" "}
            <span className="text-gradient">Scale Your Business</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whatever you need to grow, there's a freelancer ready to deliver. 
            Explore the most in-demand services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              {service.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                  Popular
                </span>
              )}
              
              <button
                onClick={() => handleShare(service.title)}
                className="absolute top-4 left-4 p-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100"
                aria-label={`Share ${service.title}`}
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </button>
              
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-xl font-semibold mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              
              <p className="text-primary font-semibold">
                {service.price}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" size="lg" className="gap-2">
            <Settings className="w-4 h-4" />
            Manage My Links
          </Button>
          <Button variant="outline" size="lg">
            Explore All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
