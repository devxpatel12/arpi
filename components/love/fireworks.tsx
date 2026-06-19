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

const colors = ["#fb7185", "#f472b6", "#e879f9", "#fbbf24", "#fda4af", "#ffffff"]

function createParticles(nextId: () => number): Particle[] {
  const cx = 15 + Math.random() * 70
  const cy = 15 + Math.random() * 60
  const color = colors[Math.floor(Math.random() * colors.length)]

  return Array.from({ length: 24 }, (_, i) => ({
    key: `fw-${nextId()}`,
    x: cx,
    y: cy,
    color,
    angle: (i / 24) * 360,
    dist: 60 + Math.random() * 80,
  }))
}

export function Fireworks({ burstKey }: { burstKey: number }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const idRef = useRef(0)

  function nextId() {
    idRef.current += 1
    return idRef.current
  }

  useEffect(() => {
    if (burstKey === 0) return

    const newParticles = Array.from({ length: 5 }, () => createParticles(nextId)).flat()
    const newKeys = new Set(newParticles.map((p) => p.key))

    setParticles((prev) => [...prev, ...newParticles])

    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newKeys.has(p.key)))
    }, 2000)

    return () => clearTimeout(timer)
  }, [burstKey])

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.key}
            className="absolute size-2 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
              y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
