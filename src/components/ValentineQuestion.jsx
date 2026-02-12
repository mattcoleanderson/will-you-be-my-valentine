import { useState, useEffect, useRef, useCallback } from "react";
import { QUESTION_TEXT, YES_TEXT, NO_TEXT, VOLUME_HINT } from "../constants";

const NO_OPTION_TEXT = 'You thought "no" was an option? 😉';

export default function ValentineQuestion({ onYesClick }) {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [tauntText, setTauntText] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const yesBtnRef = useRef(null);
  const btnWidth = useRef(0);
  const btnHeight = useRef(0);

  // Typing animation for question
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(QUESTION_TEXT.slice(0, i));
      if (i >= QUESTION_TEXT.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for taunt
  useEffect(() => {
    if (!isFollowing) return;
    let i = 0;
    setTauntText("");
    const interval = setInterval(() => {
      i++;
      setTauntText(NO_OPTION_TEXT.slice(0, i));
      if (i >= NO_OPTION_TEXT.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [isFollowing]);

  // Measure Yes button dimensions
  useEffect(() => {
    if (yesBtnRef.current) {
      const rect = yesBtnRef.current.getBoundingClientRect();
      btnWidth.current = rect.width;
      btnHeight.current = rect.height;
    }
  }, [typingDone]);

  // Mouse move listener when following
  useEffect(() => {
    if (!isFollowing) return;

    const handleMouseMove = (e) => {
      const halfW = btnWidth.current / 2;
      const halfH = btnHeight.current / 2;
      const x = Math.max(halfW, Math.min(e.clientX, window.innerWidth - halfW));
      const y = Math.max(halfH, Math.min(e.clientY, window.innerHeight - halfH));
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFollowing]);

  const handleNoHover = useCallback(() => {
    if (isFollowing) return;
    // Seed mousePos from Yes button's current center to prevent jump
    if (yesBtnRef.current) {
      const rect = yesBtnRef.current.getBoundingClientRect();
      btnWidth.current = rect.width;
      btnHeight.current = rect.height;
      setMousePos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsFollowing(true);
  }, [isFollowing]);

  const yesBtnStyle = isFollowing
    ? {
        position: "fixed",
        left: mousePos.x - btnWidth.current / 2,
        top: mousePos.y - btnHeight.current / 2,
        zIndex: 10000,
        transition: "none",
      }
    : {};

  return (
    <div className="question-container">
      <p className="volume-hint">{VOLUME_HINT}</p>
      <h1 className="question-text">
        {isFollowing ? (
          <>
            {tauntText}
            <span className="caret blink">|</span>
          </>
        ) : (
          <>
            {displayedText}
            <span className={`caret ${typingDone ? "blink" : ""}`}>|</span>
          </>
        )}
      </h1>

      <div className={`buttons-container ${typingDone ? "visible" : ""}`}>
          <button
            ref={yesBtnRef}
            className="btn btn-yes"
            style={yesBtnStyle}
            onClick={onYesClick}
          >
            {YES_TEXT}
          </button>
          <button
            className={`btn btn-no ${isFollowing ? "disabled" : ""}`}
            onMouseEnter={handleNoHover}
            style={isFollowing ? { pointerEvents: "none" } : {}}
          >
            {NO_TEXT}
          </button>
      </div>
    </div>
  );
}
