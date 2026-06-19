"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ElephantSurpriseProps {
  onReveal: () => void
}

export function ElephantSurprise({ onReveal }: ElephantSurpriseProps) {
  const [opened, setOpened] = useState(false)
  const [wiggle, setWiggle] = useState(0)

  function tryOpen() {
    if (opened) {
      onReveal()
      return
    }
    setWiggle((w) => w + 1)
  }

  function unlock() {
    setOpened(true)
    setWiggle(0)
  }

  return (
    <motion.div
      className="mt-2 flex w-full flex-col items-center gap-4 border-t border-rose-400/15 pt-6 sm:gap-5 sm:pt-7"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <p className="font-[family-name:var(--font-playfair)] text-xs tracking-[0.15em] text-rose-200/50 uppercase sm:text-sm">
        Psst… one more thing
      </p>
      <p className="max-w-[15rem] font-[family-name:var(--font-dancing)] text-lg text-rose-200/90 sm:max-w-xs sm:text-xl">
        {opened
          ? "Ready to meet your surprise, baba?"
          : "Someone special helped with all of this…"}
      </p>

      <div className="relative flex h-44 w-full max-w-xs items-center justify-center sm:h-48">
        <AnimatePresence mode="wait">
          {!opened && wiggle > 0 && (
            <motion.p
              key={wiggle}
              className="absolute -top-2 left-1/2 z-20 w-full max-w-[14rem] -translate-x-1/2 text-center font-[family-name:var(--font-dancing)] text-base text-pink-200 sm:text-lg"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Pehle unlock karo, baba! Tap the button below 🔐
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={tryOpen}
          className="love-tap relative cursor-pointer"
          animate={{
            y: opened ? [0, -8, 0] : 0,
            rotate: wiggle > 0 && !opened ? [0, -8, 8, -4, 0] : 0,
          }}
          transition={{
            y: opened
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.45, ease: "easeInOut" },
            rotate: { duration: 0.45, ease: "easeInOut" },
          }}
          whileTap={opened ? { scale: 0.92 } : { scale: 1.05 }}
        >
          <div
            className={`flex min-h-[8.5rem] min-w-[8.5rem] flex-col items-center justify-center rounded-2xl border px-4 shadow-xl sm:min-h-[9rem] sm:min-w-[9rem] ${
              opened
                ? "border-rose-400/50 bg-linear-to-br from-violet-600/40 to-rose-900/30 shadow-rose-900/30"
                : "border-rose-400/25 bg-linear-to-br from-violet-600/25 to-rose-900/20"
            }`}
          >
            <span className="text-5xl sm:text-6xl">{opened ? "🎁" : "🔒"}</span>
            <span className="mt-2 font-[family-name:var(--font-playfair)] text-sm text-rose-100">
              {opened ? "Tap to meet them" : "A secret surprise"}
            </span>
          </div>
        </motion.button>
      </div>

      <motion.button
        type="button"
        onClick={unlock}
        disabled={opened}
        className={`love-tap min-h-12 w-full max-w-xs rounded-full px-6 py-3.5 font-[family-name:var(--font-playfair)] text-sm tracking-wide uppercase sm:max-w-sm ${
          opened
            ? "cursor-default bg-emerald-600/30 text-emerald-200/80"
            : "cursor-pointer bg-linear-to-r from-violet-500 to-rose-500 text-white shadow-lg shadow-violet-900/40 active:opacity-90"
        }`}
        animate={
          !opened
            ? {
                scale: [1, 1.04, 1],
                boxShadow: [
                  "0 4px 20px rgba(139,92,246,0.3)",
                  "0 8px 32px rgba(139,92,246,0.55)",
                  "0 4px 20px rgba(139,92,246,0.3)",
                ],
              }
            : {}
        }
        transition={{ duration: 1.8, repeat: Infinity }}
        whileTap={!opened ? { scale: 0.97 } : {}}
      >
        {opened ? "Unlocked — go on, baba!" : "I want my surprise ♥"}
      </motion.button>
    </motion.div>
  )
}
