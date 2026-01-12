import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Link, ExternalLink, Trash2, Palette, Video, Globe, Sparkles, Share2, PenTool, Music, Camera, Mic, FileText, Code, Smartphone, TrendingUp, BarChart, Mail, BookOpen, Gamepad2, Building, Users, Heart, ShoppingCart, Briefcase, Megaphone, Film, Layers, Box, Paintbrush, type LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ManageLinksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AffiliateLinks {
  mainLink: string;
  logoDesign: string;
  videoEditing: string;
  webDevelopment: string;
  aiServices: string;
  socialMedia: string;
  copywriting: string;
}

interface StoredService {
  iconName: string;
  title: string;
  description: string;
  price: string;
  popular: boolean;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Palette, Video, Globe, Sparkles, Share2, PenTool, Music, Camera, Mic, FileText, Code, Smartphone, TrendingUp, BarChart, Mail, BookOpen, Gamepad2, Building, Users, Heart, ShoppingCart, Briefcase, Megaphone, Film, Layers, Box, Paintbrush
};

const defaultLinks: AffiliateLinks = {
  mainLink: "",
  logoDesign: "",
  videoEditing: "",
  webDevelopment: "",
  aiServices: "",
  socialMedia: "",
  copywriting: "",
};

const linkLabels: Record<keyof AffiliateLinks, string> = {
  mainLink: "Main Affiliate Link",
  logoDesign: "Logo & Branding",
  videoEditing: "Video Editing",
  webDevelopment: "Web Development",
  aiServices: "AI Services",
  socialMedia: "Social Media",
  copywriting: "Copywriting",
};

export const getAffiliateLinks = (): AffiliateLinks => {
  const saved = localStorage.getItem("affiliateLinks");
  return saved ? JSON.parse(saved) : defaultLinks;
};

const getStoredServices = (): StoredService[] => {
  const saved = localStorage.getItem("customServices");
  return saved ? JSON.parse(saved) : [];
};

const ManageLinksModal = ({ open, onOpenChange }: ManageLinksModalProps) => {
  const [links, setLinks] = useState<AffiliateLinks>(defaultLinks);
  const [services, setServices] = useState<StoredService[]>([]);

  useEffect(() => {
    if (open) {
      setLinks(getAffiliateLinks());
      setServices(getStoredServices());
    }
  }, [open]);

  const handleChange = (key: keyof AffiliateLinks, value: string) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("affiliateLinks", JSON.stringify(links));
    toast.success("Affiliate links saved successfully!");
    onOpenChange(false);
  };

  const handleReset = () => {
    setLinks(defaultLinks);
    localStorage.removeItem("affiliateLinks");
    toast.success("Links reset to default");
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    localStorage.setItem("customServices", JSON.stringify(updatedServices));
    // Dispatch event so ServicesSection can update
    window.dispatchEvent(new CustomEvent('servicesUpdated'));
    toast.success("Service removed");
  };

  const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || Palette;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-primary" />
            Manage My Links
          </DialogTitle>
          <DialogDescription>
            Configure affiliate links and manage your added services.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="links" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="links">Affiliate Links</TabsTrigger>
            <TabsTrigger value="services">My Services ({services.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="links" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[40vh]">
              <div className="space-y-4 py-4 pr-4">
                {(Object.keys(linkLabels) as Array<keyof AffiliateLinks>).map((key) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-sm font-medium flex items-center gap-2">
                      {key === "mainLink" && <ExternalLink className="w-4 h-4 text-primary" />}
                      {linkLabels[key]}
                      {key === "mainLink" && (
                        <span className="text-xs text-muted-foreground">(Required)</span>
                      )}
                    </Label>
                    <Input
                      id={key}
                      type="url"
                      placeholder={key === "mainLink" 
                        ? "https://go.fiverr.com/visit/?bta=YOUR_ID&brand=fiverrhybrid" 
                        : "Leave blank to use main link"
                      }
                      value={links[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="bg-background"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="services" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[40vh]">
              <div className="space-y-3 py-4 pr-4">
                {services.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Layers className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No services added yet.</p>
                    <p className="text-xs mt-1">Add services from the Service Library.</p>
                  </div>
                ) : (
                  services.map((service, index) => {
                    const IconComponent = getIcon(service.iconName);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{service.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{service.price}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveService(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
            Reset Links
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto gap-2">
            <Save className="w-4 h-4" />
            Save Links
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageLinksModal;
