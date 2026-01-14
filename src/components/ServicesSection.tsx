import { useState, useEffect } from "react";
import { Palette, Video, Globe, Sparkles, Share2, PenTool, Settings, ExternalLink, Plus, Trash2, Award, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ManageLinksModal, { getMainAffiliateLink } from "./ManageLinksModal";
import ServiceLibraryModal, { type ServiceItem } from "./ServiceLibraryModal";
import { ScrollReveal } from "@/hooks/useScrollReveal";

// Icon mapping for localStorage persistence
const iconMap: Record<string, LucideIcon> = {
  Palette, Video, Globe, Sparkles, Share2, PenTool
};

interface StoredService {
  iconName: string;
  title: string;
  description: string;
  price: string;
  popular: boolean;
  affiliateLink?: string;
}

const defaultServices: StoredService[] = [
  {
    iconName: "Palette",
    title: "Logo & Branding",
    description: "Professional logos that make your brand unforgettable. From concept to final files.",
    price: "Starting at $5",
    popular: true,
  },
  {
    iconName: "Video",
    title: "Video Editing",
    description: "YouTube intros, social media clips, promotional videos edited by skilled professionals.",
    price: "Starting at $10",
    popular: false,
  },
  {
    iconName: "Globe",
    title: "Web Development",
    description: "Custom websites, landing pages, and web apps built with modern technologies.",
    price: "Starting at $50",
    popular: true,
  },
  {
    iconName: "Sparkles",
    title: "AI Services",
    description: "AI-powered content, chatbots, automation, and cutting-edge machine learning solutions.",
    price: "Starting at $15",
    popular: true,
  },
  {
    iconName: "Share2",
    title: "Social Media",
    description: "Content creation, management, and growth strategies for all major platforms.",
    price: "Starting at $5",
    popular: false,
  },
  {
    iconName: "PenTool",
    title: "Copywriting",
    description: "Compelling sales copy, blog posts, email campaigns, and website content that converts.",
    price: "Starting at $10",
    popular: true,
  },
];

const getStoredServices = (): StoredService[] => {
  const saved = localStorage.getItem("customServices");
  return saved ? JSON.parse(saved) : defaultServices;
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [services, setServices] = useState<StoredService[]>(defaultServices);

  useEffect(() => {
    setServices(getStoredServices());
    
    // Listen for updates from ManageLinksModal
    const handleServicesUpdate = () => {
      setServices(getStoredServices());
    };
    window.addEventListener('servicesUpdated', handleServicesUpdate);
    return () => window.removeEventListener('servicesUpdated', handleServicesUpdate);
  }, []);

  const handleAddService = (service: ServiceItem) => {
    const newService: StoredService = {
      iconName: service.iconName,
      title: service.title,
      description: service.description,
      price: service.price,
      popular: service.popular,
    };
    
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem("customServices", JSON.stringify(updatedServices));
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    localStorage.setItem("customServices", JSON.stringify(updatedServices));
    toast.success("Service removed");
  };

  const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || Palette;
  };

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      
      {/* Accent orbs */}
      <div className="absolute -right-32 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -left-32 bottom-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <ScrollReveal animation="fade-up">
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
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = getIcon(service.iconName);
            const affiliateUrl = service.affiliateLink || getMainAffiliateLink() || "#";
            return (
              <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-8 pt-12 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow block h-full"
                >
                  {/* Recommended Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full shadow-lg">
                    <Award className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                      Recommended by Expert Hires
                    </span>
                  </div>
                  
                  {service.popular && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                      Popular
                    </span>
                  )}
                  
                  <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleShare(service.title);
                      }}
                      className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors"
                      aria-label={`Share ${service.title}`}
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveService(index);
                      }}
                      className="p-2 rounded-lg bg-muted/50 hover:bg-destructive/20 transition-colors"
                      aria-label={`Remove ${service.title}`}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                  
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-glow transition-all">
                    <IconComponent className="w-7 h-7 text-primary" />
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
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal animation="fade-up" delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="default" size="lg" className="gap-2" onClick={() => setIsLibraryOpen(true)}>
              <Plus className="w-4 h-4" />
              Add New Service
            </Button>
            <Button variant="outline" size="lg" className="gap-2" onClick={() => setIsModalOpen(true)}>
              <Settings className="w-4 h-4" />
              Manage My Links
            </Button>
          </div>
        </ScrollReveal>
      </div>

      <ManageLinksModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <ServiceLibraryModal 
        open={isLibraryOpen} 
        onOpenChange={setIsLibraryOpen} 
        onAddService={handleAddService}
      />
    </section>
  );
};

export default ServicesSection;
