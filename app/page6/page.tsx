"use client"

import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Page6() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleNext = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsExiting(true)
    setTimeout(() => router.push("/page7"), 400)
  }

  const handleBack = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsExiting(true)
    setTimeout(() => router.push("/page5"), 400)
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isExiting ? 'opacity-0 scale-95' : ''}`}>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 max-w-lg w-full shadow-2xl">
        <p 
          className="text-center text-2xl md:text-3xl text-violet-600 mb-4"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          Having you as my bestie is my superpower
        </p>

        <div className="relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden mb-4">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lv_7539148452014345525_20260420142502-oXepwPI9ZzjOojeZh7B6xM6KyHJzwm.mp4" type="video/mp4" />
          </video>
          
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-violet-600" />
            ) : (
              <Volume2 className="w-5 h-5 text-violet-600" />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-violet-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="group bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  )
}
