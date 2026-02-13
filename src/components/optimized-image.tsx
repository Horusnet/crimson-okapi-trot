"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23121a2b'/%3E%3Ccircle cx='32' cy='32' r='32' fill='rgba(34,211,238,0.12)'/%3E%3C/svg%3E";

type OptimizedImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  priority?: boolean;
  placeholder?: string;
  containerClassName?: string;
};

const OptimizedImage = ({
  src,
  priority = false,
  placeholder = DEFAULT_PLACEHOLDER,
  containerClassName,
  className,
  alt = "",
  onLoad,
  ...props
}: OptimizedImageProps) => {
  const [shouldLoad, setShouldLoad] = React.useState(priority);
  const [loaded, setLoaded] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (priority || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "320px",
      },
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, shouldLoad]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoad?.(event);
  };

  const displaySrc = shouldLoad ? src : placeholder;

  return (
    <div ref={wrapperRef} className={cn("relative overflow-hidden", containerClassName)}>
      <img
        {...props}
        src={displaySrc}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition duration-500 ease-out",
          loaded && shouldLoad ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-3xl",
          className,
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default OptimizedImage;