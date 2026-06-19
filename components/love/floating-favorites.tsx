"use client"

import { motion } from "framer-motion"

const favorites = [
  { emoji: "👗", label: "dress", left: "8%", duration: 9, delay: 0 },
  { emoji: "💅", label: "nails", left: "22%", duration: 11, delay: 1.5 },
  { emoji: "🧇", label: "waffle", left: "78%", duration: 10, delay: 0.8 },
  { emoji: "🍫", label: "kinder", left: "88%", duration: 12, delay: 2.2 },
  { emoji: "🛍️", label: "shopping", left: "45%", duration: 13, delay: 3 },
  { emoji: "✨", label: "sparkle", left: "62%", duration: 8, delay: 1 },
  { emoji: "👗", label: "dress2", left: "92%", duration: 10, delay: 4 },
  { emoji: "🧇", label: "waffle2", left: "5%", duration: 11, delay: 2.5 },
]

export function FloatingFavorites() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {favorites.map((item) => (
        <motion.span
          key={item.label}
          className="absolute opacity-20 sm:opacity-30"
          style={{ left: item.left, bottom: "-8%", fontSize: 28 }}
          animate={{
            y: [0, -1100],
            x: [0, Math.sin(item.delay) * 60],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  )
}
