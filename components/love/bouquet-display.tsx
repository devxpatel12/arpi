"use client"

import { motion } from "framer-motion"

export interface BouquetFlower {
  id: string
  emoji: string
  rotate: number
  x: number
  y: number
  scale: number
}

const fanAngles = [-42, -28, -14, 0, 14, 28, 42, -35, -21, -7, 7, 21, 35]

const bunchMap: Record<string, { emojis: string[] }> = {
  roses: { emojis: ["🌹", "🌹", "🌹", "🥀"] },
  tulips: { emojis: ["🌷", "🌷", "🌷"] },
  cherry: { emojis: ["🌸", "🌸", "🌸", "🌸"] },
  lilies: { emojis: ["🌺", "🏵️", "🌼"] },
}

export function buildBouquetFlowers(added: string[]): BouquetFlower[] {
  const pool: { emoji: string; bunch: string }[] = []

  for (const bunch of added) {
    const config = bunchMap[bunch]
    if (!config) continue
    for (const emoji of config.emojis) {
      pool.push({ emoji, bunch })
    }
  }

  const spread = pool.length > 12 ? 7 : 8

  return pool.map((item, i) => ({
    id: `${item.bunch}-${i}`,
    emoji: item.emoji,
    rotate: fanAngles[i % fanAngles.length] + (i % 3) * 2,
    x: (i - pool.length / 2) * spread + (i % 2 === 0 ? 3 : -3),
    y: -Math.abs(fanAngles[i % fanAngles.length]) * 0.32 - (i % 4) * 2.5,
    scale: 0.9 + (i % 3) * 0.12,
  }))
}

interface BouquetDisplayProps {
  flowers: BouquetFlower[]
  size?: "sm" | "md" | "lg" | "mega"
}

const sizeMap = {
  sm: {
    wrap: "h-32 w-full max-w-[11rem] sm:h-36 sm:max-w-[13rem]",
    emoji: "text-xl sm:text-2xl",
    ribbon: "text-lg sm:text-xl",
  },
  md: {
    wrap: "h-40 w-full max-w-[13rem] sm:h-48 sm:max-w-[15rem]",
    emoji: "text-2xl sm:text-3xl",
    ribbon: "text-xl sm:text-2xl",
  },
  lg: {
    wrap: "h-48 w-full max-w-[15rem] sm:h-56 sm:max-w-[17rem]",
    emoji: "text-3xl sm:text-4xl",
    ribbon: "text-2xl sm:text-3xl",
  },
  mega: {
    wrap: "h-56 w-full max-w-[17rem] sm:h-72 sm:max-w-[22rem]",
    emoji: "text-4xl sm:text-5xl",
    ribbon: "text-3xl sm:text-4xl",
  },
}

export function BouquetDisplay({ flowers, size = "md" }: BouquetDisplayProps) {
  const s = sizeMap[size]

  return (
    <div
      className={`relative mx-auto flex items-end justify-center overflow-hidden ${s.wrap}`}
      aria-hidden={flowers.length === 0}
    >
      {flowers.length === 0 ? (
        <p className="px-2 text-center font-[family-name:var(--font-playfair)] text-xs text-rose-200/40 italic sm:text-sm">
          Your bouquet grows here...
        </p>
      ) : (
        <>
          {flowers.map((f, i) => (
            <motion.span
              key={f.id}
              className={`absolute origin-bottom ${s.emoji}`}
              style={{
                bottom: "28%",
                left: "50%",
              }}
              initial={{ opacity: 0, scale: 0, y: 30, x: "-50%" }}
              animate={{
                opacity: 1,
                scale: f.scale,
                y: f.y,
                x: `calc(-50% + ${f.x}px)`,
                rotate: f.rotate,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 16,
                delay: i * 0.03,
              }}
            >
              {f.emoji}
            </motion.span>
          ))}
          <motion.div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${s.ribbon}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring" }}
          >
            🎀
          </motion.div>
          <div className="absolute bottom-0 left-1/2 h-[28%] w-2.5 -translate-x-1/2 rounded-full bg-emerald-700/80 sm:w-3" />
        </>
      )}
    </div>
  )
}

export function MegaBouquet() {
  const allBunches = ["roses", "tulips", "cherry", "lilies"]
  const flowers = buildBouquetFlowers(allBunches)

  const extras = ["🌹", "🌷", "🌸", "🌺", "💐", "🌸", "🌹", "🌷"].map(
    (emoji, i) => ({
      id: `extra-${i}`,
      emoji,
      rotate: fanAngles[i % fanAngles.length] * 1.1,
      x: (i - 4) * 11,
      y: -16 - (i % 3) * 6,
      scale: 1 + (i % 2) * 0.15,
    })
  )

  return (
    <motion.div
      className="relative w-full"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 14 }}
    >
      <div className="pointer-events-none absolute -inset-4 rounded-full bg-rose-500/15 blur-2xl sm:-inset-8 sm:blur-3xl" />
      <BouquetDisplay flowers={[...flowers, ...extras]} size="mega" />
    </motion.div>
  )
}
