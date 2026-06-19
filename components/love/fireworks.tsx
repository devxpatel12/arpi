"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface Particle {
  key: string
  x: number
  y: number
  color: string
  angle: number
  dist: number
}

const colors = ["#fb7185", "#f472b6", "#fbbf24", "#fda4af"]

function createBurst(nextId: () => number, cx: number, cy: number): Particle[] {
  const color = colors[Math.floor(Math.random() * colors.length)]
  return Array.from({ length: 12 }, (_, i) => ({
    key: `fw-${nextId()}`,
    x: cx,
    y: cy,
    color,
    angle: (i / 12) * 360,
    dist: 50 + Math.random() * 50,
  }))
}

export function Fireworks({ burstKey }: { burstKey: number }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    if (burstKey === 0) return

    const cx = 20 + Math.random() * 60
    const cy = 20 + Math.random() * 50
    const newParticles = createBurst(() => ++idRef.current, cx, cy)
    const newKeys = new Set(newParticles.map((p) => p.key))

    setParticles((prev) => [...prev.slice(-24), ...newParticles])

    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newKeys.has(p.key)))
    }, 1200)

    return () => clearTimeout(timer)
  }, [burstKey])

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.key}
            className="absolute size-1.5 rounded-full sm:size-2"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: p.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
              y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
              opacity: 0,
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
