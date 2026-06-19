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

export function buildBouquetFlowers(added: string[]): BouquetFlower[] {
  const pool: { emoji: string; bunch: string }[] = []
  const map: Record<string, string[]> = {
    roses: ["🌹", "🌹", "🌹", "🥀"],
    tulips: ["🌷", "🌷", "🌷"],
    cherry: ["🌸", "🌸", "🌸", "🌸"],
    lilies: ["🌺", "🏵️", "🌼"],
  }

  for (const bunch of added) {
    for (const emoji of map[bunch] ?? ["🌸"]) {
      pool.push({ emoji, bunch })
    }
  }

  return pool.map((item, i) => ({
    id: `${item.bunch}-${i}`,
    emoji: item.emoji,
    rotate: fanAngles[i % fanAngles.length] + (i % 3) * 2,
    x: (i - pool.length / 2) * 9 + (i % 2 === 0 ? 4 : -4),
    y: -Math.abs(fanAngles[i % fanAngles.length]) * 0.35 - (i % 4) * 3,
    scale: 1 + (i % 3) * 0.15,
  }))
}

interface BouquetDisplayProps {
  flowers: BouquetFlower[]
  size?: "sm" | "md" | "lg" | "mega"
}

const sizeMap = {
  sm: { wrap: "h-36 w-44", emoji: "text-2xl", ribbon: "text-xl" },
  md: { wrap: "h-48 w-56", emoji: "text-3xl", ribbon: "text-2xl" },
  lg: { wrap: "h-56 w-64", emoji: "text-4xl", ribbon: "text-3xl" },
  mega: { wrap: "h-72 w-80 sm:h-80 sm:w-96", emoji: "text-5xl sm:text-6xl", ribbon: "text-4xl" },
}

export function BouquetDisplay({ flowers, size = "md" }: BouquetDisplayProps) {
  const s = sizeMap[size]

  return (
    <div
      className={`relative flex items-end justify-center ${s.wrap}`}
      aria-hidden={flowers.length === 0}
    >
      {flowers.length === 0 ? (
        <p className="font-[family-name:var(--font-playfair)] text-sm text-rose-200/40 italic">
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
              initial={{ opacity: 0, scale: 0, y: 40, x: "-50%" }}
              animate={{
                opacity: 1,
                scale: f.scale,
                y: f.y,
                x: `calc(-50% + ${f.x}px)`,
                rotate: f.rotate,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 14,
                delay: i * 0.04,
              }}
            >
              {f.emoji}
            </motion.span>
          ))}
          <motion.div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${s.ribbon}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            🎀
          </motion.div>
          <div className="absolute bottom-0 left-1/2 h-[30%] w-3 -translate-x-1/2 rounded-full bg-emerald-700/80" />
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
      rotate: fanAngles[i % fanAngles.length] * 1.2,
      x: (i - 4) * 14,
      y: -20 - (i % 3) * 8,
      scale: 1.1 + (i % 2) * 0.2,
    })
  )

  const megaFlowers = [...flowers, ...extras]

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
    >
      <motion.div
        className="absolute -inset-8 rounded-full bg-rose-500/15 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <BouquetDisplay flowers={megaFlowers} size="mega" />
    </motion.div>
  )
}
