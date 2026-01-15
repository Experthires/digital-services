import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionSkeleton from "@/components/LazySection";

// Lazy load below-the-fold sections for faster initial paint
const BenefitsSection = lazy(() => import("@/components/BenefitsSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const TrustSection = lazy(() => import("@/components/TrustSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const SocialProofBanner = lazy(() => import("@/components/SocialProofBanner"));
const UrgencyBanner = lazy(() => import("@/components/UrgencyBanner"));
const ValuePropositionBanner = lazy(() => import("@/components/ValuePropositionBanner"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));

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
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
        <Suspense fallback={null}>
          <FloatingCTA />
        </Suspense>
        <Navbar />
        <HeroSection />
        
        <Suspense fallback={<SectionSkeleton />}>
          <SocialProofBanner />
          <BenefitsSection />
          <HowItWorksSection />
          <ValuePropositionBanner />
          <ServicesSection />
          <TrustSection />
          <UrgencyBanner />
          <FAQSection />
          <CTASection />
          <Footer />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
