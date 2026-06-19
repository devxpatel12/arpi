"use client"

import { motion } from "framer-motion"

export function Sparkles({
  intensity = "normal",
}: {
  intensity?: "normal" | "wild" | "insane"
}) {
  const count =
    intensity === "insane" ? 80 : intensity === "wild" ? 60 : 40

  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${(i * 17 + 11) % 95}%`,
    left: `${(i * 23 + 5) % 95}%`,
    size: 1.5 + (i % 5),
    delay: (i * 0.2) % 3,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, intensity === "insane" ? 2.5 : 1.5, 0],
          }}
          transition={{
            duration: intensity === "insane" ? 1.5 : 2.5,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
