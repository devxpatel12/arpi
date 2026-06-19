"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface HeartTapProps {
  onTap?: () => void
}

export function HeartTap({ onTap }: HeartTapProps) {
  const [count, setCount] = useState(0)
  const [pops, setPops] = useState<{ id: number; x: number; y: number }[]>([])
  const idRef = useRef(0)

  function tap(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    idRef.current += 1
    const popId = idRef.current

    setCount((c) => c + 1)
    setPops((prev) => [...prev.slice(-4), { id: popId, x, y }])
    onTap?.()

    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== popId))
    }, 600)
  }

  const label =
    count === 0
      ? "Tap my heart"
      : count < 5
        ? `${count} love${count > 1 ? "s" : ""} sent ♥`
        : count < 15
          ? "Keep going, baby! 💕"
          : "I feel so loved! 🥹♥"

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        type="button"
        onClick={tap}
        className="relative cursor-pointer select-none text-7xl sm:text-8xl"
        whileTap={{ scale: 1.25 }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ scale: { duration: 1.2, repeat: Infinity } }}
        aria-label="Send love"
      >
        ❤️
        {pops.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute text-2xl"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 1, scale: 0.5, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0, scale: 2, y: "-200%" }}
            transition={{ duration: 0.6 }}
          >
            ♥
          </motion.span>
        ))}
      </motion.button>
      <p className="font-[family-name:var(--font-playfair)] text-sm text-rose-200/70">
        {label}
      </p>
    </div>
  )
}
