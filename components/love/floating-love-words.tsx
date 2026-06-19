"use client"

import { motion } from "framer-motion"

const words = [
  { text: "Arpita", left: "8%", top: "12%", size: "text-2xl", delay: 0, duration: 14 },
  { text: "I love you", left: "75%", top: "18%", size: "text-lg", delay: 2, duration: 16 },
  { text: "baba ♥", left: "85%", top: "55%", size: "text-xl", delay: 4, duration: 12 },
  { text: "♥ forever ♥", left: "5%", top: "70%", size: "text-base", delay: 1, duration: 18 },
  { text: "my baba", left: "60%", top: "82%", size: "text-lg", delay: 3, duration: 15 },
  { text: "💕", left: "40%", top: "8%", size: "text-3xl", delay: 5, duration: 11 },
  { text: "🌸", left: "25%", top: "45%", size: "text-2xl", delay: 2.5, duration: 13 },
  { text: "Arpita ♥", left: "50%", top: "90%", size: "text-xl", delay: 6, duration: 17 },
]

export function FloatingLoveWords({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`absolute font-[family-name:var(--font-dancing)] ${w.size} text-rose-300/15 sm:text-rose-300/20`}
          style={{ left: w.left, top: w.top }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.1, 0.25, 0.15, 0.25, 0.1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: w.duration,
            repeat: Infinity,
            delay: w.delay,
            ease: "easeInOut",
          }}
        >
          {w.text}
        </motion.span>
      ))}
    </div>
  )
}
  