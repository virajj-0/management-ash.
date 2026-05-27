"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PasscodePage() {
  const [passcode, setPasscode] = useState<string[]>(["", "", "", ""])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shake, setShake] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNumberClick = (num: string) => {
    if (currentIndex < 4) {
      const newPasscode = [...passcode]
      newPasscode[currentIndex] = num
      setPasscode(newPasscode)
      
      if (currentIndex === 3) {
        const enteredCode = newPasscode.join("")
        if (enteredCode === "2808") {
          setIsExiting(true)
          setTimeout(() => {
            router.push("/page1")
          }, 500)
        } else {
          setShake(true)
          setTimeout(() => {
            setShake(false)
            setPasscode(["", "", "", ""])
            setCurrentIndex(0)
          }, 500)
        }
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  const handleClear = () => {
    setPasscode(["", "", "", ""])
    setCurrentIndex(0)
  }

  const handleBackspace = () => {
    if (currentIndex > 0) {
      const newPasscode = [...passcode]
      newPasscode[currentIndex - 1] = ""
      setPasscode(newPasscode)
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <main className={`min-h-screen bg-[#f5f0e8] flex items-center justify-center p-4 transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'} ${isExiting ? 'scale-95 opacity-0' : ''}`}>
      {/* Ashwini Paglu badge - top left corner */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-16 h-16 md:w-24 md:h-24 z-20 animate-bounce-slow">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lv_0_20260420163256-0WtXljxvH9XwOxNYWGcGIHmTaT1XYl.png"
          alt="Ashwini Paglu badge"
          fill
          priority
          className="object-contain drop-shadow-lg"
        />
      </div>

      <div className="relative bg-[#8B1A1A] rounded-3xl p-8 md:p-12 max-w-4xl w-full shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Photo with decorations */}
          <div className="relative">
            {/* Blue bow */}
            <svg
              className="absolute -top-6 right-0 md:-top-8 md:right-4 w-24 h-16 md:w-32 md:h-20 z-10"
              viewBox="0 0 120 80"
              fill="none"
            >
              <path
                d="M60 40 C40 20, 10 25, 15 45 C20 65, 50 55, 60 40"
                fill="#7EC8E3"
                stroke="#5BA3C0"
                strokeWidth="2"
              />
              <path
                d="M60 40 C80 20, 110 25, 105 45 C100 65, 70 55, 60 40"
                fill="#7EC8E3"
                stroke="#5BA3C0"
                strokeWidth="2"
              />
              <ellipse cx="60" cy="42" rx="8" ry="6" fill="#5BA3C0" />
              <path
                d="M55 48 Q50 70, 45 75"
                stroke="#7EC8E3"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M65 48 Q70 70, 75 75"
                stroke="#7EC8E3"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>

            {/* Polaroid frame */}
            <div className="bg-white p-3 pb-12 shadow-lg rotate-[-2deg] relative">
              <div className="w-56 h-64 md:w-72 md:h-80 relative overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260420_160846-bQLCEOQvMtPkxRRGMLFRjOG8cn58wu.jpg"
                  alt="Ashwini"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Teddy bear */}
            <div className="absolute -bottom-8 -left-4 md:-bottom-10 md:-left-8">
              <svg width="100" height="120" viewBox="0 0 100 120" className="md:w-[130px] md:h-[150px]">
                <circle cx="25" cy="20" r="15" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
                <circle cx="25" cy="20" r="8" fill="#f8f8f8"/>
                <circle cx="75" cy="20" r="15" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
                <circle cx="75" cy="20" r="8" fill="#f8f8f8"/>
                <ellipse cx="50" cy="40" rx="35" ry="30" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
                <rect x="58" y="8" width="20" height="12" fill="#7EC8E3" rx="2"/>
                <rect x="55" y="18" width="26" height="4" fill="#5BA3C0" rx="1"/>
                <circle cx="38" cy="38" r="4" fill="#333"/>
                <circle cx="62" cy="38" r="4" fill="#333"/>
                <circle cx="39" cy="37" r="1.5" fill="white"/>
                <circle cx="63" cy="37" r="1.5" fill="white"/>
                <ellipse cx="50" cy="48" rx="6" ry="4" fill="#333"/>
                <path d="M44 54 Q50 60, 56 54" stroke="#333" strokeWidth="2" fill="none"/>
                <ellipse cx="30" cy="48" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
                <ellipse cx="70" cy="48" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
                <ellipse cx="50" cy="85" rx="30" ry="28" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
                <path d="M40 70 L50 75 L40 80 Z" fill="#FF6B8A"/>
                <path d="M60 70 L50 75 L60 80 Z" fill="#FF6B8A"/>
                <circle cx="50" cy="75" r="4" fill="#E85A7A"/>
                <path d="M35 78 Q50 95, 65 78" stroke="#7EC8E3" strokeWidth="8" fill="none"/>
                <ellipse cx="22" cy="90" rx="12" ry="15" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
                <ellipse cx="78" cy="90" rx="12" ry="15" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
                <ellipse cx="35" cy="112" rx="12" ry="8" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
                <ellipse cx="65" cy="112" rx="12" ry="8" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Right side - Passcode entry */}
          <div className="flex flex-col items-center gap-6">
            <h2 
              className="text-2xl md:text-3xl text-[#f5d0d0] tracking-wide"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Entre a passcode
            </h2>

            <div className={`flex gap-3 ${shake ? 'animate-shake' : ''}`}>
              {passcode.map((digit, index) => (
                <div
                  key={index}
                  className="w-12 h-14 md:w-14 md:h-16 border-2 border-[#f5d0d0] rounded-lg flex items-center justify-center text-2xl text-white font-bold transition-all duration-200"
                  style={{ transform: digit ? 'scale(1.05)' : 'scale(1)' }}
                >
                  {digit ? "●" : ""}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#f5d0d0] text-[#8B1A1A] text-2xl md:text-3xl font-bold hover:bg-[#fce0e0] active:scale-95 transition-all duration-150 shadow-md"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#f5d0d0] text-[#8B1A1A] text-2xl md:text-3xl font-bold hover:bg-[#fce0e0] active:scale-95 transition-all duration-150 shadow-md"
              >
                *
              </button>
              <button
                onClick={() => handleNumberClick("0")}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#f5d0d0] text-[#8B1A1A] text-2xl md:text-3xl font-bold hover:bg-[#fce0e0] active:scale-95 transition-all duration-150 shadow-md"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#f5d0d0] text-[#8B1A1A] text-2xl md:text-3xl font-bold hover:bg-[#fce0e0] active:scale-95 transition-all duration-150 shadow-md"
              >
                #
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
