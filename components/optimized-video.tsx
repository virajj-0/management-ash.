"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  preload?: "auto" | "metadata" | "none";
  playsinline?: boolean;
  priority?: boolean;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: Event) => void;
}

export function OptimizedVideo({
  src,
  poster,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = true,
  preload = "auto",
  playsinline = true,
  priority = false,
  onLoadStart,
  onCanPlay,
  onError,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  // Intersection Observer for lazy loading (skip if priority)
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before it enters viewport
        threshold: 0,
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [priority]);

  // Handle video loading and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    const handleLoadStart = () => {
      onLoadStart?.();
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      onCanPlay?.();

      // Attempt to play immediately when ready
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay was prevented, user interaction needed
          console.log("Autoplay prevented - user interaction required");
        });
      }
    };

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      setHasError(true);
      setIsLoading(false);
      onError?.(e);
    };

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("error", handleError);

    // Force load if video hasn't started loading
    if (video.readyState === 0) {
      video.load();
    }

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("error", handleError);
    };
  }, [isInView, autoPlay, onLoadStart, onCanPlay, onError]);

  // Preload video data for priority videos
  useEffect(() => {
    if (priority && src) {
      // Use link preload for priority videos
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = src;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, []);

  if (hasError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center bg-muted rounded-lg",
          className
        )}
      >
        <p className="text-muted-foreground mb-2">Failed to load video</p>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading video...</span>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        src={isInView ? src : undefined}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        preload={preload}
        playsInline={playsinline}
        // Performance attributes
        disablePictureInPicture={false}
        disableRemotePlayback={false}
      />
    </div>
  );
}
