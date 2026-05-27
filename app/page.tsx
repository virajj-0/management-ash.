import { OptimizedVideo } from "@/components/optimized-video";
import { VideoPlayer } from "@/components/video-player";

// Sample video URLs - replace with your actual videos
const SAMPLE_VIDEOS = [
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    title: "Big Buck Bunny",
  },
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    title: "Elephants Dream",
  },
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    title: "For Bigger Blazes",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Priority Video */}
      <section className="relative h-screen">
        <OptimizedVideo
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
          poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80"
          className="absolute inset-0 w-full h-full"
          autoPlay
          muted
          loop
          controls={false}
          priority // Loads immediately, no lazy loading
          preload="auto"
        />
        
        {/* Overlay content */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Fast Video Playback
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty">
              Optimized videos that load instantly and play without delay
            </p>
            <a
              href="#videos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
            >
              View More Videos
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section id="videos" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Video Gallery
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Videos load lazily as you scroll, with preloading for smooth playback
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_VIDEOS.map((video, index) => (
              <VideoPlayer
                key={index}
                src={video.src}
                poster={video.poster}
                title={video.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Performance Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Instant Playback"
              description="Priority videos preload immediately for instant playback on page load"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              title="Lazy Loading"
              description="Below-fold videos load only when they enter the viewport"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Error Recovery"
              description="Automatic error handling with retry functionality"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>Optimized Video Player - Built for Performance</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
