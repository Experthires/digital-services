import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Search, 
  Plus, 
  Palette, 
  Video, 
  Globe, 
  Sparkles, 
  Share2, 
  PenTool,
  Music,
  Camera,
  Mic,
  FileText,
  Code,
  Smartphone,
  TrendingUp,
  BarChart,
  Mail,
  BookOpen,
  Gamepad2,
  Building,
  Users,
  Heart,
  ShoppingCart,
  Briefcase,
  Megaphone,
  Film,
  Layers,
  Box,
  Paintbrush,
  type LucideIcon
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServiceLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddService: (service: ServiceItem) => void;
}

export interface ServiceItem {
  icon: LucideIcon;
  iconName: string;
  title: string;
  description: string;
  price: string;
  popular: boolean;
  category: string;
}

interface ServiceCategory {
  name: string;
  icon: LucideIcon;
  services: Omit<ServiceItem, 'category'>[];
}

const serviceLibrary: ServiceCategory[] = [
  {
    name: "Graphics & Design",
    icon: Palette,
    services: [
      { icon: Palette, iconName: "Palette", title: "Logo Design", description: "Professional logo design that captures your brand identity perfectly.", price: "Starting at $5", popular: true },
      { icon: Paintbrush, iconName: "Paintbrush", title: "Brand Style Guides", description: "Complete brand identity guidelines for consistent marketing.", price: "Starting at $50", popular: false },
      { icon: Layers, iconName: "Layers", title: "Illustration", description: "Custom digital illustrations for any purpose or style.", price: "Starting at $10", popular: true },
      { icon: Box, iconName: "Box", title: "Packaging Design", description: "Eye-catching product packaging that sells.", price: "Starting at $30", popular: false },
      { icon: FileText, iconName: "FileText", title: "Flyer Design", description: "Professional flyers and brochures for your business.", price: "Starting at $5", popular: false },
      { icon: Camera, iconName: "Camera", title: "Photo Editing", description: "Professional photo retouching and manipulation.", price: "Starting at $5", popular: true },
    ]
  },
  {
    name: "Video & Animation",
    icon: Video,
    services: [
      { icon: Video, iconName: "Video", title: "Video Editing", description: "Professional video editing for YouTube, social media, and more.", price: "Starting at $10", popular: true },
      { icon: Film, iconName: "Film", title: "Animated Videos", description: "Engaging animated explainer and promotional videos.", price: "Starting at $50", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "Motion Graphics", description: "Dynamic motion graphics for intros, outros, and ads.", price: "Starting at $25", popular: false },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Gaming Videos", description: "Gaming video editing with effects and highlights.", price: "Starting at $15", popular: false },
      { icon: Camera, iconName: "Camera", title: "Product Videos", description: "Showcase your products with stunning video content.", price: "Starting at $30", popular: false },
    ]
  },
  {
    name: "Writing & Translation",
    icon: PenTool,
    services: [
      { icon: PenTool, iconName: "PenTool", title: "Copywriting", description: "Compelling sales copy that converts visitors to customers.", price: "Starting at $10", popular: true },
      { icon: FileText, iconName: "FileText", title: "Blog Writing", description: "SEO-optimized blog posts that drive organic traffic.", price: "Starting at $15", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "eBook Writing", description: "Professional eBook writing and formatting services.", price: "Starting at $100", popular: false },
      { icon: Mail, iconName: "Mail", title: "Email Copy", description: "High-converting email sequences and newsletters.", price: "Starting at $20", popular: true },
      { icon: Globe, iconName: "Globe", title: "Translation", description: "Accurate translation in 100+ languages by native speakers.", price: "Starting at $5", popular: false },
      { icon: FileText, iconName: "FileText", title: "Resume Writing", description: "Professional resumes that get you interviews.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Digital Marketing",
    icon: TrendingUp,
    services: [
      { icon: TrendingUp, iconName: "TrendingUp", title: "SEO Services", description: "Boost your search rankings with expert SEO optimization.", price: "Starting at $50", popular: true },
      { icon: Share2, iconName: "Share2", title: "Social Media Marketing", description: "Grow your brand presence across all social platforms.", price: "Starting at $20", popular: true },
      { icon: Megaphone, iconName: "Megaphone", title: "Influencer Marketing", description: "Connect with influencers to amplify your brand.", price: "Starting at $100", popular: false },
      { icon: Mail, iconName: "Mail", title: "Email Marketing", description: "Strategic email campaigns that nurture and convert.", price: "Starting at $30", popular: false },
      { icon: BarChart, iconName: "BarChart", title: "PPC Advertising", description: "Google Ads and paid social campaigns that deliver ROI.", price: "Starting at $50", popular: true },
    ]
  },
  {
    name: "Programming & Tech",
    icon: Code,
    services: [
      { icon: Globe, iconName: "Globe", title: "Web Development", description: "Custom websites built with modern technologies.", price: "Starting at $50", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "Mobile Apps", description: "iOS and Android apps for your business.", price: "Starting at $200", popular: true },
      { icon: Code, iconName: "Code", title: "WordPress", description: "Custom WordPress sites, themes, and plugins.", price: "Starting at $30", popular: false },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "E-commerce", description: "Shopify, WooCommerce, and custom e-commerce solutions.", price: "Starting at $100", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Development", description: "AI-powered solutions, chatbots, and automation.", price: "Starting at $100", popular: true },
      { icon: Code, iconName: "Code", title: "API Integration", description: "Connect your apps with third-party services.", price: "Starting at $50", popular: false },
    ]
  },
  {
    name: "Music & Audio",
    icon: Music,
    services: [
      { icon: Music, iconName: "Music", title: "Music Production", description: "Original music and beats for any genre or mood.", price: "Starting at $50", popular: true },
      { icon: Mic, iconName: "Mic", title: "Voice Over", description: "Professional voice overs in any language or accent.", price: "Starting at $10", popular: true },
      { icon: Music, iconName: "Music", title: "Mixing & Mastering", description: "Professional audio mixing and mastering services.", price: "Starting at $30", popular: false },
      { icon: Music, iconName: "Music", title: "Podcast Editing", description: "Clean, professional podcast audio editing.", price: "Starting at $20", popular: false },
      { icon: Music, iconName: "Music", title: "Jingles & Intros", description: "Catchy audio branding for your business.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Business",
    icon: Briefcase,
    services: [
      { icon: Briefcase, iconName: "Briefcase", title: "Virtual Assistant", description: "Reliable virtual assistants for any business task.", price: "Starting at $10", popular: true },
      { icon: BarChart, iconName: "BarChart", title: "Market Research", description: "In-depth market analysis and competitor research.", price: "Starting at $50", popular: false },
      { icon: FileText, iconName: "FileText", title: "Business Plans", description: "Professional business plans for startups and funding.", price: "Starting at $100", popular: false },
      { icon: Users, iconName: "Users", title: "HR Consulting", description: "Expert HR advice and employee management solutions.", price: "Starting at $50", popular: false },
      { icon: Building, iconName: "Building", title: "Legal Consulting", description: "Business legal advice and contract drafting.", price: "Starting at $75", popular: false },
    ]
  },
  {
    name: "Lifestyle",
    icon: Heart,
    services: [
      { icon: Heart, iconName: "Heart", title: "Health & Fitness", description: "Personalized fitness and nutrition coaching.", price: "Starting at $20", popular: false },
      { icon: Users, iconName: "Users", title: "Life Coaching", description: "Personal development and life coaching sessions.", price: "Starting at $30", popular: false },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Gaming", description: "Game coaching, boosting, and streaming setup.", price: "Starting at $15", popular: true },
      { icon: Camera, iconName: "Camera", title: "Travel Planning", description: "Custom travel itineraries and trip planning.", price: "Starting at $25", popular: false },
    ]
  },
];

const ServiceLibraryModal = ({ open, onOpenChange, onAddService }: ServiceLibraryModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredLibrary = serviceLibrary.map(category => ({
    ...category,
    services: category.services.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    (!selectedCategory || category.name === selectedCategory) &&
    (category.services.length > 0 || searchTerm === "")
  );

  const handleAddService = (service: Omit<ServiceItem, 'category'>, categoryName: string) => {
    onAddService({ ...service, category: categoryName });
    toast.success(`${service.title} added to your services!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Layers className="w-5 h-5 text-primary" />
            Service Library
          </DialogTitle>
          <DialogDescription>
            Browse all Fiverr categories and add services to your landing page.
          </DialogDescription>
          
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {serviceLibrary.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="gap-1"
              >
                <category.icon className="w-3 h-3" />
                {category.name}
              </Button>
            ))}
          </div>
        </DialogHeader>

        <ScrollArea className="h-[50vh] p-6">
          <div className="space-y-8">
            {filteredLibrary.map((category) => (
              <div key={category.name}>
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                  <category.icon className="w-5 h-5 text-primary" />
                  {category.name}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, index) => (
                    <div
                      key={index}
                      className="group relative p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-200"
                    >
                      {service.popular && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">
                          Popular
                        </span>
                      )}
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <service.icon className="w-5 h-5 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 truncate">
                            {service.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {service.description}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            {service.price}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute bottom-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleAddService(service, category.name)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredLibrary.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No services found matching your search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceLibraryModal;
export { serviceLibrary };
