"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Initial mount animation
    setMounted(true)
    
    // Start card slide-in animation after mount
    const slideTimer = setTimeout(() => {
      setCardVisible(true)
    }, 300)

    // Auto-navigate after 5 seconds (from when card is fully visible)
    const autoNavTimer = setTimeout(() => {
      handleNext()
    }, 6000) // 300ms mount + 700ms slide + 5000ms display

    return () => {
      clearTimeout(slideTimer)
      clearTimeout(autoNavTimer)
    }
  }, [])

  const handleNext = () => {
    if (isExiting) return
    setIsExiting(true)
    setTimeout(() => {
      router.push("/page2")
    }, 600)
  }

  const handleBack = () => {
    if (isExiting) return
    setIsExiting(true)
    setTimeout(() => {
      router.push("/page1")
    }, 600)
  }

  return (
    <main 
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all duration-700 bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-30 blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-200 rounded-full opacity-30 blur-xl" />
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-20 blur-lg" />
      </div>

      {/* Card container with slide-in animation */}
      <div 
        className={`relative transition-all duration-700 ease-out ${
          isExiting 
            ? 'translate-y-10 opacity-0 scale-95' 
            : cardVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-[100vh] opacity-0 scale-75'
        }`}
      >
        {/* ID Card Image */}
        <div className="relative w-[340px] h-[220px] md:w-[600px] md:h-[400px] lg:w-[700px] lg:h-[470px] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/callmeifyougetlostid.png-NFWQdXWSV2tus8kHHnCuJ2ZEyWRIlP.jpeg"
            alt="Ashwini's Travel License"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Subtle glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/20 via-rose-300/20 to-pink-400/20 rounded-2xl blur-xl -z-10" />
      </div>

      {/* Navigation buttons */}
      <div 
        className={`flex items-center gap-6 mt-8 transition-all duration-500 delay-300 ${
          isExiting ? 'opacity-0 translate-y-4' : cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm text-pink-600 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
          <span style={{ fontFamily: 'Caveat, cursive' }} className="text-lg">Back</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 hover:scale-105 transition-all duration-300"
        >
          <span style={{ fontFamily: 'Caveat, cursive' }} className="text-lg">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Auto-progress indicator */}
      <div 
        className={`mt-6 transition-all duration-500 delay-500 ${
          isExiting ? 'opacity-0' : cardVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-48 h-1.5 bg-pink-200 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-pink-500 rounded-full ${cardVisible && !isExiting ? 'animate-progress' : ''}`}
            style={{
              animation: cardVisible && !isExiting ? 'progress 5s linear forwards' : 'none'
            }}
          />
        </div>
        <p 
          className="text-pink-400 text-sm text-center mt-2"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          Auto-continuing...
        </p>
      </div>

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </main>
  )
}
