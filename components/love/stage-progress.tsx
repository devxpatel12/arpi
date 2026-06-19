"use client"

import { motion } from "framer-motion"

const stages = ["gift", "letter", "surprises", "finale"] as const

export function StageProgress({
  stage,
}: {
  stage: (typeof stages)[number]
}) {
  const current = stages.indexOf(stage)

  return (
    <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
      {stages.map((s, i) => (
        <motion.div
          key={s}
          className={`h-1.5 rounded-full transition-all ${
            i <= current ? "bg-rose-400" : "bg-rose-900/50"
          }`}
          animate={{ width: i <= current ? 28 : 12 }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  )
}
