import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export const Confetti = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isActive) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#9b87f5", "#1A1F2C", "#8E9196"],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#9b87f5", "#1A1F2C", "#8E9196"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();

      setTimeout(() => setIsActive(false), duration);
    }
  }, [isActive]);

  return null;
};