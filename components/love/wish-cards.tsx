"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

const wishes = [
  {
    id: "dress",
    emoji: "👗",
    label: "Surprise 1",
    back: "Dress shopping — on me, my queen. 👗",
    color: "from-rose-500/30 to-pink-600/20",
    border: "border-rose-400/30",
  },
  {
    id: "nails",
    emoji: "💅",
    label: "Surprise 2",
    back: "Nail extensions + spa day. All yours. 💅",
    color: "from-purple-500/30 to-fuchsia-600/20",
    border: "border-purple-400/30",
  },
  {
    id: "waffle",
    emoji: "🧇",
    label: "Surprise 3",
    back: "Belgian waffles + you = heaven. 🧇",
    color: "from-amber-500/30 to-orange-600/20",
    border: "border-amber-400/30",
  },
  {
    id: "kinder",
    emoji: "🍫",
    label: "Surprise 4",
    back: "Kinder Joy whenever you want. 🍫",
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

  function toggle(id: string) {
    if (!flipped.has(id)) onFlip?.()
    setFlipped((prev) => new Set(prev).add(id))
  }

  const allFlipped = flipped.size === wishes.length

  return (
    <motion.div
      className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 px-2 sm:max-w-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-dancing)] text-4xl text-pink-200">
          Unwrap me 🎁
        </h2>
        <p className="mt-1 font-[family-name:var(--font-playfair)] text-sm text-rose-200/60">
          {flipped.size}/4 opened
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-3">
        {wishes.map((wish, i) => {
          const isFlipped = flipped.has(wish.id)
          return (
            <motion.button
              key={wish.id}
              type="button"
              onClick={() => toggle(wish.id)}
              disabled={isFlipped}
              className="relative aspect-square cursor-pointer [perspective:800px] disabled:cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileTap={!isFlipped ? { scale: 0.92 } : {}}
            >
              <motion.div
                className="relative size-full [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
              >
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border bg-linear-to-br ${wish.color} ${wish.border} p-3 [backface-visibility:hidden]`}
                >
                  <span className="text-4xl">🎁</span>
                  <span className="font-[family-name:var(--font-playfair)] text-xs text-rose-100">
                    {wish.label}
                  </span>
                </div>
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border bg-[#2a1040]/95 ${wish.border} p-3 [backface-visibility:hidden] [transform:rotateY(180deg)]`}
                >
                  <span className="text-3xl">{wish.emoji}</span>
                  <p className="text-center font-[family-name:var(--font-playfair)] text-xs leading-snug text-rose-100">
                    {wish.back}
                  </p>
                </div>
              </motion.div>
            </motion.button>
          )
        })}
      </div>

      <motion.button
        type="button"
        onClick={onComplete}
        disabled={!allFlipped}
        className={`rounded-full px-8 py-3 font-[family-name:var(--font-playfair)] text-sm tracking-wider uppercase ${
          allFlipped
            ? "cursor-pointer bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-900/40"
            : "cursor-not-allowed bg-rose-900/30 text-rose-300/40"
        }`}
        whileHover={allFlipped ? { scale: 1.05 } : {}}
        whileTap={allFlipped ? { scale: 0.95 } : {}}
      >
        {allFlipped ? "One more thing... 💕" : "Open all 4 first"}
      </motion.button>
    </motion.div>
  )
}
