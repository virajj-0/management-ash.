"use client"

import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, Play, Pause } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Page5() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoLoaded = () => {
    setIsLoaded(true)
  }

  const handleNext = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsExiting(true)
    setTimeout(() => router.push("/page6"), 400)
  }

  const handleBack = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsExiting(true)
    setTimeout(() => router.push("/page4"), 400)
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 flex items-center justify-center p-4 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isExiting ? 'opacity-0 scale-95' : ''}`}>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 max-w-lg w-full shadow-2xl">
        {/* Cute compliment text above */}
        <p 
          className="text-center text-2xl md:text-3xl text-rose-600 mb-4"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          You make ordinary days feel special
        </p>

        {/* Video with smooth playback */}
        <div className="relative w-full aspect-[9/16] bg-gradient-to-br from-rose-200 to-pink-200 rounded-2xl overflow-hidden mb-4">
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-rose-300 border-t-rose-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className={`w-full h-full object-contain bg-black transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onEnded={() => setIsPlaying(false)}
            onCanPlayThrough={handleVideoLoaded}
            onLoadedData={handleVideoLoaded}
            playsInline
            preload="auto"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lv_7615128748286823733_20260420141711-GeuMFxbgWOf7LlQTQiBt7cxHKQzcHB.mp4" type="video/mp4" />
          </video>
          
          {/* Play/Pause overlay */}
          {isLoaded && (
            <button
              onClick={togglePlay}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'bg-transparent' : 'bg-black/20'}`}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100 hover:scale-110'}`}>
                {isPlaying ? (
                  <Pause className="w-8 h-8 md:w-10 md:h-10 text-rose-600" />
                ) : (
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-rose-600 ml-1" />
                )}
              </div>
            </button>
          )}
          
          {/* Placeholder when no video */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-rose-600/60 text-center p-4">Video 4</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-rose-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="group bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  )
}
