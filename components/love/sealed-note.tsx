"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function SealedNote() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-full flex-col items-center gap-3">
      {!open ? (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          className="love-tap group relative cursor-pointer"
          whileTap={{ scale: 0.96 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ y: { duration: 2.5, repeat: Infinity } }}
        >
          <div className="flex min-h-[5.5rem] min-w-[10rem] flex-col items-center justify-center gap-1 rounded-xl border border-amber-400/30 bg-linear-to-br from-amber-100/15 to-amber-900/20 px-6 py-4 shadow-lg shadow-amber-900/20">
            <span className="text-3xl">💌</span>
            <span className="font-[family-name:var(--font-playfair)] text-xs tracking-widest text-amber-100/80 uppercase">
              Sealed note
            </span>
            <span className="font-[family-name:var(--font-playfair)] text-[10px] text-rose-200/50 italic">
              Tap to open
            </span>
          </div>
          <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white shadow-md">
            1
          </div>
        </motion.button>
      ) : (
        <motion.div
          className="w-full max-w-xs rounded-2xl border border-rose-300/25 bg-linear-to-br from-[#2a1040]/95 to-[#1a0828]/95 p-5 shadow-xl"
          initial={{ opacity: 0, rotateX: -15, scale: 0.9 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <p className="mb-2 text-center font-[family-name:var(--font-dancing)] text-2xl text-pink-200">
            A note for baba
          </p>
          <div className="mb-3 h-px w-full bg-rose-400/20" />
          <p className="font-[family-name:var(--font-playfair)] text-sm leading-relaxed text-rose-100/90 italic">
            No bouquet in the world is enough for you — but this one comes
            with all my heart. You deserve every beautiful thing, today and
            always.
          </p>
          <p className="mt-3 text-right font-[family-name:var(--font-dancing)] text-lg text-rose-300">
            — Yours, forever ♥
          </p>
        </motion.div>
      )}
    </div>
  )
}
