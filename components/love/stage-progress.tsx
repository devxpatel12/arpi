"use client"

import { motion } from "framer-motion"

const stages = ["gift", "letter", "reasons", "bouquet", "finale"] as const

export function StageProgress({
  stage,
}: {
  stage: (typeof stages)[number]
}) {
  const current = stages.indexOf(stage)

  return (
    <div
      className="fixed left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 sm:gap-1.5"
      style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      {stages.map((s, i) => (
        <motion.div
          key={s}
          className={`h-1 rounded-full sm:h-1.5 ${
            i <= current ? "bg-rose-400" : "bg-rose-900/50"
          }`}
          animate={{ width: i <= current ? 18 : 8 }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  )
}
