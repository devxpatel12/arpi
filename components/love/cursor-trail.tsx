"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const trailEmojis = ["♥", "🌸", "✨", "🌷", "💕"]

interface TrailParticle {
  id: number
  x: number
  y: number
  emoji: string
}

export function CursorTrail() {
  const [particles, setParticles] = useState<TrailParticle[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    let lastSpawn = 0

    function onMove(e: MouseEvent | TouchEvent) {
      const now = Date.now()
      if (now - lastSpawn < 40) return
      lastSpawn = now

      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      const y = "touches" in e ? e.touches[0].clientY : e.clientY
      idRef.current += 1

      setParticles((prev) => [
        ...prev.slice(-18),
        {
          id: idRef.current,
          x,
          y,
          emoji: trailEmojis[Math.floor(Math.random() * trailEmojis.length)],
        },
      ])
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("touchmove", onMove, { passive: true })

    const cleanup = setInterval(() => {
      setParticles((prev) => prev.slice(-12))
    }, 800)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onMove)
      clearInterval(cleanup)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute text-lg"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 1, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0, scale: 1.8, y: "-120%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
