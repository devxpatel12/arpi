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
    note: "For my endless love",
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
    label: "Cherry Blossoms",
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
      className="relative z-10 flex w-full max-w-md flex-col items-center gap-4 px-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-dancing)] text-4xl text-pink-200">
          Build your bouquet
        </h2>
        <p className="mt-1 font-[family-name:var(--font-playfair)] text-sm text-rose-200/60">
          Tap each flower — {added.length}/4 added
        </p>
      </div>

      <div className="rounded-3xl border border-rose-400/20 bg-[#1a0828]/80 px-4 py-3">
        <BouquetDisplay
          flowers={flowers}
          size={added.length >= 3 ? "lg" : added.length >= 1 ? "md" : "sm"}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2.5">
        {bunches.map((bunch, i) => {
          const isAdded = added.includes(bunch.id)
          return (
            <motion.button
              key={bunch.id}
              type="button"
              onClick={() => addBunch(bunch.id)}
              disabled={isAdded}
              className={`flex flex-col items-center gap-1 rounded-2xl border bg-linear-to-br p-3 transition-all ${bunch.color} ${bunch.border} ${
                isAdded
                  ? "opacity-50"
                  : "cursor-pointer hover:brightness-110"
              }`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: isAdded ? 0.5 : 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileTap={!isAdded ? { scale: 0.93 } : {}}
            >
              <span className="text-3xl">{bunch.emoji}</span>
              <span className="font-[family-name:var(--font-playfair)] text-xs font-medium text-rose-100">
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
        className={`rounded-full px-8 py-3 font-[family-name:var(--font-playfair)] text-sm tracking-wider uppercase ${
          allAdded
            ? "cursor-pointer bg-linear-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-900/40"
            : "cursor-not-allowed bg-rose-900/30 text-rose-300/40"
        }`}
        whileHover={allAdded ? { scale: 1.05 } : {}}
        whileTap={allAdded ? { scale: 0.95 } : {}}
      >
        {allAdded ? "See your big bouquet 💐" : "Add all flowers first"}
      </motion.button>
    </motion.div>
  )
}
