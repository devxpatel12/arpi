"use client"

import { motion } from "framer-motion"

interface GlitterTextProps {
  children: React.ReactNode
  className?: string
}

export function GlitterText({ children, className = "" }: GlitterTextProps) {
  return (
    <motion.span
      className={`relative inline-block bg-linear-to-r from-rose-300 via-yellow-200 via-50% to-purple-300 bg-size-[200%_auto] bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["0% center", "200% center", "0% center"],
        scale: [1, 1.02, 1],
      }}
      transition={{
        backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {children}
      <motion.span
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent bg-size-[200%_100%] bg-clip-text text-transparent"
        animate={{ backgroundPosition: ["200% center", "-200% center"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        {children}
      </motion.span>
    </motion.span>
  )
}
