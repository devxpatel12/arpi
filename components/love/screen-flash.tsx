"use client"

import { motion, AnimatePresence } from "framer-motion"

export function ScreenFlash({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] bg-rose-200"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  )
}
