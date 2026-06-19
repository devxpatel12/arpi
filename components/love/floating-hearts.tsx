"use client"

import { motion } from "framer-motion"

export function FloatingHearts({
  intensity = "normal",
}: {
  intensity?: "normal" | "wild" | "insane"
}) {
  const count =
    intensity === "insane" ? 45 : intensity === "wild" ? 34 : 24

  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 11 + 7) % 100}%`,
    size: 10 + (i % 6) * 5,
    delay: (i * 0.45) % 8,
    duration:
      (intensity === "insane" ? 3 : intensity === "wild" ? 4.5 : 6) +
      (i % 4) * 1.5,
    opacity: 0.12 + (i % 4) * 0.1,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-rose-300/80"
          style={{
            left: heart.left,
            bottom: "-5%",
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -1300],
            x: [0, (heart.id % 2 === 0 ? 1 : -1) * (60 + (heart.id % 3) * 40)],
            rotate: [0, 360],
            scale: [1, 0.5, 1.4, 0.7, 1],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}
