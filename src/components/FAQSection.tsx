import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Fiverr work?",
    answer: "Fiverr connects you with talented freelancers worldwide. Simply browse services (called 'Gigs'), choose one that fits your needs, place an order, and communicate directly with your freelancer. You'll receive your completed work within the agreed timeframe."
  },
  {
    question: "Is my payment protected?",
    answer: "Absolutely! Fiverr holds your payment securely until you approve the delivered work. You only release payment when you're 100% satisfied with the results. This ensures complete buyer protection on every transaction."
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer: "Fiverr offers a satisfaction guarantee. If the delivery doesn't match the Gig description, you can request revisions (many Gigs include free revisions) or contact Fiverr's 24/7 customer support for resolution assistance."
  },
  {
    question: "How quickly can I get my project done?",
    answer: "Delivery times vary by service and complexity. Many freelancers offer 24-hour delivery for urgent projects, while standard deliveries typically range from 1-7 days. You'll see the exact delivery time before ordering."
  },
  {
    question: "Are the freelancers vetted and qualified?",
    answer: "Yes! Fiverr freelancers build their reputation through verified reviews, completed orders, and response rates. You can view portfolios, read authentic client reviews, and choose sellers with 'Pro' or 'Top Rated' badges for premium quality."
  },
  {
    question: "Can I communicate with freelancers before ordering?",
    answer: "Definitely! You can message any freelancer before placing an order to discuss your project requirements, ask questions, or request custom quotes. This ensures you find the perfect match for your needs."
  },
  {
    question: "What types of services are available?",
    answer: "Fiverr offers 500+ categories including graphic design, video editing, web development, AI services, content writing, social media marketing, voiceovers, music production, and much more. If you need it, there's a freelancer for it."
  },
  {
    question: "How do I pay for services?",
    answer: "Fiverr accepts all major credit cards, PayPal, Apple Pay, and other secure payment methods. All transactions are encrypted and protected. You're only charged when you place an order, never for browsing."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know before getting started with Fiverr
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 text-base md:text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
