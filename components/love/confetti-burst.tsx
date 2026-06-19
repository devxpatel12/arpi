"use client"

import { motion } from "framer-motion"

const pieces = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  emoji: ["🌸", "♥", "🌷", "💕", "✨"][i % 5],
  angle: (i / 24) * 360,
  distance: 70 + (i % 4) * 25,
}))

export function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-xl"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 1,
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
