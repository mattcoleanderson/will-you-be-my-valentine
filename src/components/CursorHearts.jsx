import { useEffect, useState, useCallback } from "react";

let idCounter = 0;

export default function CursorHearts() {
  const [hearts, setHearts] = useState([]);

  const handleMouseMove = useCallback((e) => {
    const id = idCounter++;
    const heart = {
      id,
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 12 + 10,
      emoji: "❤️",
    };
    setHearts((prev) => [...prev.slice(-20), heart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const throttled = (e) => {
      const now = Date.now();
      if (now - lastTime < 50) return;
      lastTime = now;
      handleMouseMove(e);
    };
    window.addEventListener("mousemove", throttled);
    return () => window.removeEventListener("mousemove", throttled);
  }, [handleMouseMove]);

  return (
    <div className="cursor-hearts-container">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="cursor-heart"
          style={{
            left: h.x,
            top: h.y,
            fontSize: `${h.size}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
