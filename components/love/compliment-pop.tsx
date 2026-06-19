"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const compliments = [
  "You're the prettiest flower in my garden. 🌸",
  "Meri jaan — bloom wherever you go.",
  "Your smile is prettier than any rose.",
  "Nobody compares to you, Arpita.",
  "Tu meri duniya hai. 🌷",
  "I fall for you more every day.",
]

interface ComplimentPopProps {
  compact?: boolean
}

export function ComplimentPop({ compact }: ComplimentPopProps) {
  const [index, setIndex] = useState(0)
  const [key, setKey] = useState(0)

  function next() {
    setIndex((i) => (i + 1) % compliments.length)
    setKey((k) => k + 1)
  }

  return (
    <div
      className={`flex w-full flex-col items-center px-2 ${compact ? "gap-1.5" : "gap-3"}`}
    >
      <motion.button
        type="button"
        onClick={next}
        className={`love-tap w-full max-w-xs cursor-pointer rounded-full border border-rose-400/30 bg-rose-500/10 font-[family-name:var(--font-playfair)] text-rose-200 active:bg-rose-500/20 ${
          compact
            ? "min-h-9 px-4 py-2 text-xs"
            : "min-h-11 px-5 py-3 text-sm"
        }`}
        whileTap={{ scale: 0.97 }}
      >
        Say something sweet 💬
      </motion.button>
      <motion.p
        key={key}
        className={`max-w-[min(100%,18rem)] text-center font-[family-name:var(--font-dancing)] text-pink-200 ${
          compact ? "min-h-[2.5rem] text-base leading-snug sm:text-lg" : "text-xl sm:text-2xl"
        }`}
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {compliments[index]}
      </motion.p>
    </div>
  )
}
