"use client"

import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Page4() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setMounted(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleNext = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsExiting(true)
    setTimeout(() => router.push("/page5"), 400)
  }

  const handleBack = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsExiting(true)
    setTimeout(() => router.push("/page3"), 400)
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br from-teal-100 via-cyan-50 to-teal-200 flex items-center justify-center p-4 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isExiting ? 'opacity-0 scale-95' : ''}`}>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 max-w-lg w-full shadow-2xl">
        <p 
          className="text-center text-2xl md:text-3xl text-teal-600 mb-4"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          Your smile is my favorite view
        </p>

        <div className="relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden mb-4">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            loop
            autoPlay
            playsInline
            preload="auto"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lv_7625993661712747781_20260420141601-qwI7yxhNxmtT9D8uOnTY3bvqdYHLdk.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="group bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  )
}
