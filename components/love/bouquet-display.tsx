"use client"

import { motion } from "framer-motion"

export interface BouquetFlower {
  id: string
  emoji: string
  rotate: number
  x: number
  y: number
  scale: number
  z: number
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

  const spread = pool.length > 12 ? 6.5 : 7.5

  return pool.map((item, i) => ({
    id: `${item.bunch}-${i}`,
    emoji: item.emoji,
    rotate: fanAngles[i % fanAngles.length] + (i % 3) * 2,
    x: (i - pool.length / 2) * spread + (i % 2 === 0 ? 2 : -2),
    y: -Math.abs(fanAngles[i % fanAngles.length]) * 0.38 - (i % 4) * 3,
    scale: 0.88 + (i % 3) * 0.14,
    z: i,
  }))
}

interface BouquetDisplayProps {
  flowers: BouquetFlower[]
  size?: "sm" | "md" | "lg" | "mega"
  showWrapper?: boolean
}

const sizeMap = {
  sm: {
    wrap: "h-44 w-full max-w-[12rem] sm:h-48 sm:max-w-[14rem]",
    emoji: "text-xl sm:text-2xl",
    stemH: "h-16",
  },
  md: {
    wrap: "h-52 w-full max-w-[14rem] sm:h-60 sm:max-w-[16rem]",
    emoji: "text-2xl sm:text-3xl",
    stemH: "h-20",
  },
  lg: {
    wrap: "h-60 w-full max-w-[16rem] sm:h-[17rem] sm:max-w-[18rem]",
    emoji: "text-3xl sm:text-4xl",
    stemH: "h-24",
  },
  mega: {
    wrap: "h-72 w-full max-w-[18rem] sm:h-80 sm:max-w-[22rem]",
    emoji: "text-4xl sm:text-5xl",
    stemH: "h-28",
  },
}

const stemAngles = [-14, -8, -3, 0, 3, 8, 14, -10, 10]

function BouquetBase({ size }: { size: keyof typeof sizeMap }) {
  const s = sizeMap[size]

  return (
    <>
      {/* Ground shadow */}
      <div className="absolute bottom-[2%] left-1/2 h-3 w-[55%] -translate-x-1/2 rounded-[100%] bg-black/25 blur-md" />

      {/* Stems bundle */}
      <div
        className="absolute bottom-[22%] left-1/2 flex -translate-x-1/2 items-end justify-center"
        aria-hidden
      >
        {stemAngles.map((angle, i) => (
          <div
            key={i}
            className={`absolute w-[3px] origin-bottom rounded-full bg-linear-to-t from-emerald-900 via-emerald-600 to-emerald-400 ${s.stemH}`}
            style={{
              transform: `rotate(${angle}deg) translateX(${(i - 4) * 2}px)`,
              opacity: 0.85 - (i % 3) * 0.08,
            }}
          />
        ))}
      </div>

      {/* Baby's breath / filler */}
      <div
        className="absolute bottom-[30%] left-1/2 -translate-x-1/2"
        aria-hidden
      >
        {[-28, -14, 0, 14, 28, -20, 20].map((x, i) => (
          <span
            key={i}
            className="absolute size-1 rounded-full bg-white/50"
            style={{ left: x, bottom: (i % 3) * 4 }}
          />
        ))}
      </div>

      {/* Kraft paper wrap — cone shape */}
      <div
        className="absolute bottom-0 left-1/2 w-[72%] -translate-x-1/2"
        style={{ height: "34%" }}
        aria-hidden
      >
        <div
          className="absolute inset-0 rounded-b-2xl bg-linear-to-b from-[#f5ebe0] via-[#e8d5c4] to-[#d4b896] shadow-[inset_0_2px_8px_rgba(255,255,255,0.35),0_4px_12px_rgba(0,0,0,0.35)]"
          style={{
            clipPath: "polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Paper fold line */}
        <div
          className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-amber-900/15"
          style={{ transform: "translateX(-50%) skewX(-2deg)" }}
        />
        {/* Paper crinkle highlight */}
        <div
          className="absolute top-[15%] left-[20%] h-[40%] w-[25%] rounded-full bg-white/20 blur-sm"
          aria-hidden
        />
      </div>

      {/* Ribbon bow */}
      <div
        className="absolute bottom-[30%] left-1/2 z-20 -translate-x-1/2"
        aria-hidden
      >
        <div className="relative flex flex-col items-center">
          <div className="flex items-center gap-0">
            <div className="size-3 -mr-1 rounded-full bg-rose-400 shadow-sm" />
            <div className="h-4 w-5 rounded-sm bg-rose-500 shadow-md" />
            <div className="size-3 -ml-1 rounded-full bg-rose-400 shadow-sm" />
          </div>
          <div className="mt-0.5 h-5 w-1 rounded-full bg-rose-600" />
          <div className="absolute top-3 flex gap-3">
            <div className="h-6 w-2 origin-top -rotate-12 rounded-b-full bg-rose-500/90" />
            <div className="h-6 w-2 origin-top rotate-12 rounded-b-full bg-rose-500/90" />
          </div>
        </div>
      </div>

      {/* Tissue paper peek */}
      <div
        className="absolute bottom-[32%] left-[18%] size-2 rotate-45 rounded-sm bg-pink-100/60"
        aria-hidden
      />
      <div
        className="absolute bottom-[34%] right-[18%] size-2 -rotate-12 rounded-sm bg-pink-100/50"
        aria-hidden
      />
    </>
  )
}

export function BouquetDisplay({
  flowers,
  size = "md",
  showWrapper = true,
}: BouquetDisplayProps) {
  const s = sizeMap[size]
  const sorted = [...flowers].sort((a, b) => a.z - b.z)

  return (
    <div
      className={`relative mx-auto flex items-end justify-center ${s.wrap}`}
      aria-hidden={flowers.length === 0}
    >
      {flowers.length === 0 ? (
        <p className="px-2 text-center font-[family-name:var(--font-playfair)] text-xs text-rose-200/40 italic sm:text-sm">
          Your bouquet grows here...
        </p>
      ) : (
        <>
          {showWrapper && <BouquetBase size={size} />}

          {sorted.map((f, i) => (
            <motion.span
              key={f.id}
              className={`absolute origin-bottom ${s.emoji}`}
              style={{
                bottom: "30%",
                left: "50%",
                zIndex: 10 + f.z,
                filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.35))",
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
                stiffness: 200,
                damping: 16,
                delay: i * 0.03,
              }}
            >
              {f.emoji}
            </motion.span>
          ))}

          {/* Front foliage accents */}
          <span
            className="absolute bottom-[32%] left-[28%] z-30 text-sm opacity-80"
            aria-hidden
          >
            🌿
          </span>
          <span
            className="absolute bottom-[31%] right-[26%] z-30 text-sm opacity-80"
            aria-hidden
          >
            🌿
          </span>
        </>
      )}
    </div>
  )
}

export function MegaBouquet({ compact }: { compact?: boolean }) {
  const allBunches = ["roses", "tulips", "cherry", "lilies"]
  const flowers = buildBouquetFlowers(allBunches)

  const extras = ["🌹", "🌷", "🌸", "🌺", "💐", "🌸", "🌹", "🌷"].map(
    (emoji, i) => ({
      id: `extra-${i}`,
      emoji,
      rotate: fanAngles[i % fanAngles.length] * 1.1,
      x: (i - 4) * 10,
      y: -18 - (i % 3) * 7,
      scale: 1 + (i % 2) * 0.12,
      z: 20 + i,
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
      <motion.div
        animate={{ rotate: [0, 0.5, -0.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <BouquetDisplay
          flowers={[...flowers, ...extras]}
          size={compact ? "md" : "mega"}
        />
      </motion.div>
    </motion.div>
  )
}
