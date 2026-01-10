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
    name: "AI Services",
    icon: Sparkles,
    services: [
      { icon: Sparkles, iconName: "Sparkles", title: "AI Chatbot Development", description: "Custom AI chatbots for customer support and engagement.", price: "Starting at $100", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Image Generation", description: "Create unique images using AI art generators.", price: "Starting at $15", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Content Writing", description: "AI-assisted content creation and optimization.", price: "Starting at $10", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "Machine Learning", description: "Custom ML models and data analysis solutions.", price: "Starting at $200", popular: false },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Voice Synthesis", description: "Realistic AI voice generation for any project.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Animation",
    icon: Film,
    services: [
      { icon: Film, iconName: "Film", title: "2D Animation", description: "Professional 2D animated videos and characters.", price: "Starting at $50", popular: true },
      { icon: Film, iconName: "Film", title: "3D Animation", description: "High-quality 3D animations and modeling.", price: "Starting at $100", popular: true },
      { icon: Film, iconName: "Film", title: "Whiteboard Animation", description: "Engaging whiteboard explainer videos.", price: "Starting at $25", popular: false },
      { icon: Film, iconName: "Film", title: "Character Animation", description: "Bring characters to life with animation.", price: "Starting at $75", popular: false },
      { icon: Film, iconName: "Film", title: "Logo Animation", description: "Dynamic animated logo intros.", price: "Starting at $15", popular: true },
    ]
  },
  {
    name: "Architecture & Design",
    icon: Building,
    services: [
      { icon: Building, iconName: "Building", title: "Architectural Rendering", description: "Photorealistic 3D architectural visualizations.", price: "Starting at $50", popular: true },
      { icon: Building, iconName: "Building", title: "Floor Plans", description: "Professional 2D and 3D floor plan design.", price: "Starting at $25", popular: false },
      { icon: Building, iconName: "Building", title: "Interior Design", description: "Creative interior design concepts and mockups.", price: "Starting at $40", popular: true },
      { icon: Building, iconName: "Building", title: "Landscape Design", description: "Beautiful outdoor space planning.", price: "Starting at $35", popular: false },
    ]
  },
  {
    name: "Branding & Identity",
    icon: Palette,
    services: [
      { icon: Palette, iconName: "Palette", title: "Logo Design", description: "Professional logo design that captures your brand identity.", price: "Starting at $5", popular: true },
      { icon: Paintbrush, iconName: "Paintbrush", title: "Brand Style Guides", description: "Complete brand identity guidelines for consistent marketing.", price: "Starting at $50", popular: true },
      { icon: Palette, iconName: "Palette", title: "Business Cards", description: "Professional business card design.", price: "Starting at $10", popular: false },
      { icon: Palette, iconName: "Palette", title: "Letterhead Design", description: "Corporate stationery and letterhead.", price: "Starting at $15", popular: false },
      { icon: Palette, iconName: "Palette", title: "Brand Naming", description: "Creative naming for your brand or product.", price: "Starting at $50", popular: false },
    ]
  },
  {
    name: "Business Consulting",
    icon: Briefcase,
    services: [
      { icon: Briefcase, iconName: "Briefcase", title: "Business Plans", description: "Professional business plans for startups and funding.", price: "Starting at $100", popular: true },
      { icon: BarChart, iconName: "BarChart", title: "Market Research", description: "In-depth market analysis and competitor research.", price: "Starting at $50", popular: false },
      { icon: Briefcase, iconName: "Briefcase", title: "Financial Consulting", description: "Expert financial advice and projections.", price: "Starting at $75", popular: false },
      { icon: Users, iconName: "Users", title: "HR Consulting", description: "Expert HR advice and employee management.", price: "Starting at $50", popular: false },
      { icon: Briefcase, iconName: "Briefcase", title: "Startup Consulting", description: "Strategic guidance for new businesses.", price: "Starting at $60", popular: true },
    ]
  },
  {
    name: "Copywriting",
    icon: PenTool,
    services: [
      { icon: PenTool, iconName: "PenTool", title: "Sales Copy", description: "Compelling sales copy that converts visitors.", price: "Starting at $10", popular: true },
      { icon: PenTool, iconName: "PenTool", title: "Ad Copy", description: "High-converting ad copy for all platforms.", price: "Starting at $15", popular: true },
      { icon: PenTool, iconName: "PenTool", title: "Website Copy", description: "Professional website content writing.", price: "Starting at $20", popular: true },
      { icon: PenTool, iconName: "PenTool", title: "Product Descriptions", description: "SEO-friendly product descriptions.", price: "Starting at $5", popular: false },
      { icon: PenTool, iconName: "PenTool", title: "UX Writing", description: "Clear, user-friendly interface copy.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Data Analysis",
    icon: BarChart,
    services: [
      { icon: BarChart, iconName: "BarChart", title: "Data Visualization", description: "Beautiful charts and data dashboards.", price: "Starting at $25", popular: true },
      { icon: BarChart, iconName: "BarChart", title: "Excel/Spreadsheets", description: "Advanced spreadsheet solutions and automation.", price: "Starting at $15", popular: true },
      { icon: BarChart, iconName: "BarChart", title: "Power BI/Tableau", description: "Interactive business intelligence dashboards.", price: "Starting at $50", popular: false },
      { icon: BarChart, iconName: "BarChart", title: "Statistical Analysis", description: "Professional statistical analysis services.", price: "Starting at $40", popular: false },
    ]
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    services: [
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Shopify Store", description: "Complete Shopify store setup and design.", price: "Starting at $100", popular: true },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "WooCommerce", description: "WordPress e-commerce solutions.", price: "Starting at $75", popular: true },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Amazon Store", description: "Amazon storefront setup and optimization.", price: "Starting at $50", popular: false },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Product Listings", description: "Optimized product listings that convert.", price: "Starting at $10", popular: false },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Dropshipping Setup", description: "Complete dropshipping business setup.", price: "Starting at $80", popular: false },
    ]
  },
  {
    name: "Email Marketing",
    icon: Mail,
    services: [
      { icon: Mail, iconName: "Mail", title: "Email Campaigns", description: "Strategic email marketing campaigns.", price: "Starting at $30", popular: true },
      { icon: Mail, iconName: "Mail", title: "Newsletter Design", description: "Beautifully designed email newsletters.", price: "Starting at $20", popular: false },
      { icon: Mail, iconName: "Mail", title: "Automation Setup", description: "Email automation and sequence setup.", price: "Starting at $50", popular: true },
      { icon: Mail, iconName: "Mail", title: "Cold Email Outreach", description: "Effective cold email strategies.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    services: [
      { icon: Gamepad2, iconName: "Gamepad2", title: "Game Development", description: "Mobile and desktop game development.", price: "Starting at $200", popular: true },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Game Art", description: "2D and 3D game assets and characters.", price: "Starting at $50", popular: true },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Game Coaching", description: "Professional gaming coaching sessions.", price: "Starting at $15", popular: false },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Streaming Setup", description: "Complete streaming setup for gamers.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Graphics & Design",
    icon: Palette,
    services: [
      { icon: Layers, iconName: "Layers", title: "Illustration", description: "Custom digital illustrations for any purpose.", price: "Starting at $10", popular: true },
      { icon: Box, iconName: "Box", title: "Packaging Design", description: "Eye-catching product packaging design.", price: "Starting at $30", popular: true },
      { icon: FileText, iconName: "FileText", title: "Flyer Design", description: "Professional flyers and brochures.", price: "Starting at $5", popular: false },
      { icon: Camera, iconName: "Camera", title: "Photo Editing", description: "Professional photo retouching.", price: "Starting at $5", popular: true },
      { icon: Palette, iconName: "Palette", title: "Infographics", description: "Engaging infographic design.", price: "Starting at $20", popular: false },
      { icon: Palette, iconName: "Palette", title: "Icon Design", description: "Custom icon sets for apps and websites.", price: "Starting at $15", popular: false },
    ]
  },
  {
    name: "Illustration",
    icon: Layers,
    services: [
      { icon: Layers, iconName: "Layers", title: "Digital Illustration", description: "Custom digital art and illustrations.", price: "Starting at $20", popular: true },
      { icon: Layers, iconName: "Layers", title: "Book Illustration", description: "Beautiful book and cover illustrations.", price: "Starting at $50", popular: false },
      { icon: Layers, iconName: "Layers", title: "Character Design", description: "Unique character concept art.", price: "Starting at $30", popular: true },
      { icon: Layers, iconName: "Layers", title: "Portraits", description: "Digital portrait illustrations.", price: "Starting at $15", popular: true },
      { icon: Layers, iconName: "Layers", title: "Comics & Manga", description: "Comic and manga style artwork.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Legal Services",
    icon: FileText,
    services: [
      { icon: FileText, iconName: "FileText", title: "Contract Drafting", description: "Professional legal contract drafting.", price: "Starting at $50", popular: true },
      { icon: FileText, iconName: "FileText", title: "Legal Consulting", description: "Business legal advice and guidance.", price: "Starting at $75", popular: false },
      { icon: FileText, iconName: "FileText", title: "Trademark Filing", description: "Trademark registration assistance.", price: "Starting at $100", popular: false },
      { icon: FileText, iconName: "FileText", title: "Terms & Policies", description: "Privacy policies and terms of service.", price: "Starting at $30", popular: true },
    ]
  },
  {
    name: "Mobile App Development",
    icon: Smartphone,
    services: [
      { icon: Smartphone, iconName: "Smartphone", title: "iOS App Development", description: "Native iPhone and iPad apps.", price: "Starting at $500", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "Android App Development", description: "Native Android applications.", price: "Starting at $400", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "React Native Apps", description: "Cross-platform mobile apps.", price: "Starting at $300", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "Flutter Apps", description: "Beautiful cross-platform apps.", price: "Starting at $350", popular: false },
      { icon: Smartphone, iconName: "Smartphone", title: "App UI/UX Design", description: "Mobile app interface design.", price: "Starting at $100", popular: false },
    ]
  },
  {
    name: "Music & Audio",
    icon: Music,
    services: [
      { icon: Music, iconName: "Music", title: "Music Production", description: "Original music and beats for any genre.", price: "Starting at $50", popular: true },
      { icon: Mic, iconName: "Mic", title: "Voice Over", description: "Professional voice overs in any language.", price: "Starting at $10", popular: true },
      { icon: Music, iconName: "Music", title: "Mixing & Mastering", description: "Professional audio mixing and mastering.", price: "Starting at $30", popular: false },
      { icon: Music, iconName: "Music", title: "Podcast Editing", description: "Clean, professional podcast editing.", price: "Starting at $20", popular: true },
      { icon: Music, iconName: "Music", title: "Sound Effects", description: "Custom sound effects creation.", price: "Starting at $15", popular: false },
      { icon: Music, iconName: "Music", title: "Jingles & Intros", description: "Catchy audio branding.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Photography",
    icon: Camera,
    services: [
      { icon: Camera, iconName: "Camera", title: "Product Photography", description: "Professional product photo editing.", price: "Starting at $10", popular: true },
      { icon: Camera, iconName: "Camera", title: "Photo Retouching", description: "Expert photo retouching services.", price: "Starting at $5", popular: true },
      { icon: Camera, iconName: "Camera", title: "Background Removal", description: "Clean background removal service.", price: "Starting at $3", popular: true },
      { icon: Camera, iconName: "Camera", title: "Photo Restoration", description: "Restore old and damaged photos.", price: "Starting at $15", popular: false },
    ]
  },
  {
    name: "Programming & Tech",
    icon: Code,
    services: [
      { icon: Globe, iconName: "Globe", title: "Web Development", description: "Custom websites with modern technologies.", price: "Starting at $50", popular: true },
      { icon: Code, iconName: "Code", title: "WordPress Development", description: "Custom WordPress sites and plugins.", price: "Starting at $30", popular: true },
      { icon: Code, iconName: "Code", title: "API Development", description: "RESTful APIs and backend services.", price: "Starting at $75", popular: false },
      { icon: Code, iconName: "Code", title: "Database Design", description: "Optimized database architecture.", price: "Starting at $50", popular: false },
      { icon: Code, iconName: "Code", title: "Bug Fixing", description: "Code debugging and issue resolution.", price: "Starting at $20", popular: true },
    ]
  },
  {
    name: "SEO Services",
    icon: TrendingUp,
    services: [
      { icon: TrendingUp, iconName: "TrendingUp", title: "SEO Optimization", description: "On-page and technical SEO services.", price: "Starting at $50", popular: true },
      { icon: TrendingUp, iconName: "TrendingUp", title: "Keyword Research", description: "Strategic keyword research and analysis.", price: "Starting at $25", popular: false },
      { icon: TrendingUp, iconName: "TrendingUp", title: "Link Building", description: "Quality backlink acquisition.", price: "Starting at $75", popular: true },
      { icon: TrendingUp, iconName: "TrendingUp", title: "Local SEO", description: "Optimize for local search results.", price: "Starting at $40", popular: false },
      { icon: TrendingUp, iconName: "TrendingUp", title: "SEO Audit", description: "Comprehensive website SEO analysis.", price: "Starting at $35", popular: false },
    ]
  },
  {
    name: "Social Media",
    icon: Share2,
    services: [
      { icon: Share2, iconName: "Share2", title: "Social Media Management", description: "Complete social media handling.", price: "Starting at $50", popular: true },
      { icon: Share2, iconName: "Share2", title: "Content Creation", description: "Engaging social media content.", price: "Starting at $20", popular: true },
      { icon: Share2, iconName: "Share2", title: "Influencer Marketing", description: "Connect with relevant influencers.", price: "Starting at $100", popular: false },
      { icon: Share2, iconName: "Share2", title: "Social Media Ads", description: "Facebook, Instagram, TikTok ads.", price: "Starting at $30", popular: true },
      { icon: Share2, iconName: "Share2", title: "Community Management", description: "Build and engage your community.", price: "Starting at $40", popular: false },
    ]
  },
  {
    name: "Translation",
    icon: Globe,
    services: [
      { icon: Globe, iconName: "Globe", title: "Document Translation", description: "Accurate translation in 100+ languages.", price: "Starting at $5", popular: true },
      { icon: Globe, iconName: "Globe", title: "Website Localization", description: "Adapt your website for global audiences.", price: "Starting at $50", popular: false },
      { icon: Globe, iconName: "Globe", title: "Subtitles & Captions", description: "Video subtitles in any language.", price: "Starting at $10", popular: true },
      { icon: Globe, iconName: "Globe", title: "Transcription", description: "Audio to text transcription services.", price: "Starting at $10", popular: false },
    ]
  },
  {
    name: "UI/UX Design",
    icon: Layers,
    services: [
      { icon: Layers, iconName: "Layers", title: "Website Design", description: "Modern, responsive website designs.", price: "Starting at $100", popular: true },
      { icon: Layers, iconName: "Layers", title: "App UI Design", description: "Mobile app interface design.", price: "Starting at $75", popular: true },
      { icon: Layers, iconName: "Layers", title: "Landing Page Design", description: "High-converting landing pages.", price: "Starting at $50", popular: true },
      { icon: Layers, iconName: "Layers", title: "Wireframing", description: "UX wireframes and prototypes.", price: "Starting at $30", popular: false },
      { icon: Layers, iconName: "Layers", title: "Design Systems", description: "Scalable design systems.", price: "Starting at $150", popular: false },
    ]
  },
  {
    name: "Video Production",
    icon: Video,
    services: [
      { icon: Video, iconName: "Video", title: "Video Editing", description: "Professional video editing for all platforms.", price: "Starting at $10", popular: true },
      { icon: Video, iconName: "Video", title: "Explainer Videos", description: "Engaging animated explainer videos.", price: "Starting at $50", popular: true },
      { icon: Video, iconName: "Video", title: "Promotional Videos", description: "Compelling promotional content.", price: "Starting at $75", popular: false },
      { icon: Video, iconName: "Video", title: "YouTube Videos", description: "YouTube content creation and editing.", price: "Starting at $25", popular: true },
      { icon: Video, iconName: "Video", title: "Short Form Video", description: "TikTok, Reels, and Shorts content.", price: "Starting at $15", popular: true },
    ]
  },
  {
    name: "Virtual Assistant",
    icon: Users,
    services: [
      { icon: Users, iconName: "Users", title: "Administrative Support", description: "General admin and office tasks.", price: "Starting at $10", popular: true },
      { icon: Users, iconName: "Users", title: "Data Entry", description: "Accurate and fast data entry.", price: "Starting at $5", popular: true },
      { icon: Users, iconName: "Users", title: "Customer Service", description: "Professional customer support.", price: "Starting at $15", popular: false },
      { icon: Users, iconName: "Users", title: "Research", description: "In-depth research on any topic.", price: "Starting at $20", popular: false },
      { icon: Users, iconName: "Users", title: "Calendar Management", description: "Schedule and appointment handling.", price: "Starting at $10", popular: false },
    ]
  },
  {
    name: "Web Design",
    icon: Globe,
    services: [
      { icon: Globe, iconName: "Globe", title: "Custom Website Design", description: "Unique, tailored website designs.", price: "Starting at $100", popular: true },
      { icon: Globe, iconName: "Globe", title: "WordPress Design", description: "Beautiful WordPress themes.", price: "Starting at $50", popular: true },
      { icon: Globe, iconName: "Globe", title: "Webflow Design", description: "Modern Webflow websites.", price: "Starting at $75", popular: false },
      { icon: Globe, iconName: "Globe", title: "Squarespace Design", description: "Elegant Squarespace sites.", price: "Starting at $60", popular: false },
      { icon: Globe, iconName: "Globe", title: "Website Redesign", description: "Refresh your existing website.", price: "Starting at $80", popular: false },
    ]
  },
  {
    name: "Writing & Content",
    icon: BookOpen,
    services: [
      { icon: BookOpen, iconName: "BookOpen", title: "Blog Writing", description: "SEO-optimized blog posts.", price: "Starting at $15", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "eBook Writing", description: "Complete eBook writing services.", price: "Starting at $100", popular: false },
      { icon: BookOpen, iconName: "BookOpen", title: "Article Writing", description: "High-quality article content.", price: "Starting at $10", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "Ghostwriting", description: "Professional ghostwriting services.", price: "Starting at $50", popular: false },
      { icon: BookOpen, iconName: "BookOpen", title: "Resume Writing", description: "Professional resumes that get interviews.", price: "Starting at $25", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "Script Writing", description: "Video and podcast scripts.", price: "Starting at $30", popular: false },
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
