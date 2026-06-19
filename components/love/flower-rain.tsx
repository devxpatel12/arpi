"use client"

import { motion } from "framer-motion"

const flowers = ["🌸", "🌺", "🌷", "💐", "🪻", "🌹", "🏵️", "🌼", "💮", "🌻"]

const counts = { normal: 36, wild: 65, insane: 95 } as const

export function FlowerRain({
  intensity = "normal",
}: {
  intensity?: "normal" | "wild" | "insane"
}) {
  const count = counts[intensity]
  const speedMult = intensity === "insane" ? 0.55 : intensity === "wild" ? 0.75 : 1

  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: flowers[i % flowers.length],
    left: `${(i * 7 + 3) % 98}%`,
    size: 12 + (i % 8) * 5,
    delay: (i * 0.35) % 8,
    duration: (4 + (i % 5) * 1.5) * speedMult,
    drift: (i % 2 === 0 ? 1 : -1) * (25 + (i % 5) * 20),
    spin: i % 2 === 0 ? 720 : -720,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute ${intensity === "insane" ? "opacity-50 sm:opacity-70" : intensity === "wild" ? "opacity-45 sm:opacity-60" : "opacity-40 sm:opacity-55"}`}
          style={{
            left: p.left,
            top: "-5%",
            fontSize: p.size,
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, p.drift, p.drift * -0.3, p.drift * 0.5, 0],
            rotate: [0, p.spin],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
