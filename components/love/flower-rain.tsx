"use client"

const flowers = ["🌸", "🌺", "🌷", "💐", "🌹", "🌼"]

const petals = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  emoji: flowers[i % flowers.length],
  left: `${(i * 17 + 5) % 92}%`,
  size: 12 + (i % 3) * 3,
  delay: `${(i * 0.9) % 7}s`,
  duration: `${5 + (i % 4) * 1.2}s`,
}))

export function FlowerRain() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="love-petal love-petal-mobile-hide absolute opacity-40 sm:opacity-50"
          style={{
            left: p.left,
            top: "-4%",
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
