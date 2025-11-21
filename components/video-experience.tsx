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

         
      <button onClick={handleEnterClick}
            aria-label="Enter">
        <span> ENTER THE UNIVERCE
        </span>
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
            <img src="/images/file.png" alt="logo"  className="h-[150px]"/>
            <div className="space-y-4">
            
              <p className="text-sm text-gray-200 max-w-sm">
                <p>දුරුතු සඳෙහි ඇරයුමෙන් </p>
                <p>විහිදුවා තාල නාද දස්කම්</p>
                <p>එකට කැටි කොට තාක්ෂණයෙන්</p>
                <p>පුරා වසරක් යන්න මත්තෙන් </p>
                <p>ඉල් සඳ වැස්සේ </p>
                <p>සොදුරු සුයාමයක</p>
                <p> මතකාවර්ජනය කරන්නට</p>
                <p>කාලයෙන් බිඳක් වෙන් කොට</p>
                <p>එක් වන්න නැවත හමුවෙන තුරා</p>
                <p>සවිස්කාරා නම සදාකාලික කරන්නට</p>
                
              <h4 className="mt-12 text-2xl font-bold">ඉතිං මේ ඇරයුමයි පියවර තබන්නට   
                      සවිස්කාරා  නිමාවට</h4>
                  
              </p>

              <p id="date">date : 2025/11/23<br/>Time : 6.00 PM<br/>Venue : Bandaranayake Hall</p>



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