"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"

import {
  BouquetDisplay,
  buildBouquetFlowers,
} from "./bouquet-display"

const bunches = [
  {
    id: "roses",
    emoji: "🌹",
    label: "Red Roses",
    note: "Endless love",
    color: "from-rose-600/40 to-red-900/20",
    border: "border-rose-400/30",
  },
  {
    id: "tulips",
    emoji: "🌷",
    label: "Tulips",
    note: "Pretty like you",
    color: "from-pink-500/30 to-rose-600/20",
    border: "border-pink-400/30",
  },
  {
    id: "cherry",
    emoji: "🌸",
    label: "Cherry Blossom",
    note: "Soft & beautiful",
    color: "from-fuchsia-500/25 to-pink-600/20",
    border: "border-fuchsia-400/30",
  },
  {
    id: "lilies",
    emoji: "🌺",
    label: "Lilies",
    note: "Pure & special",
    color: "from-purple-500/30 to-violet-700/20",
    border: "border-purple-400/30",
  },
]

interface BouquetBuilderProps {
  onComplete: () => void
  onAdd?: () => void
}

export function BouquetBuilder({ onComplete, onAdd }: BouquetBuilderProps) {
  const [added, setAdded] = useState<string[]>([])

  function addBunch(id: string) {
    if (added.includes(id)) return
    setAdded((prev) => [...prev, id])
    onAdd?.()
  }

  const flowers = useMemo(() => buildBouquetFlowers(added), [added])
  const allAdded = added.length === bunches.length

  return (
    <motion.div
      className="relative z-10 flex w-full max-w-md flex-col items-center gap-3 px-1 sm:gap-4 sm:px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-dancing)] text-3xl text-pink-200 sm:text-4xl">
          Build your bouquet
        </h2>
        <p className="mt-1 font-[family-name:var(--font-playfair)] text-xs text-rose-200/60 sm:text-sm">
          Tap each flower — {added.length}/{bunches.length}
        </p>
      </div>

      <div className="w-full rounded-2xl border border-rose-400/20 bg-[#1a0828]/80 px-3 py-2 sm:rounded-3xl sm:px-4 sm:py-3">
        <BouquetDisplay
          flowers={flowers}
          size={added.length >= 3 ? "lg" : added.length >= 1 ? "md" : "sm"}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2 sm:gap-2.5">
        {bunches.map((bunch, i) => {
          const isAdded = added.includes(bunch.id)
          return (
            <motion.button
              key={bunch.id}
              type="button"
              onClick={() => addBunch(bunch.id)}
              disabled={isAdded}
              className={`love-tap flex min-h-[5.25rem] flex-col items-center justify-center gap-0.5 rounded-2xl border bg-linear-to-br p-2.5 active:brightness-110 sm:min-h-[5.75rem] sm:gap-1 sm:p-3 ${bunch.color} ${bunch.border} ${
                isAdded ? "opacity-50" : "cursor-pointer"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isAdded ? 0.5 : 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={!isAdded ? { scale: 0.94 } : {}}
            >
              <span
                className="text-2xl sm:text-3xl"
              >
                {bunch.emoji}
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-[11px] font-medium leading-tight text-rose-100 sm:text-xs">
                {bunch.label}
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-[10px] text-rose-200/60 italic">
                {isAdded ? "Added ♥" : bunch.note}
              </span>
            </motion.button>
          )
        })}
      </div>

      <motion.button
        type="button"
        onClick={onComplete}
        disabled={!allAdded}
        className={`love-tap min-h-12 w-full max-w-xs rounded-full px-6 py-3.5 font-[family-name:var(--font-playfair)] text-sm tracking-wider uppercase sm:max-w-sm ${
          allAdded
            ? "cursor-pointer bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-900/40 active:opacity-90"
            : "cursor-not-allowed bg-rose-900/30 text-rose-300/40"
        }`}
        whileTap={allAdded ? { scale: 0.97 } : {}}
      >
        {allAdded ? "See your big bouquet 💐" : "Add all flowers first"}
      </motion.button>
    </motion.div>
  )
}
