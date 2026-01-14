import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = "0px",
  delay = 0,
}: UseScrollRevealOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            if (delay > 0) {
              setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay, isVisible]);

  return { ref, isVisible };
};

// Component wrapper for easier use
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur";
  delay?: number;
  duration?: number;
}

export const ScrollReveal = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 600,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ delay });

  const animationStyles: Record<string, { initial: string; animate: string }> = {
    "fade-up": {
      initial: "opacity-0 translate-y-12",
      animate: "opacity-100 translate-y-0",
    },
    "fade-down": {
      initial: "opacity-0 -translate-y-12",
      animate: "opacity-100 translate-y-0",
    },
    "fade-left": {
      initial: "opacity-0 translate-x-12",
      animate: "opacity-100 translate-x-0",
    },
    "fade-right": {
      initial: "opacity-0 -translate-x-12",
      animate: "opacity-100 translate-x-0",
    },
    scale: {
      initial: "opacity-0 scale-90",
      animate: "opacity-100 scale-100",
    },
    blur: {
      initial: "opacity-0 blur-sm",
      animate: "opacity-100 blur-0",
    },
  };

  const { initial, animate } = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className} ${
        isVisible ? animate : initial
      }`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};
