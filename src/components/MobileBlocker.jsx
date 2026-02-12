import { MOBILE_WARNING } from "../constants";

export default function MobileBlocker() {
  return (
    <div className="mobile-blocker">
      <div className="mobile-blocker-content">
        <span className="mobile-blocker-emoji">💔</span>
        <p className="mobile-blocker-text">{MOBILE_WARNING}</p>
      </div>
    </div>
  );
}
