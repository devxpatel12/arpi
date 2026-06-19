"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart } from "lucide-react"

import { GiftGate } from "./gift-gate"
import { BouquetBuilder } from "./bouquet-builder"
import { MegaBouquet } from "./bouquet-display"
import { ComplimentPop } from "./compliment-pop"
import { ConfettiBurst } from "./confetti-burst"
import { Fireworks } from "./fireworks"
import { FlowerRain } from "./flower-rain"
import { HeartTap } from "./heart-tap"
import { StageProgress } from "./stage-progress"

const messages = [
  { text: "I love you so much, Arpita baba. ♥", highlight: true },
  { text: "Time se khana khaya karo, baba. 🍽️", highlight: true },
  { text: "Take care, meri baba. You mean everything.", highlight: true },
  {
    text: "Every flower here — picked just for you.",
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
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-[#0a0014]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.18)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12)_0%,transparent_55%)]" />

      <FlowerRain />
      <Fireworks burstKey={fireworkKey} />
      <ConfettiBurst active={confetti} />
      <StageProgress stage={stage} />

      <main className="love-safe-top love-safe-bottom relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-4 py-4 sm:px-5">
        <AnimatePresence mode="wait">
          {stage === "gift" && (
            <motion.div
              key="gift"
              className="w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <GiftGate onOpen={openGift} onAccept={burst} />
            </motion.div>
          )}

          {stage === "letter" && (
            <motion.div
              key="letter"
              className="w-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <div className="rounded-2xl border border-rose-300/20 bg-[#1a0a2e]/95 p-5 shadow-xl sm:rounded-3xl sm:p-7">
                <div className="mb-4 flex justify-center gap-2 text-xl sm:mb-5 sm:text-2xl">
                  <span>🌹</span>
                  <Heart className="fill-rose-400 text-rose-400" />
                  <span>🌸</span>
                </div>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {messages.map((msg, i) => (
                    <motion.p
                      key={i}
                      className={`font-[family-name:var(--font-playfair)] text-[15px] leading-snug sm:text-base ${
                        msg.highlight
                          ? "rounded-xl border border-rose-400/20 bg-rose-500/10 px-3.5 py-2.5 text-rose-100 sm:px-4"
                          : "text-center text-rose-100/90"
                      }`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
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
                  className="love-tap mt-5 min-h-12 w-full cursor-pointer rounded-full bg-linear-to-r from-rose-500 to-pink-500 py-3.5 font-[family-name:var(--font-playfair)] text-sm tracking-wide text-white uppercase active:opacity-90 sm:mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  whileTap={{ scale: 0.98 }}
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
              className="flex w-full flex-col items-center gap-4 text-center sm:gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {!revealed ? (
                <>
                  <p className="font-[family-name:var(--font-playfair)] text-xs tracking-widest text-rose-200/60 uppercase sm:text-sm">
                    For my baba
                  </p>
                  <h2 className="font-[family-name:var(--font-dancing)] love-shimmer text-3xl sm:text-5xl">
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
                    className="love-tap min-h-12 cursor-pointer rounded-full bg-linear-to-r from-rose-500 to-pink-500 px-8 py-4 font-[family-name:var(--font-playfair)] text-sm tracking-wide text-white uppercase active:opacity-90 sm:px-10"
                    whileTap={{ scale: 0.97 }}
                  >
                    Open your bouquet 💐
                  </motion.button>
                </>
              ) : (
                <motion.div
                  className="flex w-full flex-col items-center gap-4 pb-2 sm:gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <MegaBouquet />

                  <h2 className="font-[family-name:var(--font-dancing)] love-shimmer text-3xl sm:text-5xl">
                    For you, Arpita
                  </h2>
                  <p className="max-w-[18rem] font-[family-name:var(--font-playfair)] text-sm text-rose-100/80 italic sm:max-w-none sm:text-base">
                    A bouquet as big as my love, baba. Every petal, for you.
                  </p>

                  <HeartTap onTap={burst} />
                  <ComplimentPop />

                  <p className="font-[family-name:var(--font-playfair)] text-sm text-rose-200/70 italic">
                    Khush raho baba, meri jaan. Always yours. ♥
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
