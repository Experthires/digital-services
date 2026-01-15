import { useEffect, useState } from "react";

const SectionSkeleton = () => (
  <div className="w-full py-16 animate-pulse">
    <div className="container px-4 mx-auto">
      <div className="h-8 bg-muted/50 rounded-lg w-1/3 mx-auto mb-8" />
      <div className="h-4 bg-muted/30 rounded w-2/3 mx-auto mb-4" />
      <div className="h-4 bg-muted/30 rounded w-1/2 mx-auto" />
    </div>
  </div>
);

// Intersection Observer based lazy loading for better performance
export const useLazyLoad = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "100px" }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isVisible };
};

export default SectionSkeleton;
