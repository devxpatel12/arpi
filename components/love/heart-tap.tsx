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

  function tap(clientX: number, clientY: number, rect: DOMRect) {
    const x = clientX - rect.left
    const y = clientY - rect.top
    idRef.current += 1
    const popId = idRef.current

    setCount((c) => c + 1)
    setPops((prev) => [...prev.slice(-4), { id: popId, x, y }])
    onTap?.()

    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== popId))
    }, 600)
  }

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    tap(e.clientX, e.clientY, rect)
  }

  const label =
    count === 0
      ? "Tap my heart"
      : count < 5
        ? `${count} love${count > 1 ? "s" : ""} sent ♥`
        : count < 15
          ? "Keep going, baba! 💕"
          : "I feel so loved! 🥹♥"

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        type="button"
        onPointerDown={handlePointerDown}
        className="love-tap relative flex size-24 cursor-pointer select-none items-center justify-center rounded-full active:bg-rose-500/10 sm:size-28"
        whileTap={{ scale: 1.2 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ scale: { duration: 1.2, repeat: Infinity } }}
        aria-label="Send love"
      >
        <span className="pointer-events-none text-6xl sm:text-7xl">❤️</span>
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
