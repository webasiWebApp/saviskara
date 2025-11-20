"use client"

import { useState, useEffect, useRef } from "react"

export default function VideoExperience() {
  const [stage, setStage] = useState<"loader" | "enter-button" | "main-video" | "overlay">("loader")
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const loaderVideoRef = useRef<HTMLVideoElement>(null)
  const mainVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("enter-button")
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnterClick = () => {
    setFadeOut(true)
    setTimeout(() => {
      setStage("main-video")
      setFadeOut(false)
      setProgress(0)
    }, 600)
  }

  const handleMainVideoEnd = () => {
    setStage("overlay")
  }

  const handleTimeUpdate = () => {
    if (mainVideoRef.current) {
      const { currentTime, duration } = mainVideoRef.current
      const safeDuration = duration && isFinite(duration) && duration > 0 ? duration : 1
      const newProgress = (currentTime / safeDuration) * 100
      setProgress(newProgress)
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* LOADER STAGE */}
      {stage === "loader" && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <video ref={loaderVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://4g4t40c68htoc9be.public.blob.vercel-storage.com/loader.webm" type="video/webm" />
          </video>
        </div>
      )}

      {/* ENTER BUTTON STAGE */}
      {stage === "enter-button" && (
        <div
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-end bg-black transition-opacity duration-600 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://4g4t40c68htoc9be.public.blob.vercel-storage.com/loader.webm" type="video/webm" />
          </video>

          <button
            onClick={handleEnterClick}
            className="relative z-10 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 mb-12"
          >
            Enter
          </button>
        </div>
      )}

      {/* MAIN VIDEO STAGE */}
      {stage === "main-video" && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <video
            ref={mainVideoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleMainVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover"
          >
            <source src="https://4g4t40c68htoc9be.public.blob.vercel-storage.com/saviskaraWeb.webm" type="video/webm" />
          </video>

          <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center gap-2 pb-8">
            <p className="text-white text-sm font-medium">Inviting.....</p>
            <div className="w-48 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY STAGE */}
      {stage === "overlay" && (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-end pb-12 px-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>

          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover -z-10">
            <source src="https://4g4t40c68htoc9be.public.blob.vercel-storage.com/saviskaraWeb.webm" type="video/webm" />
          </video>

          <div className="relative z-10 text-center text-white space-y-6 flex flex-col items-center">
            <div className="h-32 w-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold">L</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Premium Experience</h1>
              <p className="text-lg text-gray-200 max-w-sm">
                This is your sample description. Update this text with your actual content and messaging for maximum
                impact.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}