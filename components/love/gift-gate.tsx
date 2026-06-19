"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const dodgeMessages = [
  "Pehle bolo… I love you too, baba! 😤",
  "Nahi nahi baba — say it back first!",
  "Catch me if you can… but accept first ♥",
  "Gift tab tak locked hai jab tak tu na bole! 🙈",
  "Almost baba! Tap the pink button below 💕",
]

interface GiftGateProps {
  onOpen: () => void
  onAccept?: () => void
}

export function GiftGate({ onOpen, onAccept }: GiftGateProps) {
  const [accepted, setAccepted] = useState(false)
  const [dodgeIndex, setDodgeIndex] = useState(0)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [wiggle, setWiggle] = useState(0)

  const dodgeSpots = [
    { x: 72, y: -36 },
    { x: -80, y: 28 },
    { x: 64, y: 44 },
    { x: -68, y: -48 },
    { x: 0, y: -56 },
    { x: -56, y: 16 },
  ]

  function tryOpen() {
    if (accepted) {
      onOpen()
      return
    }

    const next = dodgeIndex % dodgeSpots.length
    setOffset(dodgeSpots[next])
    setDodgeIndex((i) => i + 1)
    setWiggle((w) => w + 1)
  }

  function acceptLove() {
    setAccepted(true)
    setOffset({ x: 0, y: 0 })
    onAccept?.()
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
      <p className="font-[family-name:var(--font-playfair)] text-xs tracking-[0.2em] text-rose-200/70 uppercase sm:text-sm sm:tracking-[0.25em]">
        A bouquet for you
      </p>
      <h1 className="font-[family-name:var(--font-dancing)] love-shimmer text-5xl sm:text-7xl">
        Arpita
      </h1>

      <p className="max-w-[16rem] font-[family-name:var(--font-playfair)] text-sm text-rose-200/80 italic sm:max-w-xs">
        {accepted
          ? "Ab kholo, baba — it's all yours 💐"
          : "I love you so much, baba… but first, say it back?"}
      </p>

      {/* Runaway gift zone */}
      <div className="relative flex h-52 w-full max-w-xs items-center justify-center sm:h-56 sm:max-w-sm">
        <AnimatePresence mode="wait">
          {!accepted && dodgeIndex > 0 && (
            <motion.p
              key={dodgeIndex}
              className="absolute -top-1 left-1/2 z-20 w-full max-w-[15rem] -translate-x-1/2 text-center font-[family-name:var(--font-dancing)] text-lg text-pink-200 sm:text-xl"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {dodgeMessages[(dodgeIndex - 1) % dodgeMessages.length]}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={tryOpen}
          className="love-tap relative cursor-pointer"
          animate={{
            x: offset.x,
            y: accepted ? [0, -8, 0] : offset.y,
            rotate: wiggle > 0 && !accepted ? [0, -8, 8, -4, 0] : 0,
          }}
          transition={{
            x: { type: "spring", stiffness: 400, damping: 12 },
            y: accepted
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 400, damping: 12 },
            rotate: { duration: 0.45, ease: "easeInOut" },
          }}
          whileTap={accepted ? { scale: 0.92 } : { scale: 1.05 }}
        >
          <div
            className={`flex min-h-[9.5rem] min-w-[9.5rem] flex-col items-center justify-center rounded-2xl border px-4 shadow-xl sm:min-h-[10.5rem] sm:min-w-[10.5rem] ${
              accepted
                ? "border-rose-400/50 bg-linear-to-br from-rose-600/50 to-emerald-900/30 shadow-rose-900/30"
                : "border-rose-400/25 bg-linear-to-br from-rose-600/35 to-emerald-900/25"
            }`}
          >
            <span className="text-5xl sm:text-6xl">{accepted ? "💐" : "🔒"}</span>
            <span className="mt-2 font-[family-name:var(--font-playfair)] text-sm text-rose-100">
              {accepted ? "Tap to open" : "Tap to open…"}
            </span>
          </div>
        </motion.button>
      </div>

      <motion.button
        type="button"
        onClick={acceptLove}
        disabled={accepted}
        className={`love-tap min-h-12 w-full max-w-xs rounded-full px-6 py-3.5 font-[family-name:var(--font-playfair)] text-sm tracking-wide uppercase sm:max-w-sm ${
          accepted
            ? "cursor-default bg-emerald-600/30 text-emerald-200/80"
            : "cursor-pointer bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-900/40 active:opacity-90"
        }`}
        animate={
          !accepted
            ? {
                scale: [1, 1.04, 1],
                boxShadow: [
                  "0 4px 20px rgba(244,63,94,0.3)",
                  "0 8px 32px rgba(244,63,94,0.55)",
                  "0 4px 20px rgba(244,63,94,0.3)",
                ],
              }
            : {}
        }
        transition={{ duration: 1.8, repeat: Infinity }}
        whileTap={!accepted ? { scale: 0.97 } : {}}
      >
        {accepted ? "I love you too ♥ — unlocked!" : "I love you too ♥"}
      </motion.button>
    </div>
  )
}
