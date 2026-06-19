"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const wishes = [
  {
    id: "dress",
    emoji: "👗",
    label: "Surprise 1",
    back: "Next shopping trip is on me, meri jaan! Pick any dress that makes you feel like the queen you are — I'll carry the bags and tell you how stunning you look in every single one.",
    color: "from-rose-500/30 to-pink-600/20",
    border: "border-rose-400/30",
  },
  {
    id: "nails",
    emoji: "💅",
    label: "Surprise 2",
    back: "Fresh nails, fresh vibes! Spa day for my princess — nail extensions, your favourite colours, and me sitting beside you admiring how perfect your hands look.",
    color: "from-purple-500/30 to-fuchsia-600/20",
    border: "border-purple-400/30",
  },
  {
    id: "waffle",
    emoji: "🧇",
    label: "Surprise 3",
    back: "Belgian waffles — warm, golden, loaded with syrup & whipped cream. And the sweetest part? You, right beside me with that beautiful smile I fall for every day.",
    color: "from-amber-500/30 to-orange-600/20",
    border: "border-amber-400/30",
  },
  {
    id: "kinder",
    emoji: "🍫",
    label: "Surprise 4",
    back: "Kinder Joy whenever your heart desires — because little joys matter, and you deserve every tiny surprise that makes those pretty eyes light up.",
    color: "from-red-500/30 to-rose-700/20",
    border: "border-red-400/30",
  },
]

interface WishCardsProps {
  onComplete: () => void
  onFlip?: () => void
}

export function WishCards({ onComplete, onFlip }: WishCardsProps) {
  const [flipped, setFlipped] = useState<Set<string>>(new Set())
  const [justFlipped, setJustFlipped] = useState<string | null>(null)

  function toggle(id: string) {
    const wasFlipped = flipped.has(id)
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    if (!wasFlipped) {
      setJustFlipped(id)
      onFlip?.()
      setTimeout(() => setJustFlipped(null), 600)
    }
  }

  const allFlipped = flipped.size === wishes.length

  return (
    <motion.div
      className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-6 px-2"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 100, damping: 14 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <motion.p
          className="font-[family-name:var(--font-playfair)] text-sm tracking-[0.25em] text-rose-200/70 uppercase"
          animate={{ letterSpacing: ["0.2em", "0.35em", "0.2em"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Because I know what makes you happy
        </motion.p>
        <motion.h2
          className="font-[family-name:var(--font-dancing)] text-4xl text-pink-200 sm:text-5xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Your little surprises ♥
        </motion.h2>
        <p className="max-w-sm font-[family-name:var(--font-playfair)] text-sm text-rose-200/60 italic">
          Tap each gift to unwrap — I made these just for you, my baby
        </p>
      </motion.div>

      <div className="grid w-full grid-cols-2 gap-3 sm:gap-4">
        {wishes.map((wish, i) => {
          const isFlipped = flipped.has(wish.id)
          const isBursting = justFlipped === wish.id
          return (
            <motion.button
              key={wish.id}
              type="button"
              onClick={() => toggle(wish.id)}
              className="group relative aspect-[4/5] cursor-pointer [perspective:1000px]"
              initial={{ opacity: 0, rotateY: -30, y: 50, scale: 0.8 }}
              animate={
                isBursting
                  ? {
                      opacity: 1,
                      rotateY: 0,
                      y: 0,
                      scale: [1, 1.12, 1],
                      rotate: [0, -3, 3, 0],
                    }
                  : { opacity: 1, rotateY: 0, y: 0, scale: 1, rotate: 0 }
              }
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.92 }}
            >
              {isBursting && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center text-4xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  ✨
                </motion.div>
              )}

              <motion.div
                className="relative size-full [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 150 }}
              >
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border bg-linear-to-br ${wish.color} ${wish.border} p-4 shadow-xl backdrop-blur-sm [backface-visibility:hidden]`}
                >
                  <motion.span
                    className="text-5xl sm:text-6xl"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 12, -12, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  >
                    🎁
                  </motion.span>
                  <p className="font-[family-name:var(--font-playfair)] text-sm font-medium text-rose-100 sm:text-base">
                    {wish.label}
                  </p>
                  <p className="font-[family-name:var(--font-playfair)] text-xs text-rose-200/60 italic">
                    A little something for you...
                  </p>
                  {!isFlipped && (
                    <motion.span
                      className="rounded-full border border-rose-300/30 px-3 py-1 text-xs tracking-widest text-rose-300/60 uppercase"
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      tap to unwrap
                    </motion.span>
                  )}
                </div>

                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border bg-linear-to-br from-[#2a1040]/95 to-[#1a0828]/95 ${wish.border} p-4 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]`}
                >
                  <motion.span
                    className="text-4xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {wish.emoji}
                  </motion.span>
                  <p className="text-center font-[family-name:var(--font-playfair)] text-xs leading-relaxed text-rose-100/90 sm:text-sm">
                    {wish.back}
                  </p>
                </div>
              </motion.div>
            </motion.button>
          )
        })}
      </div>

      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-2">
          {wishes.map((w) => (
            <motion.div
              key={w.id}
              className={`size-3 rounded-full transition-colors ${
                flipped.has(w.id)
                  ? "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.8)]"
                  : "bg-rose-900/60"
              }`}
              animate={
                flipped.has(w.id)
                  ? { scale: [1, 1.5, 1], rotate: [0, 180, 360] }
                  : { scale: [1, 1.1, 1] }
              }
              transition={{
                scale: { duration: flipped.has(w.id) ? 0.5 : 2, repeat: Infinity },
                rotate: { duration: 0.6 },
              }}
            />
          ))}
        </div>
        <p className="font-[family-name:var(--font-playfair)] text-xs text-rose-200/50">
          {flipped.size}/{wishes.length} surprises unwrapped
        </p>

        <motion.button
          type="button"
          onClick={onComplete}
          disabled={!allFlipped}
          className={`rounded-full px-8 py-3 font-[family-name:var(--font-playfair)] text-sm tracking-wider uppercase transition-all ${
            allFlipped
              ? "cursor-pointer bg-linear-to-r from-rose-500 via-pink-500 to-purple-500 text-white shadow-lg shadow-rose-900/40"
              : "cursor-not-allowed bg-rose-900/30 text-rose-300/40"
          }`}
          whileHover={allFlipped ? { scale: 1.08 } : {}}
          whileTap={allFlipped ? { scale: 0.92 } : {}}
          animate={
            allFlipped
              ? {
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 20px rgba(244,63,94,0.3)",
                    "0 0 40px rgba(244,63,94,0.6)",
                    "0 0 20px rgba(244,63,94,0.3)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {allFlipped ? "One more thing for you... 💕" : "Unwrap all gifts first..."}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
