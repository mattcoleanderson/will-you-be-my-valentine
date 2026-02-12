import { useState } from "react";
import { COUPLE_PHOTO_PATH, CELEBRATION_CAPTION } from "../constants";

export default function Celebration() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="celebration-container">
      <div className="photo-frame">
        {!imgError && (
          <img
            src={COUPLE_PHOTO_PATH}
            alt="Us"
            className="couple-photo"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <p className="celebration-caption">{CELEBRATION_CAPTION}</p>
    </div>
  );
}
