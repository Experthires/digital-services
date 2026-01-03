import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ServicesSection from "@/components/ServicesSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hire Expert Freelancers Fast | Affordable Quality Work Starting at $5</title>
        <meta 
          name="description" 
          content="Access 800,000+ skilled freelancers. Get quality logo design, web development, video editing & AI services delivered in days. Trusted by 4M+ businesses worldwide." 
        />
        <meta name="keywords" content="freelancers, fiverr, logo design, web development, video editing, AI services, hire freelancers, affordable freelance" />
        <link rel="canonical" href="https://yourdomain.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Hire Expert Freelancers Fast | Quality Work Starting at $5" />
        <meta property="og:description" content="Access 800,000+ skilled freelancers for logo design, web development, video editing & more. Trusted by 4M+ businesses." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Hire Expert Freelancers Fast",
            "description": "Access 800,000+ skilled freelancers for logo design, web development, video editing, AI services and more.",
            "mainEntity": {
              "@type": "Service",
              "serviceType": "Freelance Marketplace",
              "provider": {
                "@type": "Organization",
                "name": "Fiverr"
              }
            }
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <ServicesSection />
        <TrustSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
