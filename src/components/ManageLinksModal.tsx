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
import { Save, Link, ExternalLink } from "lucide-react";

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

const ManageLinksModal = ({ open, onOpenChange }: ManageLinksModalProps) => {
  const [links, setLinks] = useState<AffiliateLinks>(defaultLinks);

  useEffect(() => {
    if (open) {
      setLinks(getAffiliateLinks());
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-primary" />
            Manage Affiliate Links
          </DialogTitle>
          <DialogDescription>
            Configure your Fiverr affiliate links for each service category. Leave blank to use the main link as fallback.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
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

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
            Reset All
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
