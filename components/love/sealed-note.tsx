"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SealedNoteProps {
  compact?: boolean
}

export function SealedNote({ compact }: SealedNoteProps) {
  const [open, setOpen] = useState(false)

  const noteContent = (
    <>
      <p className="mb-2 text-center font-[family-name:var(--font-dancing)] text-xl text-pink-200 sm:text-2xl">
        A note for baba
      </p>
      <div className="mb-3 h-px w-full bg-rose-400/20" />
      <p className="font-[family-name:var(--font-playfair)] text-sm leading-relaxed text-rose-100/90 italic">
        No bouquet in the world is enough for you — but this one comes with all
        my heart. You deserve every beautiful thing, today and always.
      </p>
      <p className="mt-3 text-right font-[family-name:var(--font-dancing)] text-lg text-rose-300">
        — Yours, forever ♥
      </p>
    </>
  )

  return (
    <div className="flex flex-col items-center">
      {!open ? (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          className="love-tap group relative cursor-pointer"
          whileTap={{ scale: 0.96 }}
          animate={{ y: [0, -3, 0] }}
          transition={{ y: { duration: 2.5, repeat: Infinity } }}
        >
          <div
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl border border-amber-400/30 bg-linear-to-br from-amber-100/15 to-amber-900/20 shadow-lg shadow-amber-900/20 ${
              compact
                ? "min-h-[4.5rem] min-w-[7.5rem] px-4 py-2.5"
                : "min-h-[5.5rem] min-w-[10rem] gap-1 px-6 py-4"
            }`}
          >
            <span className={compact ? "text-2xl" : "text-3xl"}>💌</span>
            <span className="font-[family-name:var(--font-playfair)] text-[10px] tracking-widest text-amber-100/80 uppercase">
              Sealed note
            </span>
          </div>
          <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[9px] text-white shadow-md">
            1
          </div>
        </motion.button>
      ) : compact ? (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-xs rounded-2xl border border-rose-300/25 bg-linear-to-br from-[#2a1040]/95 to-[#1a0828]/95 p-5 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {noteContent}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="love-tap mt-4 w-full rounded-full border border-rose-400/30 py-2 font-[family-name:var(--font-playfair)] text-xs text-rose-200"
              >
                Close ♥
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          className="w-full max-w-xs rounded-2xl border border-rose-300/25 bg-linear-to-br from-[#2a1040]/95 to-[#1a0828]/95 p-5 shadow-xl"
          initial={{ opacity: 0, rotateX: -15, scale: 0.9 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          {noteContent}
        </motion.div>
      )}
    </div>
  )
}
