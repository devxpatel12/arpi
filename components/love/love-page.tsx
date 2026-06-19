"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart } from "lucide-react"

import { BouquetBuilder } from "./bouquet-builder"
import { MegaBouquet } from "./bouquet-display"
import { ComplimentPop } from "./compliment-pop"
import { ConfettiBurst } from "./confetti-burst"
import { Fireworks } from "./fireworks"
import { FlowerRain } from "./flower-rain"
import { HeartTap } from "./heart-tap"
import { StageProgress } from "./stage-progress"

const messages = [
  { text: "I love you so much, Arpita. ♥", highlight: true },
  { text: "Time se khana khaya karo, meri jaan.", highlight: true },
  { text: "Take care, my baby.", highlight: true },
  {
    text: "I picked every flower in this bouquet — just for you.",
    highlight: false,
  },
]

type Stage = "gift" | "letter" | "bouquet" | "finale"

export function LovePage() {
  const [stage, setStage] = useState<Stage>("gift")
  const [revealed, setRevealed] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [fireworkKey, setFireworkKey] = useState(0)

  function burst() {
    setFireworkKey((k) => k + 1)
  }

  function openGift() {
    setConfetti(true)
    burst()
    setTimeout(() => setStage("letter"), 500)
    setTimeout(() => setConfetti(false), 1500)
  }

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0a0014] px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.18)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12)_0%,transparent_55%)]" />

      <FlowerRain />
      <Fireworks burstKey={fireworkKey} />
      <ConfettiBurst active={confetti} />
      <StageProgress stage={stage} />

      <AnimatePresence mode="wait">
        {stage === "gift" && (
          <motion.div
            key="gift"
            className="relative z-10 flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <p className="font-[family-name:var(--font-playfair)] text-sm tracking-[0.25em] text-rose-200/70 uppercase">
              A bouquet for you
            </p>
            <h1 className="font-[family-name:var(--font-dancing)] love-shimmer text-6xl sm:text-8xl">
              Arpita
            </h1>

            <motion.button
              type="button"
              onClick={openGift}
              className="relative cursor-pointer"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="flex size-40 flex-col items-center justify-center rounded-2xl border border-rose-400/30 bg-linear-to-br from-rose-600/40 to-emerald-900/30 shadow-xl sm:size-44">
                <span className="text-6xl sm:text-7xl">💐</span>
                <span className="mt-2 font-[family-name:var(--font-playfair)] text-sm text-rose-100">
                  Unwrap your flowers
                </span>
              </div>
            </motion.button>
          </motion.div>
        )}

        {stage === "letter" && (
          <motion.div
            key="letter"
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="rounded-3xl border border-rose-300/20 bg-[#1a0a2e]/95 p-7 shadow-xl sm:p-8">
              <div className="mb-5 flex justify-center gap-2 text-2xl">
                <span>🌹</span>
                <Heart className="fill-rose-400 text-rose-400" />
                <span>🌸</span>
              </div>
              <div className="flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <motion.p
                    key={i}
                    className={`font-[family-name:var(--font-playfair)] text-base sm:text-lg ${
                      msg.highlight
                        ? "rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-2.5 text-rose-100"
                        : "text-center text-rose-100/90"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.35 }}
                  >
                    {msg.text}
                  </motion.p>
                ))}
              </div>
              <motion.button
                type="button"
                onClick={() => {
                  burst()
                  setStage("bouquet")
                }}
                className="mt-6 w-full cursor-pointer rounded-full bg-linear-to-r from-rose-500 to-pink-500 py-3 font-[family-name:var(--font-playfair)] text-sm tracking-wider text-white uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                whileTap={{ scale: 0.97 }}
              >
                Build your bouquet 🌸
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === "bouquet" && (
          <BouquetBuilder
            key="bouquet"
            onAdd={burst}
            onComplete={() => {
              burst()
              setStage("finale")
            }}
          />
        )}

        {stage === "finale" && (
          <motion.div
            key="finale"
            className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {!revealed ? (
              <>
                <p className="font-[family-name:var(--font-playfair)] text-sm tracking-widest text-rose-200/60 uppercase">
                  For my flower girl
                </p>
                <h2 className="font-[family-name:var(--font-dancing)] love-shimmer text-4xl sm:text-5xl">
                  You&apos;re my everything
                </h2>
                <motion.button
                  type="button"
                  onClick={() => {
                    setRevealed(true)
                    setConfetti(true)
                    burst()
                    setTimeout(() => setConfetti(false), 1500)
                  }}
                  className="cursor-pointer rounded-full bg-linear-to-r from-rose-500 to-pink-500 px-10 py-4 font-[family-name:var(--font-playfair)] text-sm tracking-wider text-white uppercase"
                  whileTap={{ scale: 0.95 }}
                >
                  Open your bouquet 💐
                </motion.button>
              </>
            ) : (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MegaBouquet />

                <h2 className="font-[family-name:var(--font-dancing)] love-shimmer text-4xl sm:text-5xl">
                  For you, Arpita
                </h2>
                <p className="font-[family-name:var(--font-playfair)] text-sm text-rose-100/80 italic sm:text-base">
                  A bouquet as big as my love — every petal, just for you.
                </p>

                <HeartTap onTap={burst} />
                <ComplimentPop />

                <p className="font-[family-name:var(--font-playfair)] text-sm text-rose-200/70 italic">
                  Khush raho meri jaan. Always yours. ♥
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
