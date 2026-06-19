"use client"

import { motion } from "framer-motion"

const pieces = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  emoji: ["🌸", "🌺", "🌷", "💐", "♥", "✨", "🌹", "💕", "🎉", "⭐"][i % 10],
  angle: (i / 80) * 360,
  distance: 80 + (i % 8) * 35,
  delay: (i % 15) * 0.015,
}))

export function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-2xl sm:text-3xl"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: [1, 1, 0],
            scale: [0, 1.5, 0.4],
            rotate: [0, 720 * (p.id % 2 === 0 ? 1 : -1)],
          }}
          transition={{ duration: 2.2, delay: p.delay, ease: "easeOut" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
