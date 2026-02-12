import { useMemo } from "react";

const HEART_COUNT = 20;

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: HEART_COUNT }, (_, i) => {
      const size = Math.random() * 20 + 12;
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 6 + 8;
      const opacity = Math.random() * 0.4 + 0.15;
      const drift = (Math.random() - 0.5) * 120;

      return (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${left}%`,
            fontSize: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            opacity,
            "--drift": `${drift}px`,
          }}
        >
          ❤
        </span>
      );
    });
  }, []);

  return <div className="floating-hearts-container">{hearts}</div>;
}
