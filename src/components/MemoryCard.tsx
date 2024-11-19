import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MemoryCardProps {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const MemoryCard = ({
  content,
  isFlipped,
  isMatched,
  onClick,
}: MemoryCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isFlipped) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  return (
    <div
      onClick={!isFlipped && !isMatched ? onClick : undefined}
      className={cn(
        "memory-card w-32 h-44 cursor-pointer",
        isFlipped && "flipped",
        isAnimating && "animate-card-flip"
      )}
    >
      <div className="memory-card-front absolute w-full h-full">
        <div className="w-full h-full rounded-xl bg-finn-accent shadow-lg flex items-center justify-center text-white text-2xl font-bold border-2 border-white">
          ?
        </div>
      </div>
      <div className="memory-card-back absolute w-full h-full">
        <div className="w-full h-full rounded-xl bg-white shadow-lg flex items-center justify-center text-finn-primary text-xl font-medium border-2 border-finn-accent p-4 text-center">
          {content}
        </div>
      </div>
    </div>
  );
};