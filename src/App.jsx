import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import { MOBILE_BREAKPOINT, CELEBRATION_SONG_PATH } from "./constants";
import FloatingHearts from "./components/FloatingHearts";
import MobileBlocker from "./components/MobileBlocker";
import ValentineQuestion from "./components/ValentineQuestion";
import Celebration from "./components/Celebration";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const CONFETTI_COLORS = ["#ff69b4", "#ff1493", "#e74c3c", "#ffffff", "#ff6b6b"];

function fireConfetti() {
  // 3 rapid bursts from center, left, right
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { x: 0.5, y: 0.6 },
    colors: CONFETTI_COLORS,
  });

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 0.5 },
      colors: CONFETTI_COLORS,
    });
  }, 300);

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.8, y: 0.5 },
      colors: CONFETTI_COLORS,
    });
  }, 600);

  // Gentle rain for 3 seconds
  let rainCount = 0;
  const rainInterval = setInterval(() => {
    confetti({
      particleCount: 10,
      startVelocity: 15,
      spread: 360,
      gravity: 0.6,
      origin: { x: Math.random(), y: 0 },
      colors: CONFETTI_COLORS,
    });
    rainCount++;
    if (rainCount >= 15) clearInterval(rainInterval);
  }, 200);
}

export default function App() {
  const isMobile = useIsMobile();
  const [screen, setScreen] = useState("question");

  const handleYesClick = useCallback(() => {
    fireConfetti();
    const audio = new Audio(CELEBRATION_SONG_PATH);
    audio.volume = 0.5;
    audio.play().catch(() => {});
    setScreen("celebration");
  }, []);

  if (isMobile) {
    return <MobileBlocker />;
  }

  return (
    <div className="app">
      <FloatingHearts />
      {screen === "question" && (
        <ValentineQuestion onYesClick={handleYesClick} />
      )}
      {screen === "celebration" && <Celebration />}
    </div>
  );
}
