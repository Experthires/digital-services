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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Wrench,
  Zap,
  Star,
  Rocket,
  Target,
  Award,
  type LucideIcon
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icon options for custom services
const iconOptions: { name: string; icon: LucideIcon }[] = [
  { name: "Palette", icon: Palette },
  { name: "Video", icon: Video },
  { name: "Globe", icon: Globe },
  { name: "Sparkles", icon: Sparkles },
  { name: "Share2", icon: Share2 },
  { name: "PenTool", icon: PenTool },
  { name: "Music", icon: Music },
  { name: "Camera", icon: Camera },
  { name: "Mic", icon: Mic },
  { name: "FileText", icon: FileText },
  { name: "Code", icon: Code },
  { name: "Smartphone", icon: Smartphone },
  { name: "TrendingUp", icon: TrendingUp },
  { name: "BarChart", icon: BarChart },
  { name: "Mail", icon: Mail },
  { name: "BookOpen", icon: BookOpen },
  { name: "Gamepad2", icon: Gamepad2 },
  { name: "Building", icon: Building },
  { name: "Users", icon: Users },
  { name: "Heart", icon: Heart },
  { name: "ShoppingCart", icon: ShoppingCart },
  { name: "Briefcase", icon: Briefcase },
  { name: "Megaphone", icon: Megaphone },
  { name: "Film", icon: Film },
  { name: "Layers", icon: Layers },
  { name: "Box", icon: Box },
  { name: "Paintbrush", icon: Paintbrush },
  { name: "Wrench", icon: Wrench },
  { name: "Zap", icon: Zap },
  { name: "Star", icon: Star },
  { name: "Rocket", icon: Rocket },
  { name: "Target", icon: Target },
  { name: "Award", icon: Award },
];

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
      { icon: Sparkles, iconName: "Sparkles", title: "AI Chatbot Development", description: "Never miss a lead. 24/7 chatbots that close sales while you sleep.", price: "Starting at $100", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Image Generation", description: "Unlimited creativity, zero stock photo fees. Unique visuals in seconds.", price: "Starting at $15", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Content Writing", description: "Writer's block? Gone. Publish 10x more content without burning out.", price: "Starting at $10", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "Machine Learning", description: "Predict. Automate. Dominate. Custom ML that gives you the edge.", price: "Starting at $200", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Voice Synthesis", description: "One voice, infinite languages. Professional audio without the studio.", price: "Starting at $25", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Video Generation", description: "No camera? No problem. Create stunning videos from just a prompt.", price: "Starting at $50", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "ChatGPT Prompt Engineering", description: "Get 10x better AI outputs. Prompts that actually deliver results.", price: "Starting at $20", popular: true },
      { icon: Sparkles, iconName: "Sparkles", title: "AI Automation", description: "Fire the boring tasks. Workflows that run themselves 24/7.", price: "Starting at $75", popular: true },
    ]
  },
  {
    name: "Animation",
    icon: Film,
    services: [
      { icon: Film, iconName: "Film", title: "2D Animation", description: "Stories that stick. Animated content people actually remember.", price: "Starting at $50", popular: true },
      { icon: Film, iconName: "Film", title: "3D Animation", description: "Mind-blowing visuals. The 'wow factor' your competitors lack.", price: "Starting at $100", popular: true },
      { icon: Film, iconName: "Film", title: "Whiteboard Animation", description: "Explain anything in 60 seconds. Complex ideas made simple.", price: "Starting at $25", popular: true },
      { icon: Film, iconName: "Film", title: "Character Animation", description: "Characters that connect. Build emotional bonds with your audience.", price: "Starting at $75", popular: false },
      { icon: Film, iconName: "Film", title: "Logo Animation", description: "Static logos are forgettable. Make yours move and mesmerize.", price: "Starting at $15", popular: true },
      { icon: Film, iconName: "Film", title: "Motion Graphics", description: "Scroll-stopping visuals. Graphics that demand attention.", price: "Starting at $40", popular: true },
      { icon: Film, iconName: "Film", title: "Lottie Animation", description: "Lightweight magic. Web animations that load instantly.", price: "Starting at $30", popular: false },
    ]
  },
  {
    name: "Architecture & Design",
    icon: Building,
    services: [
      { icon: Building, iconName: "Building", title: "Architectural Rendering", description: "Sell before you build. Photorealistic visuals that close deals.", price: "Starting at $50", popular: true },
      { icon: Building, iconName: "Building", title: "Floor Plans", description: "Visualize every square foot. Plans that impress clients instantly.", price: "Starting at $25", popular: true },
      { icon: Building, iconName: "Building", title: "Interior Design", description: "Transform any space. Designs that wow before the first nail drops.", price: "Starting at $40", popular: true },
      { icon: Building, iconName: "Building", title: "Landscape Design", description: "Curb appeal that sells. Outdoor spaces buyers can't resist.", price: "Starting at $35", popular: false },
      { icon: Building, iconName: "Building", title: "3D Modeling", description: "See it before it exists. Models so real, clients sign on the spot.", price: "Starting at $60", popular: true },
    ]
  },
  {
    name: "Branding & Identity",
    icon: Palette,
    services: [
      { icon: Palette, iconName: "Palette", title: "Logo Design", description: "Be unforgettable. A logo that makes competitors jealous.", price: "Starting at $5", popular: true },
      { icon: Paintbrush, iconName: "Paintbrush", title: "Brand Style Guides", description: "Consistency = trust. Never second-guess your brand again.", price: "Starting at $50", popular: true },
      { icon: Palette, iconName: "Palette", title: "Business Cards", description: "Leave a mark. Cards people actually keep in their wallet.", price: "Starting at $10", popular: true },
      { icon: Palette, iconName: "Palette", title: "Letterhead Design", description: "Look legit. Professional stationery that commands respect.", price: "Starting at $15", popular: false },
      { icon: Palette, iconName: "Palette", title: "Brand Naming", description: "The name that sticks. Names people can't stop saying.", price: "Starting at $50", popular: true },
      { icon: Palette, iconName: "Palette", title: "Merchandise Design", description: "Walking billboards. Merch your fans will actually wear.", price: "Starting at $20", popular: true },
    ]
  },
  {
    name: "Business Consulting",
    icon: Briefcase,
    services: [
      { icon: Briefcase, iconName: "Briefcase", title: "Business Plans", description: "Get funded faster. Plans that make investors say 'yes.'", price: "Starting at $100", popular: true },
      { icon: BarChart, iconName: "BarChart", title: "Market Research", description: "Know before you go. Data that eliminates costly guesswork.", price: "Starting at $50", popular: true },
      { icon: Briefcase, iconName: "Briefcase", title: "Financial Consulting", description: "Stop leaving money on the table. Strategies that boost your bottom line.", price: "Starting at $75", popular: false },
      { icon: Users, iconName: "Users", title: "HR Consulting", description: "Hire right, fire less. Build teams that actually perform.", price: "Starting at $50", popular: false },
      { icon: Briefcase, iconName: "Briefcase", title: "Startup Consulting", description: "Skip the rookie mistakes. Launch faster with proven strategies.", price: "Starting at $60", popular: true },
      { icon: Briefcase, iconName: "Briefcase", title: "Pitch Deck Creation", description: "Decks that close deals. Investors can't look away.", price: "Starting at $80", popular: true },
    ]
  },
  {
    name: "Copywriting",
    icon: PenTool,
    services: [
      { icon: PenTool, iconName: "PenTool", title: "Sales Copy", description: "Words that print money. Copy so good, wallets open themselves.", price: "Starting at $10", popular: true },
      { icon: PenTool, iconName: "PenTool", title: "Ad Copy", description: "Clicks that convert. Ads your competitors wish they wrote.", price: "Starting at $15", popular: true },
      { icon: PenTool, iconName: "PenTool", title: "Website Copy", description: "Visitors stay. Bounce rates drop. Sales skyrocket.", price: "Starting at $20", popular: true },
      { icon: PenTool, iconName: "PenTool", title: "Product Descriptions", description: "Features tell, benefits sell. Descriptions that move inventory.", price: "Starting at $5", popular: true },
      { icon: PenTool, iconName: "PenTool", title: "UX Writing", description: "Confusion kills conversions. Crystal-clear copy that guides users.", price: "Starting at $25", popular: false },
      { icon: PenTool, iconName: "PenTool", title: "Email Copy", description: "Open rates through the roof. Emails that actually get read.", price: "Starting at $15", popular: true },
    ]
  },
  {
    name: "Crypto & NFT",
    icon: TrendingUp,
    services: [
      { icon: TrendingUp, iconName: "TrendingUp", title: "NFT Art Creation", description: "Art that appreciates. Collections that sell out in minutes.", price: "Starting at $50", popular: true },
      { icon: Code, iconName: "Code", title: "Smart Contract Development", description: "Bulletproof code. Contracts that handle millions securely.", price: "Starting at $200", popular: true },
      { icon: TrendingUp, iconName: "TrendingUp", title: "Crypto Marketing", description: "Cut through the noise. Marketing that builds real communities.", price: "Starting at $100", popular: false },
      { icon: TrendingUp, iconName: "TrendingUp", title: "Tokenomics Design", description: "Economics that work. Token models that retain value.", price: "Starting at $150", popular: false },
      { icon: Globe, iconName: "Globe", title: "Web3 Development", description: "Build the future. dApps that users actually trust.", price: "Starting at $300", popular: true },
    ]
  },
  {
    name: "Data Analysis",
    icon: BarChart,
    services: [
      { icon: BarChart, iconName: "BarChart", title: "Data Visualization", description: "Data that tells stories. Charts that make decisions obvious.", price: "Starting at $25", popular: true },
      { icon: BarChart, iconName: "BarChart", title: "Excel/Spreadsheets", description: "Spreadsheets on steroids. Automation that saves hours daily.", price: "Starting at $15", popular: true },
      { icon: BarChart, iconName: "BarChart", title: "Power BI/Tableau", description: "Dashboards that impress. Real-time insights at a glance.", price: "Starting at $50", popular: true },
      { icon: BarChart, iconName: "BarChart", title: "Statistical Analysis", description: "Numbers don't lie. Analysis that predicts what's next.", price: "Starting at $40", popular: false },
      { icon: BarChart, iconName: "BarChart", title: "Python Data Analysis", description: "Unlock hidden patterns. Insights your competitors miss.", price: "Starting at $35", popular: true },
    ]
  },
  {
    name: "Digital Marketing",
    icon: Megaphone,
    services: [
      { icon: Megaphone, iconName: "Megaphone", title: "Google Ads", description: "Show up first. Ads that capture buyers the moment they search.", price: "Starting at $50", popular: true },
      { icon: Megaphone, iconName: "Megaphone", title: "Facebook Ads", description: "Find your people. Targeting so precise, it feels like magic.", price: "Starting at $40", popular: true },
      { icon: Megaphone, iconName: "Megaphone", title: "TikTok Marketing", description: "Go viral, go big. Strategies that break the algorithm.", price: "Starting at $30", popular: true },
      { icon: Megaphone, iconName: "Megaphone", title: "Marketing Strategy", description: "Stop guessing. Roadmaps that turn ad spend into profit.", price: "Starting at $100", popular: true },
      { icon: Megaphone, iconName: "Megaphone", title: "Affiliate Marketing", description: "Others sell for you. Programs that grow revenue on autopilot.", price: "Starting at $75", popular: false },
      { icon: Megaphone, iconName: "Megaphone", title: "Conversion Optimization", description: "Same traffic, more sales. Tweaks that double your revenue.", price: "Starting at $60", popular: true },
    ]
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    services: [
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Shopify Store", description: "Launch in days, not months. Stores built to convert from day one.", price: "Starting at $100", popular: true },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "WooCommerce", description: "WordPress meets revenue. E-commerce that scales with you.", price: "Starting at $75", popular: true },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Amazon Store", description: "Tap into millions. Storefronts that dominate search results.", price: "Starting at $50", popular: true },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Product Listings", description: "Listings that sell themselves. Titles and bullets that convert.", price: "Starting at $10", popular: true },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Dropshipping Setup", description: "No inventory, no problem. Start selling with zero upfront risk.", price: "Starting at $80", popular: true },
      { icon: ShoppingCart, iconName: "ShoppingCart", title: "Etsy Store Setup", description: "Stand out in the crowd. Shops that attract passionate buyers.", price: "Starting at $40", popular: true },
    ]
  },
  {
    name: "Email Marketing",
    icon: Mail,
    services: [
      { icon: Mail, iconName: "Mail", title: "Email Campaigns", description: "Inbox money machine. Campaigns that turn subscribers into buyers.", price: "Starting at $30", popular: true },
      { icon: Mail, iconName: "Mail", title: "Newsletter Design", description: "Emails people actually open. Designs that boost click-through rates.", price: "Starting at $20", popular: true },
      { icon: Mail, iconName: "Mail", title: "Automation Setup", description: "Set it and forget it. Sequences that nurture leads on autopilot.", price: "Starting at $50", popular: true },
      { icon: Mail, iconName: "Mail", title: "Cold Email Outreach", description: "Land in inboxes, not spam. Cold emails that get responses.", price: "Starting at $25", popular: true },
      { icon: Mail, iconName: "Mail", title: "Klaviyo Setup", description: "E-commerce email mastery. Flows that recover abandoned carts.", price: "Starting at $60", popular: false },
    ]
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    services: [
      { icon: Gamepad2, iconName: "Gamepad2", title: "Game Development", description: "Dreams become playable. Games that keep players coming back.", price: "Starting at $200", popular: true },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Game Art", description: "Art that immerses. Assets that make your game unforgettable.", price: "Starting at $50", popular: true },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Game Coaching", description: "Level up fast. Pro strategies that crush the competition.", price: "Starting at $15", popular: true },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Streaming Setup", description: "Look pro from day one. Setups that attract followers.", price: "Starting at $25", popular: true },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Roblox Development", description: "Build the next hit. Experiences players won't stop sharing.", price: "Starting at $100", popular: true },
      { icon: Gamepad2, iconName: "Gamepad2", title: "Unity Development", description: "Powerful games, smooth performance. Unity done right.", price: "Starting at $150", popular: false },
    ]
  },
  {
    name: "Graphics & Design",
    icon: Palette,
    services: [
      { icon: Layers, iconName: "Layers", title: "Illustration", description: "Art that stops thumbs. Custom visuals that tell your story.", price: "Starting at $10", popular: true },
      { icon: Box, iconName: "Box", title: "Packaging Design", description: "Shelf appeal that sells. Packaging buyers can't resist picking up.", price: "Starting at $30", popular: true },
      { icon: FileText, iconName: "FileText", title: "Flyer Design", description: "Print that performs. Flyers people actually keep.", price: "Starting at $5", popular: true },
      { icon: Camera, iconName: "Camera", title: "Photo Editing", description: "Good to gorgeous. Photos that look magazine-ready.", price: "Starting at $5", popular: true },
      { icon: Palette, iconName: "Palette", title: "Infographics", description: "Data made beautiful. Complex info in shareable visuals.", price: "Starting at $20", popular: true },
      { icon: Palette, iconName: "Palette", title: "Icon Design", description: "Tiny but mighty. Icons that elevate your entire brand.", price: "Starting at $15", popular: false },
      { icon: Palette, iconName: "Palette", title: "Social Media Graphics", description: "Scroll-stopping content. Posts that earn saves and shares.", price: "Starting at $10", popular: true },
      { icon: Palette, iconName: "Palette", title: "Presentation Design", description: "Boring slides are dead. Decks that keep audiences awake.", price: "Starting at $25", popular: true },
    ]
  },
  {
    name: "Health & Fitness",
    icon: Heart,
    services: [
      { icon: Heart, iconName: "Heart", title: "Personal Training", description: "Results, not excuses. Plans that actually transform bodies.", price: "Starting at $25", popular: true },
      { icon: Heart, iconName: "Heart", title: "Nutrition Plans", description: "Eat smarter, not less. Diets that fuel peak performance.", price: "Starting at $30", popular: true },
      { icon: Heart, iconName: "Heart", title: "Fitness App Development", description: "Your brand in their pocket. Apps users open daily.", price: "Starting at $200", popular: false },
      { icon: Heart, iconName: "Heart", title: "Wellness Coaching", description: "Mind and body aligned. Guidance that changes lives.", price: "Starting at $40", popular: false },
    ]
  },
  {
    name: "Illustration",
    icon: Layers,
    services: [
      { icon: Layers, iconName: "Layers", title: "Digital Illustration", description: "Pixels with personality. Art that makes your brand pop.", price: "Starting at $20", popular: true },
      { icon: Layers, iconName: "Layers", title: "Book Illustration", description: "Pages that captivate. Art that makes readers linger.", price: "Starting at $50", popular: true },
      { icon: Layers, iconName: "Layers", title: "Character Design", description: "Characters people love. Designs that become iconic.", price: "Starting at $30", popular: true },
      { icon: Layers, iconName: "Layers", title: "Portraits", description: "Faces that connect. Portraits with soul and style.", price: "Starting at $15", popular: true },
      { icon: Layers, iconName: "Layers", title: "Comics & Manga", description: "Stories that grip. Visual narratives fans devour.", price: "Starting at $25", popular: true },
      { icon: Layers, iconName: "Layers", title: "Children's Book Art", description: "Magic on every page. Art that sparks young imaginations.", price: "Starting at $40", popular: true },
    ]
  },
  {
    name: "Legal Services",
    icon: FileText,
    services: [
      { icon: FileText, iconName: "FileText", title: "Contract Drafting", description: "Protected, not exposed. Contracts that cover all your bases.", price: "Starting at $50", popular: true },
      { icon: FileText, iconName: "FileText", title: "Legal Consulting", description: "Stay out of trouble. Expert advice before problems start.", price: "Starting at $75", popular: false },
      { icon: FileText, iconName: "FileText", title: "Trademark Filing", description: "Own your name. Protection that secures your brand forever.", price: "Starting at $100", popular: true },
      { icon: FileText, iconName: "FileText", title: "Terms & Policies", description: "Legally bulletproof. Policies that keep you compliant.", price: "Starting at $30", popular: true },
      { icon: FileText, iconName: "FileText", title: "NDA Drafting", description: "Secrets stay secret. Airtight agreements that protect.", price: "Starting at $25", popular: false },
    ]
  },
  {
    name: "Lifestyle",
    icon: Heart,
    services: [
      { icon: Heart, iconName: "Heart", title: "Life Coaching", description: "Stuck to unstoppable. Clarity that changes everything.", price: "Starting at $50", popular: true },
      { icon: Heart, iconName: "Heart", title: "Career Coaching", description: "Land the dream job. Strategies that fast-track promotions.", price: "Starting at $40", popular: true },
      { icon: Heart, iconName: "Heart", title: "Relationship Advice", description: "Get more matches. Profiles that attract the right people.", price: "Starting at $20", popular: false },
      { icon: Heart, iconName: "Heart", title: "Astrology Readings", description: "Written in the stars. Insights that illuminate your path.", price: "Starting at $15", popular: true },
    ]
  },
  {
    name: "Mobile App Development",
    icon: Smartphone,
    services: [
      { icon: Smartphone, iconName: "Smartphone", title: "iOS App Development", description: "App Store ready. Apps that users rate 5 stars.", price: "Starting at $500", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "Android App Development", description: "Play Store success. Apps that dominate downloads.", price: "Starting at $400", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "React Native Apps", description: "One codebase, two stores. Ship faster, save money.", price: "Starting at $300", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "Flutter Apps", description: "Beautiful on every device. Pixel-perfect performance.", price: "Starting at $350", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "App UI/UX Design", description: "Tap-worthy interfaces. Designs users actually understand.", price: "Starting at $100", popular: true },
      { icon: Smartphone, iconName: "Smartphone", title: "App Store Optimization", description: "Get discovered first. Rankings that drive organic installs.", price: "Starting at $50", popular: true },
    ]
  },
  {
    name: "Music & Audio",
    icon: Music,
    services: [
      { icon: Music, iconName: "Music", title: "Music Production", description: "Hits from scratch. Beats that get stuck in heads.", price: "Starting at $50", popular: true },
      { icon: Mic, iconName: "Mic", title: "Voice Over", description: "Voices that sell. Pro narration in any tone or accent.", price: "Starting at $10", popular: true },
      { icon: Music, iconName: "Music", title: "Mixing & Mastering", description: "Radio-ready sound. Mixes that compete with the pros.", price: "Starting at $30", popular: true },
      { icon: Music, iconName: "Music", title: "Podcast Editing", description: "Sound like a pro. Edits that keep listeners subscribed.", price: "Starting at $20", popular: true },
      { icon: Music, iconName: "Music", title: "Sound Effects", description: "Audio that immerses. Custom sounds that elevate content.", price: "Starting at $15", popular: false },
      { icon: Music, iconName: "Music", title: "Jingles & Intros", description: "Audio branding that sticks. 5 seconds = instant recognition.", price: "Starting at $25", popular: true },
      { icon: Music, iconName: "Music", title: "Song Writing", description: "Melodies that move. Songs people can't stop humming.", price: "Starting at $40", popular: true },
    ]
  },
  {
    name: "Photography",
    icon: Camera,
    services: [
      { icon: Camera, iconName: "Camera", title: "Product Photography", description: "Products that pop. Photos that make 'Add to Cart' irresistible.", price: "Starting at $10", popular: true },
      { icon: Camera, iconName: "Camera", title: "Photo Retouching", description: "Flawless without filters. Edits so good, no one can tell.", price: "Starting at $5", popular: true },
      { icon: Camera, iconName: "Camera", title: "Background Removal", description: "Clean cuts, fast turnaround. Perfect isolation every time.", price: "Starting at $3", popular: true },
      { icon: Camera, iconName: "Camera", title: "Photo Restoration", description: "Memories saved. Damaged photos brought back to life.", price: "Starting at $15", popular: true },
      { icon: Camera, iconName: "Camera", title: "Photo Manipulation", description: "Reality, reimagined. Composites that blow minds.", price: "Starting at $20", popular: true },
    ]
  },
  {
    name: "Programming & Tech",
    icon: Code,
    services: [
      { icon: Globe, iconName: "Globe", title: "Web Development", description: "Fast sites = more sales. Code that converts and scales.", price: "Starting at $50", popular: true },
      { icon: Code, iconName: "Code", title: "WordPress Development", description: "WordPress, but better. Sites you can actually manage.", price: "Starting at $30", popular: true },
      { icon: Code, iconName: "Code", title: "API Development", description: "Systems that talk. Integrations that just work.", price: "Starting at $75", popular: true },
      { icon: Code, iconName: "Code", title: "Database Design", description: "Data that flows. Architecture built for speed.", price: "Starting at $50", popular: false },
      { icon: Code, iconName: "Code", title: "Bug Fixing", description: "Bugs squashed fast. Issues fixed before users notice.", price: "Starting at $20", popular: true },
      { icon: Code, iconName: "Code", title: "Automation Scripts", description: "Hours saved daily. Scripts that do the boring stuff.", price: "Starting at $30", popular: true },
      { icon: Code, iconName: "Code", title: "Cybersecurity", description: "Sleep easy tonight. Security that keeps hackers out.", price: "Starting at $100", popular: true },
    ]
  },
  {
    name: "SEO Services",
    icon: TrendingUp,
    services: [
      { icon: TrendingUp, iconName: "TrendingUp", title: "SEO Optimization", description: "Page one or bust. Rankings that bring free traffic forever.", price: "Starting at $50", popular: true },
      { icon: TrendingUp, iconName: "TrendingUp", title: "Keyword Research", description: "Find the gold. Keywords your competitors missed.", price: "Starting at $25", popular: true },
      { icon: TrendingUp, iconName: "TrendingUp", title: "Link Building", description: "Authority that compounds. Links that boost rankings.", price: "Starting at $75", popular: true },
      { icon: TrendingUp, iconName: "TrendingUp", title: "Local SEO", description: "Own your city. Show up when locals search.", price: "Starting at $40", popular: true },
      { icon: TrendingUp, iconName: "TrendingUp", title: "SEO Audit", description: "Find the leaks. Audits that reveal hidden opportunities.", price: "Starting at $35", popular: true },
      { icon: TrendingUp, iconName: "TrendingUp", title: "YouTube SEO", description: "Videos that rank. Thumbnails and titles that get clicks.", price: "Starting at $30", popular: true },
    ]
  },
  {
    name: "Social Media",
    icon: Share2,
    services: [
      { icon: Share2, iconName: "Share2", title: "Social Media Management", description: "Consistent presence, zero stress. Growth on autopilot.", price: "Starting at $50", popular: true },
      { icon: Share2, iconName: "Share2", title: "Content Creation", description: "Posts that perform. Content your audience actually wants.", price: "Starting at $20", popular: true },
      { icon: Share2, iconName: "Share2", title: "Influencer Marketing", description: "Borrow their audience. Partnerships that pay off big.", price: "Starting at $100", popular: true },
      { icon: Share2, iconName: "Share2", title: "Social Media Ads", description: "Targeted reach, real results. Ads that find buyers.", price: "Starting at $30", popular: true },
      { icon: Share2, iconName: "Share2", title: "Community Management", description: "Fans, not followers. Communities that champion your brand.", price: "Starting at $40", popular: false },
      { icon: Share2, iconName: "Share2", title: "TikTok Content", description: "Virality on demand. Videos the algorithm loves.", price: "Starting at $25", popular: true },
      { icon: Share2, iconName: "Share2", title: "Instagram Growth", description: "Real followers, real engagement. Growth that sticks.", price: "Starting at $35", popular: true },
    ]
  },
  {
    name: "Translation",
    icon: Globe,
    services: [
      { icon: Globe, iconName: "Globe", title: "Document Translation", description: "Lost in translation? Never. Accurate in 100+ languages.", price: "Starting at $5", popular: true },
      { icon: Globe, iconName: "Globe", title: "Website Localization", description: "Go global overnight. Sites that speak every customer's language.", price: "Starting at $50", popular: true },
      { icon: Globe, iconName: "Globe", title: "Subtitles & Captions", description: "Reach everyone. Videos that work without sound.", price: "Starting at $10", popular: true },
      { icon: Globe, iconName: "Globe", title: "Transcription", description: "Every word captured. Audio to text with perfect accuracy.", price: "Starting at $10", popular: true },
      { icon: Globe, iconName: "Globe", title: "Book Translation", description: "Stories without borders. Novels that travel the world.", price: "Starting at $100", popular: false },
    ]
  },
  {
    name: "UI/UX Design",
    icon: Layers,
    services: [
      { icon: Layers, iconName: "Layers", title: "Website Design", description: "Designs that convert. Interfaces users actually enjoy.", price: "Starting at $100", popular: true },
      { icon: Layers, iconName: "Layers", title: "App UI Design", description: "Tap, swipe, love. Mobile experiences that feel natural.", price: "Starting at $75", popular: true },
      { icon: Layers, iconName: "Layers", title: "Landing Page Design", description: "One page, one goal. Designs built to convert.", price: "Starting at $50", popular: true },
      { icon: Layers, iconName: "Layers", title: "Wireframing", description: "Plan before you build. Prototypes that save dev time.", price: "Starting at $30", popular: true },
      { icon: Layers, iconName: "Layers", title: "Design Systems", description: "Scale without chaos. Systems your whole team can use.", price: "Starting at $150", popular: false },
      { icon: Layers, iconName: "Layers", title: "Figma Design", description: "Pixel-perfect handoffs. Designs developers actually love.", price: "Starting at $40", popular: true },
    ]
  },
  {
    name: "Video Production",
    icon: Video,
    services: [
      { icon: Video, iconName: "Video", title: "Video Editing", description: "Raw to remarkable. Edits that keep viewers watching.", price: "Starting at $10", popular: true },
      { icon: Video, iconName: "Video", title: "Explainer Videos", description: "Confusing to clear. 60 seconds that explain everything.", price: "Starting at $50", popular: true },
      { icon: Video, iconName: "Video", title: "Promotional Videos", description: "Hype that sells. Promos your audience will share.", price: "Starting at $75", popular: true },
      { icon: Video, iconName: "Video", title: "YouTube Videos", description: "Subscribers on autopilot. Content that builds channels.", price: "Starting at $25", popular: true },
      { icon: Video, iconName: "Video", title: "Short Form Video", description: "Hook in 1 second. Shorts that rack up millions of views.", price: "Starting at $15", popular: true },
      { icon: Video, iconName: "Video", title: "Product Videos", description: "Features come alive. Videos that close the sale.", price: "Starting at $40", popular: true },
      { icon: Video, iconName: "Video", title: "Testimonial Videos", description: "Trust on camera. Social proof that wins customers.", price: "Starting at $30", popular: true },
    ]
  },
  {
    name: "Virtual Assistant",
    icon: Users,
    services: [
      { icon: Users, iconName: "Users", title: "Administrative Support", description: "Inbox zero, finally. Assistants who handle the chaos.", price: "Starting at $10", popular: true },
      { icon: Users, iconName: "Users", title: "Data Entry", description: "Accurate and fast. Data done right the first time.", price: "Starting at $5", popular: true },
      { icon: Users, iconName: "Users", title: "Customer Service", description: "Happy customers, loyal customers. Support that shines.", price: "Starting at $15", popular: true },
      { icon: Users, iconName: "Users", title: "Research", description: "Deep dives delivered. Research that gives you the edge.", price: "Starting at $20", popular: true },
      { icon: Users, iconName: "Users", title: "Calendar Management", description: "Never double-book again. Schedules that run smoothly.", price: "Starting at $10", popular: false },
      { icon: Users, iconName: "Users", title: "Lead Generation", description: "Qualified leads, not cold contacts. Prospects ready to buy.", price: "Starting at $25", popular: true },
    ]
  },
  {
    name: "Web Design",
    icon: Globe,
    services: [
      { icon: Globe, iconName: "Globe", title: "Custom Website Design", description: "Stand out online. Designs that make competitors nervous.", price: "Starting at $100", popular: true },
      { icon: Globe, iconName: "Globe", title: "WordPress Design", description: "WordPress done right. Sites that load fast and look great.", price: "Starting at $50", popular: true },
      { icon: Globe, iconName: "Globe", title: "Webflow Design", description: "No-code power. Sites that impress without developers.", price: "Starting at $75", popular: true },
      { icon: Globe, iconName: "Globe", title: "Squarespace Design", description: "Elegance made easy. Beautiful sites you can manage.", price: "Starting at $60", popular: false },
      { icon: Globe, iconName: "Globe", title: "Website Redesign", description: "Outdated to outstanding. Refreshes that boost results.", price: "Starting at $80", popular: true },
      { icon: Globe, iconName: "Globe", title: "Wix Website", description: "Simple but stunning. Wix sites that punch above their weight.", price: "Starting at $40", popular: true },
    ]
  },
  {
    name: "Writing & Content",
    icon: BookOpen,
    services: [
      { icon: BookOpen, iconName: "BookOpen", title: "Blog Writing", description: "SEO-optimized blog posts.", price: "Starting at $15", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "eBook Writing", description: "Complete eBook writing services.", price: "Starting at $100", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "Article Writing", description: "High-quality article content.", price: "Starting at $10", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "Ghostwriting", description: "Professional ghostwriting services.", price: "Starting at $50", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "Resume Writing", description: "Professional resumes that get interviews.", price: "Starting at $25", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "Script Writing", description: "Video and podcast scripts.", price: "Starting at $30", popular: true },
      { icon: BookOpen, iconName: "BookOpen", title: "Grant Writing", description: "Winning grant proposals.", price: "Starting at $75", popular: false },
      { icon: BookOpen, iconName: "BookOpen", title: "Speech Writing", description: "Memorable speeches for any occasion.", price: "Starting at $35", popular: false },
    ]
  },
];

const ServiceLibraryModal = ({ open, onOpenChange, onAddService }: ServiceLibraryModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("library");
  
  // Custom service form state
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("Sparkles");
  const [isPopular, setIsPopular] = useState(false);

  const existingCategories = serviceLibrary.map(cat => cat.name);

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

  const handleAddCustomService = () => {
    if (!customTitle.trim()) {
      toast.error("Please enter a service title");
      return;
    }
    if (!customDescription.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!customPrice.trim()) {
      toast.error("Please enter a price");
      return;
    }
    
    const finalCategory = isNewCategory ? customCategoryInput.trim() : customCategory;
    if (!finalCategory) {
      toast.error("Please select or enter a category");
      return;
    }

    const selectedIconData = iconOptions.find(opt => opt.name === selectedIcon) || iconOptions[0];
    
    const newService: ServiceItem = {
      icon: selectedIconData.icon,
      iconName: selectedIcon,
      title: customTitle.trim(),
      description: customDescription.trim(),
      price: customPrice.trim().startsWith("Starting at") ? customPrice.trim() : `Starting at ${customPrice.trim()}`,
      popular: isPopular,
      category: finalCategory,
    };

    onAddService(newService);
    toast.success(`${newService.title} added to your services!`);
    
    // Reset form
    setCustomTitle("");
    setCustomDescription("");
    setCustomPrice("");
    setCustomCategory("");
    setCustomCategoryInput("");
    setIsNewCategory(false);
    setSelectedIcon("Sparkles");
    setIsPopular(false);
    setActiveTab("library");
  };

  const scrollToCategory = (categoryName: string) => {
    setSelectedCategory(null);
    setTimeout(() => {
      const element = document.getElementById(`category-${categoryName.replace(/\s+/g, '-').toLowerCase()}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Layers className="w-5 h-5 text-primary" />
            Service Library
          </DialogTitle>
          <DialogDescription>
            Browse existing services or create your own custom service.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-6 border-b border-border">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="library">Browse Library</TabsTrigger>
              <TabsTrigger value="custom">Create Custom</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="library" className="m-0">
            <div className="px-6 py-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
            </div>

            <div className="flex h-[50vh]">
              {/* Sticky Category Sidebar */}
              <div className="w-56 shrink-0 border-r border-border bg-muted/30">
                <ScrollArea className="h-full">
                  <div className="p-3 space-y-1">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === null 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      All Categories
                    </button>
                    
                    {serviceLibrary.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => scrollToCategory(category.name)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                          selectedCategory === category.name 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <category.icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Main Content Area */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-8">
                  {filteredLibrary.map((category) => (
                    <div 
                      key={category.name} 
                      id={`category-${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <h3 className="flex items-center gap-2 font-semibold text-lg mb-4 sticky top-0 bg-background py-2 z-10">
                        <category.icon className="w-5 h-5 text-primary" />
                        {category.name}
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          </TabsContent>

          <TabsContent value="custom" className="m-0">
            <ScrollArea className="h-[55vh]">
              <div className="p-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Service Title */}
                  <div className="space-y-2">
                    <Label htmlFor="customTitle">Service Title *</Label>
                    <Input
                      id="customTitle"
                      placeholder="e.g., Custom Logo Design"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="customPrice">Price *</Label>
                    <Input
                      id="customPrice"
                      placeholder="e.g., $25 or Starting at $25"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="customDescription">Description *</Label>
                  <Textarea
                    id="customDescription"
                    placeholder="Describe your service..."
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Category *</Label>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="newCategory" className="text-sm text-muted-foreground">Create new</Label>
                      <Switch
                        id="newCategory"
                        checked={isNewCategory}
                        onCheckedChange={setIsNewCategory}
                      />
                    </div>
                  </div>
                  
                  {isNewCategory ? (
                    <Input
                      placeholder="Enter new category name..."
                      value={customCategoryInput}
                      onChange={(e) => setCustomCategoryInput(e.target.value)}
                    />
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      {existingCategories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCustomCategory(cat)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors text-left truncate ${
                            customCategory === cat
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-card border-border hover:border-primary/50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Icon Selection */}
                <div className="space-y-3">
                  <Label>Select Icon</Label>
                  <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                    {iconOptions.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setSelectedIcon(option.name)}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedIcon === option.name
                            ? 'bg-primary text-primary-foreground border-primary scale-110'
                            : 'bg-card border-border hover:border-primary/50'
                        }`}
                      >
                        <option.icon className="w-5 h-5 mx-auto" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                  <div>
                    <Label htmlFor="popular" className="font-medium">Mark as Popular</Label>
                    <p className="text-sm text-muted-foreground">Display a "Popular" badge on this service</p>
                  </div>
                  <Switch
                    id="popular"
                    checked={isPopular}
                    onCheckedChange={setIsPopular}
                  />
                </div>

                {/* Preview Card */}
                {customTitle && (
                  <div className="space-y-3">
                    <Label>Preview</Label>
                    <div className="relative p-4 rounded-xl bg-card border border-border max-w-md">
                      {isPopular && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">
                          Popular
                        </span>
                      )}
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          {(() => {
                            const IconComponent = iconOptions.find(opt => opt.name === selectedIcon)?.icon || Sparkles;
                            return <IconComponent className="w-5 h-5 text-primary" />;
                          })()}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1">
                            {customTitle || "Service Title"}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {customDescription || "Service description..."}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            {customPrice ? (customPrice.startsWith("Starting at") ? customPrice : `Starting at ${customPrice}`) : "Starting at $X"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  onClick={handleAddCustomService} 
                  className="w-full"
                  size="lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Service
                </Button>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceLibraryModal;
export { serviceLibrary, iconOptions };
