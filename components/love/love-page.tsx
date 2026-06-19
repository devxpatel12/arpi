"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Gift, Heart, Sparkles as SparklesIcon } from "lucide-react"

import { AuroraBackground } from "./aurora-background"
import { ConfettiBurst } from "./confetti-burst"
import { CursorTrail } from "./cursor-trail"
import { Fireworks } from "./fireworks"
import { FloatingFavorites } from "./floating-favorites"
import { FloatingHearts } from "./floating-hearts"
import { FloatingLoveWords } from "./floating-love-words"
import { FlowerRain } from "./flower-rain"
import { GlitterText } from "./glitter-text"
import { ScreenFlash } from "./screen-flash"
import { Sparkles } from "./sparkles"
import { WishCards } from "./wish-cards"

const innerOrbit = ["🌸", "♥", "🌷", "💐"]
const outerOrbit = ["✨", "💕", "🌺", "♥"]

const messages = [
  { text: "My dearest Arpita,", delay: 0.3 },
  {
    text: "I love you so much — more than words can ever say.",
    delay: 0.8,
  },
  {
    text: "You are the most beautiful part of my life.",
    delay: 1.3,
  },
  {
    text: "Time se khana khaya karo, meri jaan. 🍽️",
    delay: 1.8,
    highlight: true,
  },
  {
    text: "Take care of yourself, my baby. You mean everything to me.",
    delay: 2.3,
    highlight: true,
  },
  {
    text: "Every smile of yours lights up my world.",
    delay: 2.8,
  },
  {
    text: "Being yours is the greatest gift of my life — and I fall for you more every single day.",
    delay: 3.3,
  },
  {
    text: "I promise to always cherish you, protect you, and love you endlessly.",
    delay: 3.8,
  },
]

type Stage = "gift" | "letter" | "surprises" | "finale"
type Intensity = "normal" | "wild" | "insane"

function getIntensity(stage: Stage, showFinale: boolean): Intensity {
  if (showFinale || stage === "finale") return "insane"
  if (stage === "surprises") return "wild"
  if (stage === "letter") return "wild"
  return "normal"
}

export function LovePage() {
  const [stage, setStage] = useState<Stage>("gift")
  const [showFinale, setShowFinale] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const [fireworkKey, setFireworkKey] = useState(0)

  const showFavorites = stage === "surprises" || stage === "finale"
  const intensity = getIntensity(stage, showFinale)
  const auroraIntense = stage !== "gift"

  function triggerBurst() {
    setFireworkKey((k) => k + 1)
  }

  function triggerShake() {
    setShakeKey((k) => k + 1)
  }

  function openGift() {
    setShowFlash(true)
    setShowConfetti(true)
    triggerBurst()
    triggerShake()
    setTimeout(() => setShowFlash(false), 600)
    setTimeout(() => setStage("letter"), 700)
    setTimeout(() => setShowConfetti(false), 2500)
    setTimeout(() => triggerBurst(), 400)
  }

  function goToSurprises() {
    triggerBurst()
    triggerShake()
    setStage("surprises")
  }

  function goToFinale() {
    triggerBurst()
    setStage("finale")
  }

  function revealFinale() {
    setShowFlash(true)
    triggerBurst()
    triggerShake()
    setShowFinale(true)
    setTimeout(() => setShowFlash(false), 500)
    setTimeout(() => triggerBurst(), 300)
    setTimeout(() => triggerBurst(), 700)
  }

  return (
    <motion.div
      key={shakeKey}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0a0014] px-4 py-12"
      animate={
        shakeKey > 0
          ? { x: [0, -8, 8, -6, 6, -3, 3, 0], y: [0, 4, -4, 3, -3, 0] }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.5 }}
    >
      <AuroraBackground intense={auroraIntense || showFinale} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.2)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.15)_0%,transparent_50%)]" />

      <FlowerRain intensity={intensity} />
      <FloatingHearts intensity={intensity} />
      {showFavorites && <FloatingFavorites />}
      <Sparkles intensity={intensity} />
      <FloatingLoveWords visible={stage !== "gift"} />
      <CursorTrail />
      <Fireworks burstKey={fireworkKey} />
      <ConfettiBurst active={showConfetti} />
      <ScreenFlash active={showFlash} />

      {/* Heartbeat pulse overlay on insane mode */}
      {intensity === "insane" && (
        <motion.div
          className="pointer-events-none fixed inset-0 bg-rose-500/5"
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <AnimatePresence mode="wait">
        {stage === "gift" && (
          <motion.div
            key="gift"
            className="relative z-10 flex flex-col items-center gap-8 text-center"
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(12px)", rotate: 5 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <motion.p
              className="font-[family-name:var(--font-playfair)] text-lg tracking-[0.3em] text-rose-200/80 uppercase"
              animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              A special gift for you
            </motion.p>

            <motion.h1
              className="font-[family-name:var(--font-dancing)] text-6xl sm:text-8xl"
              initial={{ y: 30, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            >
              <GlitterText>Arpita</GlitterText>
            </motion.h1>

            <div className="relative flex size-64 items-center justify-center sm:size-72">
              {/* Outer orbit — reverse */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                {outerOrbit.map((emoji, i) => (
                  <span
                    key={`outer-${emoji}-${i}`}
                    className="absolute top-1/2 left-1/2 text-xl sm:text-2xl"
                    style={{
                      transform: `rotate(${i * 90}deg) translateY(-110px) rotate(-${i * 90}deg)`,
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </motion.div>

              {/* Inner orbit */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {innerOrbit.map((emoji, i) => (
                  <span
                    key={`inner-${emoji}-${i}`}
                    className="absolute top-1/2 left-1/2 text-2xl sm:text-3xl"
                    style={{
                      transform: `rotate(${i * 90}deg) translateY(-75px) rotate(-${i * 90}deg)`,
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </motion.div>

              {/* Pulsing rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full border border-rose-400/20"
                  style={{ width: 160 + ring * 30, height: 160 + ring * 30 }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{
                    duration: 2 + ring * 0.5,
                    repeat: Infinity,
                    delay: ring * 0.3,
                  }}
                />
              ))}

              <motion.button
                type="button"
                onClick={openGift}
                className="group relative cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.88 }}
                animate={{ y: [0, -14, 0] }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <motion.div
                  className="absolute -inset-6 rounded-3xl bg-rose-500/25 blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative flex size-44 flex-col items-center justify-center rounded-2xl border-2 border-rose-400/40 bg-linear-to-br from-rose-600/50 via-pink-700/40 to-purple-800/50 shadow-2xl shadow-rose-900/60 backdrop-blur-sm sm:size-52">
                  <motion.div
                    className="absolute -top-3 left-1/2 size-8 -translate-x-1/2 rounded-full bg-rose-400 shadow-lg shadow-rose-500/50"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute top-0 left-1/2 h-full w-4 -translate-x-1/2 bg-rose-400/80" />
                  <div className="absolute top-10 left-0 h-4 w-full bg-rose-400/80" />

                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Gift className="size-16 text-rose-100 drop-shadow-lg sm:size-20" />
                  </motion.div>
                  <motion.p
                    className="mt-2 font-[family-name:var(--font-playfair)] text-xs text-rose-100 sm:text-sm"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Tap to open ✨
                  </motion.p>
                </div>
              </motion.button>
            </div>

            <motion.p
              className="max-w-xs font-[family-name:var(--font-playfair)] text-sm text-rose-200/60 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Something beautiful is waiting inside, just for you...
            </motion.p>
          </motion.div>
        )}

        {stage === "letter" && (
          <motion.div
            key="letter"
            className="relative z-10 w-full max-w-lg"
            initial={{ opacity: 0, rotateX: -25, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
          >
            <motion.div
              className="absolute -inset-1 rounded-3xl bg-linear-to-r from-rose-500 via-pink-500 to-purple-500 opacity-40 blur-lg"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative overflow-hidden rounded-3xl border border-rose-300/30 bg-linear-to-br from-[#1a0a2e]/95 via-[#2d1045]/95 to-[#1a0a2e]/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <motion.div
                className="pointer-events-none absolute -top-20 -right-20 size-40 rounded-full bg-rose-500/15 blur-3xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <motion.div
                className="mb-6 flex items-center justify-center gap-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Heart className="fill-rose-400 text-rose-400" />
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity },
                  }}
                >
                  <SparklesIcon className="text-amber-200" />
                </motion.div>
                <Heart className="fill-rose-400 text-rose-400" />
              </motion.div>

              <div className="flex flex-col gap-5">
                {messages.map((msg, i) => (
                  <motion.p
                    key={i}
                    className={`font-[family-name:var(--font-playfair)] text-base leading-relaxed sm:text-lg ${
                      msg.highlight
                        ? "rounded-xl border border-rose-400/30 bg-rose-500/15 px-4 py-3 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                        : "text-rose-100/90"
                    }`}
                    initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: msg.delay,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    {msg.text}
                  </motion.p>
                ))}
              </div>

              <motion.div
                className="mt-8 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5, type: "spring" }}
              >
                <motion.p
                  className="font-[family-name:var(--font-dancing)] text-3xl text-pink-200 sm:text-4xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Forever yours ♥
                </motion.p>
                <motion.button
                  type="button"
                  onClick={goToSurprises}
                  className="cursor-pointer rounded-full bg-linear-to-r from-rose-500 via-pink-500 to-purple-500 px-8 py-3 font-[family-name:var(--font-playfair)] text-sm tracking-wider text-white uppercase shadow-lg shadow-rose-900/50"
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  whileTap={{ scale: 0.92 }}
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(244,63,94,0.3)",
                      "0 0 30px rgba(244,63,94,0.6)",
                      "0 0 15px rgba(244,63,94,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Unwrap your surprises... 🎁
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage === "surprises" && (
          <WishCards
            key="surprises"
            onComplete={goToFinale}
            onFlip={triggerBurst}
          />
        )}

        {stage === "finale" && (
          <motion.div
            key="finale"
            className="relative z-10 flex flex-col items-center gap-8 text-center"
            initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            {!showFinale ? (
              <>
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 8, -8, 0], y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    className="absolute -inset-12 rounded-full bg-rose-500/25 blur-3xl"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="relative flex size-36 items-center justify-center rounded-full border-2 border-rose-300/50 bg-linear-to-br from-rose-100/15 to-pink-500/25 shadow-2xl sm:size-44"
                    animate={{
                      boxShadow: [
                        "0 0 40px rgba(244,63,94,0.4)",
                        "0 0 80px rgba(244,63,94,0.7)",
                        "0 0 40px rgba(244,63,94,0.4)",
                      ],
                      scale: [1, 1.08, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-7xl sm:text-8xl">💐</span>
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="font-[family-name:var(--font-dancing)] text-4xl sm:text-6xl"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <GlitterText>You&apos;re my everything, Arpita</GlitterText>
                </motion.h2>

                <motion.p
                  className="max-w-md font-[family-name:var(--font-playfair)] text-base text-rose-200/80 italic sm:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  I&apos;m so lucky to call you mine. Every day with you feels
                  like a blessing — and I wouldn&apos;t trade us for anything
                  in this world.
                </motion.p>

                <motion.button
                  type="button"
                  onClick={revealFinale}
                  className="cursor-pointer rounded-full bg-linear-to-r from-rose-500 via-pink-500 to-purple-500 px-12 py-5 font-[family-name:var(--font-playfair)] text-base tracking-wider text-white uppercase shadow-xl shadow-rose-900/50"
                  whileHover={{ scale: 1.12, rotate: -2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: [1, 1.06, 1],
                    boxShadow: [
                      "0 0 25px rgba(244,63,94,0.4)",
                      "0 0 50px rgba(244,63,94,0.8)",
                      "0 0 25px rgba(244,63,94,0.4)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  I love you, my baby ♥
                </motion.button>
              </>
            ) : (
              <motion.div
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
              >
                <motion.div
                  className="text-8xl sm:text-9xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  💕
                </motion.div>

                <h2 className="font-[family-name:var(--font-dancing)] text-5xl sm:text-7xl">
                  <GlitterText>I love you, Arpita!</GlitterText>
                </h2>

                <motion.p
                  className="max-w-md font-[family-name:var(--font-playfair)] text-lg text-rose-100/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Khush raho, meri jaan — time se khana khaya karo aur apna
                  khayal rakho. You make my world complete, and I will always
                  be here for you, my baby. ♥
                </motion.p>

                <motion.div
                  className="flex w-full max-w-md flex-col gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <p className="font-[family-name:var(--font-playfair)] text-sm tracking-widest text-rose-300/60 uppercase">
                    Little treats I have planned for you
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { emoji: "👗", text: "Dress shopping spree" },
                      { emoji: "💅", text: "Nail extension day" },
                      { emoji: "🧇", text: "Belgian waffle treat" },
                      { emoji: "🍫", text: "Kinder Joy for you" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.text}
                        className="flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/15 px-3 py-2.5 shadow-[0_0_10px_rgba(244,63,94,0.1)]"
                        initial={{ opacity: 0, scale: 0, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.6 + i * 0.15,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                      >
                        <motion.span
                          animate={{
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        >
                          {item.emoji}
                        </motion.span>
                        <span className="font-[family-name:var(--font-playfair)] text-xs text-rose-100/90 sm:text-sm">
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="flex gap-3">
                  {["🌸", "♥", "🌷", "♥", "🌺", "♥", "💐"].map((h, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl text-rose-400"
                      animate={{
                        y: [0, -15, 0],
                        scale: [1, 1.3, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        y: { duration: 0.8, repeat: Infinity, delay: i * 0.1 },
                        scale: { duration: 0.8, repeat: Infinity, delay: i * 0.1 },
                        rotate: {
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "linear",
                        },
                      }}
                    >
                      {h}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
