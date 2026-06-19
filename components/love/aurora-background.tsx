"use client"

import { motion } from "framer-motion"

export function AuroraBackground({ intense = false }: { intense?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/4 size-[80vw] rounded-full bg-rose-600/20 blur-[100px]"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, 30, 0],
          scale: intense ? [1, 1.4, 1.1, 1] : [1, 1.2, 1, 1],
        }}
        transition={{ duration: intense ? 6 : 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-1/4 size-[70vw] rounded-full bg-purple-600/20 blur-[100px]"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, -50, 20, 0],
          scale: intense ? [1, 1.3, 1.5, 1] : [1, 1.15, 1, 1],
        }}
        transition={{ duration: intense ? 7 : 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/3 size-[60vw] rounded-full bg-pink-500/15 blur-[90px]"
        animate={{
          x: [0, 50, -70, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: intense ? 5 : 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 size-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[80px]"
        animate={{
          scale: intense ? [1, 1.8, 1.2, 1] : [1, 1.3, 1, 1],
          opacity: intense ? [0.3, 0.7, 0.4, 0.3] : [0.2, 0.4, 0.2, 0.2],
        }}
        transition={{ duration: intense ? 3 : 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
