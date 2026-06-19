"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const reasons = [
  { emoji: "✨", text: "Your smile is my favourite thing in this world." },
  { emoji: "🌸", text: "You notice the little things — and that makes you rare, baba." },
  { emoji: "🏠", text: "With you, I feel at home — every single day, baba." },
  { emoji: "💫", text: "You make ordinary moments feel magical." },
  { emoji: "🌙", text: "I'm proud of who you are — inside and out." },
  { emoji: "♥", text: "The world is softer because you're in it." },
]

interface LoveReasonsProps {
  onComplete: () => void
  onReveal?: () => void
}

export function LoveReasons({ onComplete, onReveal }: LoveReasonsProps) {
  const [revealed, setRevealed] = useState(0)

  function revealNext() {
    if (revealed >= reasons.length) return
    setRevealed((r) => r + 1)
    onReveal?.()
  }

  const allDone = revealed >= reasons.length

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center">
        <p className="font-[family-name:var(--font-playfair)] text-xs tracking-widest text-rose-200/60 uppercase">
          Just for you
        </p>
        <h2 className="font-[family-name:var(--font-dancing)] mt-1 text-3xl text-pink-200 sm:text-4xl">
          Why you&apos;re so special
        </h2>
        <p className="mt-1 font-[family-name:var(--font-playfair)] text-xs text-rose-200/50 sm:text-sm">
          Tap to reveal — {revealed}/{reasons.length}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        {reasons.map((reason, i) => {
          const isVisible = i < revealed
          return (
            <AnimatePresence key={i}>
              {isVisible && (
                <motion.div
                  className="flex items-start gap-3 rounded-2xl border border-rose-400/30 bg-white/5 px-4 py-3 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                >
                  <span className="text-xl">{reason.emoji}</span>
                  <p className="font-[family-name:var(--font-playfair)] text-sm leading-snug text-rose-100 sm:text-[15px]">
                    {reason.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>

      {!allDone ? (
        <motion.button
          type="button"
          onClick={revealNext}
          className="love-tap min-h-12 w-full max-w-xs rounded-full bg-linear-to-r from-rose-500/80 to-pink-500/80 px-6 py-3.5 font-[family-name:var(--font-playfair)] text-sm text-white active:opacity-90 sm:max-w-sm"
          whileTap={{ scale: 0.97 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {revealed === 0 ? "Tap to see why ♥" : "One more reason..."}
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onComplete}
          className="love-tap min-h-12 w-full max-w-xs rounded-full bg-linear-to-r from-rose-500 to-pink-500 px-6 py-3.5 font-[family-name:var(--font-playfair)] text-sm tracking-wide text-white uppercase active:opacity-90 sm:max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
        >
          Now build your bouquet 🌸
        </motion.button>
      )}
    </motion.div>
  )
}
