import { useEffect, useState } from "react";
import "./LoadingSpinner.css";

const COLD_START_DELAY_MS = 4000;

const LoadingSpinner = () => {
  const [isColdStart, setIsColdStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsColdStart(true), COLD_START_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <p className="loading-text">
          {isColdStart ? "Waking up the server…" : "Loading employees…"}
        </p>
        {isColdStart && (
          <p className="loading-note">
            This demo&apos;s backend is hosted on Render&apos;s free tier, so
            it goes to sleep when idle. The first load can take up to a minute
            — thanks for your patience!
          </p>
        )}
      </div>
    </div>
  );
};
export default LoadingSpinner;
