"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const compliments = [
  "You're the prettiest flower in my garden, baba. 🌸",
  "Meri jaan — bloom wherever you go.",
  "Your smile is prettier than any rose, jaan.",
  "Nobody compares to you, Arpita.",
  "My favourite baba. Always.",
  "Tu meri duniya hai, baba. 🌷",
  "Every flower reminds me of you.",
  "I fall for you more every day, meri jaan.",
]

export function ComplimentPop() {
  const [index, setIndex] = useState(0)
  const [key, setKey] = useState(0)

  function next() {
    setIndex((i) => (i + 1) % compliments.length)
    setKey((k) => k + 1)
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 px-2">
      <motion.button
        type="button"
        onClick={next}
        className="love-tap min-h-11 w-full max-w-xs cursor-pointer rounded-full border border-rose-400/30 bg-rose-500/10 px-5 py-3 font-[family-name:var(--font-playfair)] text-sm text-rose-200 active:bg-rose-500/20"
        whileTap={{ scale: 0.97 }}
      >
        Say something sweet 💬
      </motion.button>
      <motion.p
        key={key}
        className="max-w-[min(100%,20rem)] text-center font-[family-name:var(--font-dancing)] text-xl text-pink-200 sm:text-2xl"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {compliments[index]}
      </motion.p>
    </div>
  )
}
