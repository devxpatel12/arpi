"use client"

const flowers = ["🌸", "🌺", "🌷", "💐", "🌹", "🌼"]

const petals = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  emoji: flowers[i % flowers.length],
  left: `${(i * 17 + 5) % 92}%`,
  size: 14 + (i % 3) * 4,
  delay: `${(i * 0.9) % 7}s`,
  duration: `${5 + (i % 4) * 1.2}s`,
}))

export function FlowerRain() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="love-petal absolute opacity-50"
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
