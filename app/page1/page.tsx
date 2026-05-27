"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Page1() {
  const router = useRouter()
  const [isOpening, setIsOpening] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      router.push("/card")
    }, 1200)
  }

  return (
    <main 
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65c3201493abed93f272066a71f43aca-DEE3NvqeCqGMCSuNmT0gaciqDk43bA.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Diving transition overlay */}
      <div 
        className={`fixed inset-0 bg-pink-200 z-50 transition-all duration-1000 pointer-events-none ${isOpening ? 'opacity-100 scale-150' : 'opacity-0 scale-100'}`}
        style={{
          borderRadius: isOpening ? '0' : '100%',
        }}
      />

      <div 
        className={`relative cursor-pointer transition-all duration-700 ease-out ${isOpening ? 'scale-[3] opacity-0 rotate-6' : 'hover:scale-105'} ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        onClick={handleOpen}
      >
        {/* Envelope image - increased size */}
        <div className="relative w-[360px] h-[260px] md:w-[520px] md:h-[380px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lv_0_20260420163340-K2aLTXVL7zBPxINfz3MGRm7Xi83fGE.jpg"
            alt="Envelope"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
          
          {/* Ashwini Paglu seal overlay - tappable area */}
          <div 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[35%] w-24 h-24 md:w-32 md:h-32 transition-transform duration-300 ${isOpening ? 'scale-150 rotate-12' : 'hover:scale-110'}`}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lv_0_20260420163256-0WtXljxvH9XwOxNYWGcGIHmTaT1XYl.png"
              alt="Ashwini Paglu seal"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Tap to open text */}
        <p 
          className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-pink-400 text-lg animate-pulse whitespace-nowrap transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          Tap to open...
        </p>
      </div>
    </main>
  )
}
