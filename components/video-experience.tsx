"use client"

import { useState, useEffect, useRef } from "react"

export default function VideoExperience() {
  const [stage, setStage] = useState<"loader" | "enter-button" | "main-video" | "overlay">("loader")
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const loaderVideoRef = useRef<HTMLVideoElement>(null)
  const mainVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
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
      const newProgress = (currentTime / duration) * 100
      setProgress(newProgress)
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
      {/* LOADER STAGE */}
      {stage === "loader" && (
        <div className="w-full h-full flex items-center justify-center">
          <video ref={loaderVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loader-OPNtmzrRXijuDAhoV3lqopLpb73j4V.mp4" type="video/mp4" />
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
            ref={loaderVideoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loader-OPNtmzrRXijuDAhoV3lqopLpb73j4V.mp4" type="video/mp4" />
          </video>

          <button
            onClick={handleEnterClick}
            className={`relative z-10 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 mb-12 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            Enter
          </button>
        </div>
      )}

      {/* MAIN VIDEO STAGE */}
      {stage === "main-video" && (
        <div
          className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-600 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <video
            ref={mainVideoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleMainVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/generated_video%20%281%29-A52uvs4UM4PjDwCrZ7MGxGm6kl69K5.mp4" type="video/mp4" />
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
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-end pb-12 px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>

          <video autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover -z-10">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/generated_video%20%281%29-A52uvs4UM4PjDwCrZ7MGxGm6kl69K5.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 text-center text-white space-y-6 animate-fade-in flex flex-col items-center">
            <img src="/images/file.png" alt="Logo" className="h-32 w-auto" />
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-balance">Premium Experience</h1>
              <p className="text-lg text-gray-200 text-balance max-w-sm">
                This is your sample description. Update this text with your actual content and messaging for maximum
                impact.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
