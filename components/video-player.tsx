"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  title?: string;
}

/**
 * High-performance video player with:
 * - Instant playback via preloading
 * - Lazy loading for below-fold videos
 * - Smooth loading states
 * - Error handling with retry
 */
export function VideoPlayer({ src, poster, className, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "playing" | "error">("loading");
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Intersection observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Video loading and playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setProgress((buffered / duration) * 100);
        }
      }
    };

    const handleCanPlay = () => {
      setState("ready");
      // Auto-play when ready
      video.play().then(() => {
        setState("playing");
      }).catch(() => {
        // Autoplay blocked, stay in ready state
        setState("ready");
      });
    };

    const handlePlaying = () => setState("playing");
    const handleError = () => setState("error");

    video.addEventListener("progress", handleProgress);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);

    // Start loading
    video.load();

    return () => {
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
    };
  }, [isInView]);

  const handleRetry = () => {
    setState("loading");
    setProgress(0);
    videoRef.current?.load();
  };

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play().then(() => setState("playing")).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-video bg-muted rounded-xl overflow-hidden group",
        className
      )}
    >
      {/* Loading state */}
      {state === "loading" && isInView && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted z-10">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-3" />
          <p className="text-sm text-muted-foreground">Loading video...</p>
          {progress > 0 && (
            <div className="w-32 h-1 bg-muted-foreground/20 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Placeholder before in view */}
      {!isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          {poster ? (
            <img src={poster} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="text-muted-foreground">Video</div>
          )}
        </div>
      )}

      {/* Error state */}
      {state === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted z-10">
          <p className="text-muted-foreground mb-3">Failed to load video</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Ready state - show play button */}
      {state === "ready" && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/30 z-10 transition-opacity hover:bg-black/40"
        >
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          state === "playing" ? "opacity-100" : "opacity-0"
        )}
        src={isInView ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        controls={state === "playing"}
      />

      {/* Title overlay */}
      {title && state === "playing" && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white font-medium">{title}</p>
        </div>
      )}
    </div>
  );
}
