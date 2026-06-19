"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const introLine = "Surprise! I'm Chottu — your elephant pet! 🐘💕"

const tapLines = [
  "Baba is the best human ever! 🐘💕",
  "Trunk hug for baba! 🤗🐘",
  "Elephants never forget… I never forget you, baba!",
  "He asked me to guard this gift. Mission: make baba smile!",
  "I love baba almost as much as peanuts! 🥜🐘",
  "You're his favourite — and mine too! 🐘♥",
]

interface ElephantPetProps {
  visible?: boolean
}

export function ElephantPet({ visible = false }: ElephantPetProps) {
  const [tapIndex, setTapIndex] = useState(0)
  const [showTap, setShowTap] = useState(false)
  const [bounce, setBounce] = useState(0)
  const [introDone, setIntroDone] = useState(false)

  const line = showTap
    ? tapLines[tapIndex % tapLines.length]
    : introDone
      ? "I'm so happy to meet you, baba! 🐘♥"
      : introLine

  function onTap() {
    setIntroDone(true)
    setTapIndex((i) => i + 1)
    setShowTap(true)
    setBounce((b) => b + 1)
    setTimeout(() => setShowTap(false), 3500)
  }

  if (!visible) return null

  return (
    <motion.div
      className="fixed z-40 flex flex-col items-end gap-1"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        right: "max(0.75rem, env(safe-area-inset-right))",
      }}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={line}
          className="max-w-[10.5rem] rounded-2xl rounded-br-sm border border-rose-400/25 bg-[#1a0a2e]/95 px-3 py-2 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <p className="font-[family-name:var(--font-playfair)] text-[11px] leading-snug text-rose-100 sm:text-xs">
            {line}
          </p>
        </motion.div>
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onTap}
        className="love-tap flex flex-col items-center"
        aria-label="Tap elephant pet"
        animate={
          bounce > 0
            ? { rotate: [0, -8, 8, -4, 0], scale: [1, 1.15, 1] }
            : { y: [0, -4, 0] }
        }
        transition={
          bounce > 0
            ? { duration: 0.45, ease: "easeInOut" }
            : { y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }
        }
        whileTap={{ scale: 1.1 }}
      >
        <span className="text-4xl drop-shadow-lg sm:text-5xl">🐘</span>
        <span className="font-[family-name:var(--font-playfair)] text-[9px] text-rose-300/60">
          tap me
        </span>
      </motion.button>
    </motion.div>
  )
}

export function ElephantReveal() {
  return (
    <motion.div
      className="flex w-full flex-col items-center gap-3 py-2"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
    >
      <motion.span
        className="text-6xl sm:text-7xl"
        animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🐘
      </motion.span>
      <p className="font-[family-name:var(--font-dancing)] text-xl text-rose-200 sm:text-2xl">
        Meet Chottu!
      </p>
      <p className="max-w-[16rem] font-[family-name:var(--font-playfair)] text-sm text-rose-100/80 italic sm:max-w-xs">
        Your very own elephant pet — he helped deliver everything, baba.
      </p>
    </motion.div>
  )
}
