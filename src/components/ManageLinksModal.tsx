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
import { Save, Link, ExternalLink, Trash2, Palette, Video, Globe, Sparkles, Share2, PenTool, Music, Camera, Mic, FileText, Code, Smartphone, TrendingUp, BarChart, Mail, BookOpen, Gamepad2, Building, Users, Heart, ShoppingCart, Briefcase, Megaphone, Film, Layers, Box, Paintbrush, Lock, type LucideIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { areLinksLocked, lockLinks, hasLinksBeenSet } from "@/hooks/useSecurityMeasures";

interface ManageLinksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface StoredService {
  iconName: string;
  title: string;
  description: string;
  price: string;
  popular: boolean;
  affiliateLink?: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Palette, Video, Globe, Sparkles, Share2, PenTool, Music, Camera, Mic, FileText, Code, Smartphone, TrendingUp, BarChart, Mail, BookOpen, Gamepad2, Building, Users, Heart, ShoppingCart, Briefcase, Megaphone, Film, Layers, Box, Paintbrush
};

const getStoredServices = (): StoredService[] => {
  const saved = localStorage.getItem("customServices");
  return saved ? JSON.parse(saved) : [];
};

export const getMainAffiliateLink = (): string => {
  return localStorage.getItem("mainAffiliateLink") || "";
};

const ADMIN_PASSWORD_KEY = "fiverr_admin_password";

const getAdminPassword = (): string | null => {
  return localStorage.getItem(ADMIN_PASSWORD_KEY);
};

const setAdminPassword = (password: string): void => {
  localStorage.setItem(ADMIN_PASSWORD_KEY, password);
};

const ManageLinksModal = ({ open, onOpenChange }: ManageLinksModalProps) => {
  const [mainLink, setMainLink] = useState("");
  const [services, setServices] = useState<StoredService[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  useEffect(() => {
    if (open) {
      setMainLink(getMainAffiliateLink());
      setServices(getStoredServices());
      setIsLocked(areLinksLocked());
      setIsAuthenticated(false);
      setPasswordInput("");
      setConfirmPassword("");
      setIsSettingPassword(!getAdminPassword());
    }
  }, [open]);

  // Live sync: update services list when services are added/removed elsewhere
  useEffect(() => {
    const handleServicesUpdate = () => {
      const updated = getStoredServices();
      // Preserve any affiliate links already set
      setServices(prev => {
        const linkMap = new Map(prev.map(s => [s.title, s.affiliateLink]));
        return updated.map(s => ({
          ...s,
          affiliateLink: s.affiliateLink || linkMap.get(s.title) || "",
        }));
      });
    };
    window.addEventListener('servicesUpdated', handleServicesUpdate);
    return () => window.removeEventListener('servicesUpdated', handleServicesUpdate);
  }, []);

  const handlePasswordSubmit = () => {
    if (isSettingPassword) {
      if (passwordInput.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }
      if (passwordInput !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      setAdminPassword(passwordInput);
      setIsAuthenticated(true);
      toast.success("Password set! You're now authenticated.");
    } else {
      if (passwordInput === getAdminPassword()) {
        setIsAuthenticated(true);
        toast.success("Access granted.");
      } else {
        toast.error("Incorrect password.");
        setPasswordInput("");
      }
    }
  };

  const handleServiceLinkChange = (index: number, value: string) => {
    if (isLocked) return;
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], affiliateLink: value };
    setServices(updatedServices);
  };

  const handleSave = () => {
    if (isLocked) {
      toast.error("Links are locked and cannot be modified.");
      return;
    }
    localStorage.setItem("mainAffiliateLink", mainLink);
    localStorage.setItem("customServices", JSON.stringify(services));
    
    // Lock links after first save if a main link has been set
    if (mainLink && mainLink.trim() !== "") {
      lockLinks();
      setIsLocked(true);
      toast.success("Links saved and locked permanently!");
    } else {
      window.dispatchEvent(new CustomEvent('servicesUpdated'));
      toast.success("Links saved successfully!");
    }
    onOpenChange(false);
  };

  const handleReset = () => {
    if (isLocked) {
      toast.error("Links are locked and cannot be reset.");
      return;
    }
    setMainLink("");
    const resetServices = services.map(s => ({ ...s, affiliateLink: "" }));
    setServices(resetServices);
    localStorage.removeItem("mainAffiliateLink");
    localStorage.setItem("customServices", JSON.stringify(resetServices));
    toast.success("Links reset to default");
  };

  const handleRemoveService = (index: number) => {
    if (isLocked) {
      toast.error("Services cannot be removed when links are locked.");
      return;
    }
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    localStorage.setItem("customServices", JSON.stringify(updatedServices));
    window.dispatchEvent(new CustomEvent('servicesUpdated'));
    toast.success("Service removed");
  };

  const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || Palette;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        {!isAuthenticated ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                {isSettingPassword ? "Set Admin Password" : "Enter Password"}
              </DialogTitle>
              <DialogDescription>
                {isSettingPassword
                  ? "Create a password to protect your affiliate link management. You'll need this password every time you open this modal."
                  : "Enter your admin password to access link management."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isSettingPassword ? "Create a password (min 6 chars)" : "Enter your password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  className="bg-background"
                  autoFocus
                />
              </div>
              {isSettingPassword && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                    className="bg-background"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handlePasswordSubmit} className="w-full gap-2">
                <Lock className="w-4 h-4" />
                {isSettingPassword ? "Set Password & Continue" : "Unlock"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {isLocked ? <Lock className="w-5 h-5 text-destructive" /> : <Link className="w-5 h-5 text-primary" />}
                {isLocked ? "Links Locked" : "Manage My Links"}
              </DialogTitle>
              <DialogDescription>
                {isLocked 
                  ? "Your affiliate links have been permanently locked and cannot be modified."
                  : "Configure affiliate links for your services. Links will be locked after first save."
                }
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
                    <div className="space-y-2">
                      <Label htmlFor="mainLink" className="text-sm font-medium flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-primary" />
                        Main Affiliate Link
                        <span className="text-xs text-muted-foreground">(Fallback for all services)</span>
                      </Label>
                      <Input
                        id="mainLink"
                        type="url"
                        placeholder="https://go.fiverr.com/visit/?bta=YOUR_ID&brand=fiverrhybrid"
                        value={mainLink}
                        onChange={(e) => !isLocked && setMainLink(e.target.value)}
                        className="bg-background"
                        disabled={isLocked}
                      />
                    </div>

                    {services.length > 0 && (
                      <div className="border-t border-border pt-4 mt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-4">
                          Service-Specific Links (optional)
                        </p>
                      </div>
                    )}

                    {services.map((service, index) => {
                      const IconComponent = getIcon(service.iconName);
                      return (
                        <div key={index} className="space-y-2">
                          <Label htmlFor={`service-${index}`} className="text-sm font-medium flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-primary" />
                            {service.title}
                          </Label>
                          <Input
                            id={`service-${index}`}
                            type="url"
                            placeholder="Leave blank to use main link"
                            value={service.affiliateLink || ""}
                            onChange={(e) => handleServiceLinkChange(index, e.target.value)}
                            className="bg-background"
                            disabled={isLocked}
                          />
                        </div>
                      );
                    })}

                    {services.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground border-t border-border mt-4">
                        <Layers className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No services added yet.</p>
                        <p className="text-xs mt-1">Add services from the Service Library to set individual links.</p>
                      </div>
                    )}
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
                              <p className="text-xs text-muted-foreground truncate">
                                {service.affiliateLink ? "Custom link set" : "Using main link"}
                              </p>
                            </div>
                            {!isLocked && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleRemoveService(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t border-border">
              {isLocked ? (
                <div className="flex items-center gap-2 text-muted-foreground w-full justify-center">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Links are permanently locked</span>
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
                    Reset Links
                  </Button>
                  <Button onClick={handleSave} className="w-full sm:w-auto gap-2">
                    <Save className="w-4 h-4" />
                    Save & Lock Links
                  </Button>
                </>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManageLinksModal;