"use client"

import { useRouter } from "next/navigation"
import { Heart, Sparkles, ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function FinalPage() {
  const router = useRouter()
  const [showHearts, setShowHearts] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShowHearts(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    setIsExiting(true)
    setTimeout(() => router.push("/page9"), 400)
  }

  const handleRestart = () => {
    setIsExiting(true)
    setTimeout(() => router.push("/"), 400)
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 flex items-center justify-center p-4 relative overflow-hidden transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'} ${isExiting ? 'opacity-0 scale-95' : ''}`}>
      {/* Floating hearts animation */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-400/40 fill-current animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl text-center z-10 transition-all duration-700 ${mounted ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>
        <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
        
        <h1 
          className="text-4xl md:text-6xl text-rose-600 mb-6"
          style={{ fontFamily: 'Caveat, cursive' }}
        >
          You&apos;re the Best!
        </h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-700 leading-relaxed">
            Thank you for being the most amazing friend anyone could ever ask for.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            Through all the ups and downs, you&apos;ve always been there.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed">
            I&apos;m so grateful to have you in my life!
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 mb-8">
          <p 
            className="text-2xl text-rose-600"
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            &ldquo;Some people arrive and make such a beautiful impact on your life, you can barely remember what life was like without them&rdquo;
          </p>
        </div>

        <p className="text-gray-500 mb-8">
          Keep shining, Ashwini Paglu!
          <br />
          <span className="italic">- Prithvi</span>
        </p>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-rose-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Over
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </main>
  )
}
