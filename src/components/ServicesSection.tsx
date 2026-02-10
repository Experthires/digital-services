import { useState, useEffect } from "react";
import { 
  Palette, Video, Globe, Sparkles, Share2, PenTool, Settings, Plus, Trash2, Award,
  Music, Camera, Mic, FileText, Code, Smartphone, TrendingUp, BarChart, Mail, BookOpen,
  Gamepad2, Building, Users, Heart, ShoppingCart, Briefcase, Megaphone, Film, Layers, Box, Paintbrush,
  Wrench, Zap, Star, Rocket, Target, Link, Copy,
  type LucideIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ManageLinksModal, { getMainAffiliateLink } from "./ManageLinksModal";
import ServiceLibraryModal, { type ServiceItem } from "./ServiceLibraryModal";

// Icon mapping for localStorage persistence - includes all icons from ServiceLibraryModal
const iconMap: Record<string, LucideIcon> = {
  Palette, Video, Globe, Sparkles, Share2, PenTool, Music, Camera, Mic, FileText,
  Code, Smartphone, TrendingUp, BarChart, Mail, BookOpen, Gamepad2, Building, Users,
  Heart, ShoppingCart, Briefcase, Megaphone, Film, Layers, Box, Paintbrush, Wrench,
  Zap, Star, Rocket, Target, Award
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
    description: "First impressions sell. Get a logo that turns heads and builds trust from day one.",
    price: "Starting at $5",
    popular: true,
  },
  {
    iconName: "Video",
    title: "Video Editing",
    description: "Stop scrolling = start selling. Pro edits that hook viewers in 3 seconds flat.",
    price: "Starting at $10",
    popular: false,
  },
  {
    iconName: "Globe",
    title: "Web Development",
    description: "Your website works while you sleep. Fast, mobile-ready sites that convert clicks to cash.",
    price: "Starting at $50",
    popular: true,
  },
  {
    iconName: "Sparkles",
    title: "AI Services",
    description: "Work smarter, not harder. AI tools that save 10+ hours weekly on autopilot.",
    price: "Starting at $15",
    popular: true,
  },
  {
    iconName: "Share2",
    title: "Social Media",
    description: "Go viral or go home. Content strategies that turn followers into paying fans.",
    price: "Starting at $5",
    popular: false,
  },
  {
    iconName: "PenTool",
    title: "Copywriting",
    description: "Words that print money. Sales copy so persuasive, your checkout page won't stop ringing.",
    price: "Starting at $10",
    popular: true,
  },
];

const getStoredServices = (): StoredService[] => {
  const saved = localStorage.getItem("customServices");
  return saved ? JSON.parse(saved) : defaultServices;
};

const getShareUrl = (serviceTitle: string) => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out amazing ${serviceTitle} services!`);
  
  return {
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };
};

const handleCopyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
  toast.success("Link copied to clipboard!");
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
    window.dispatchEvent(new CustomEvent('servicesUpdated'));
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
          {services.map((service, index) => {
            const IconComponent = getIcon(service.iconName);
            const affiliateUrl = service.affiliateLink || getMainAffiliateLink() || "#";
            return (
              <a
                key={index}
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
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                    Popular
                  </span>
                )}
                
                {/* Share Dropdown - Always visible, top right */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="absolute top-4 right-4 p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-glow z-20"
                      aria-label={`Share ${service.title}`}
                    >
                      <Share2 className="w-4 h-4 text-primary" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-48 bg-card border border-border shadow-lg z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem asChild>
                      <a 
                        href={getShareUrl(service.title).whatsapp} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a 
                        href={getShareUrl(service.title).twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        X (Twitter)
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a 
                        href={getShareUrl(service.title).facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a 
                        href={getShareUrl(service.title).linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink();
                      }}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground" />
                      Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Delete Button - On hover */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveService(index);
                  }}
                  className="absolute bottom-4 right-4 p-2 rounded-lg bg-muted/50 hover:bg-destructive/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  aria-label={`Remove ${service.title}`}
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
                
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
            );
          })}
        </div>

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
