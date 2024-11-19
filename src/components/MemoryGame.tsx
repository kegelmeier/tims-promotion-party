import { useState, useEffect } from "react";
import { MemoryCard } from "./MemoryCard";
import { toast } from "sonner";

const CARDS = [
  { id: 1, content: "JobAuto" },
  { id: 2, content: "JobAuto" },
  { id: 3, content: "CUG" },
  { id: 4, content: "CUG" },
  { id: 5, content: "Discovery" },
  { id: 6, content: "Discovery" },
  { id: 7, content: "Checkout" },
  { id: 8, content: "Checkout" },
  { id: 9, content: "FINN" },
  { id: 10, content: "FINN" },
  { id: 11, content: "Auto Abo" },
  { id: 12, content: "Auto Abo" },
];

interface MemoryGameProps {
  onGameComplete: () => void;
}

export const MemoryGame = ({ onGameComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState(() =>
    [...CARDS].sort(() => Math.random() - 0.5)
  );
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const [first, second] = flippedIndexes;
      if (cards[first].content === cards[second].content) {
        setMatchedPairs((prev) => [...prev, first, second]);
        setFlippedIndexes([]);
        
        if (matchedPairs.length === cards.length - 4) {
          setTimeout(() => {
            toast("Almost there...");
          }, 500);
        }
      } else {
        setTimeout(() => setFlippedIndexes([]), 1000);
      }
    }
  }, [flippedIndexes, cards]);

  useEffect(() => {
    if (matchedPairs.length === cards.length) {
      setTimeout(onGameComplete, 1000);
    }
  }, [matchedPairs.length, cards.length, onGameComplete]);

  const handleCardClick = (index: number) => {
    if (flippedIndexes.length === 2) return;
    if (flippedIndexes.includes(index)) return;
    if (matchedPairs.includes(index)) return;

    setFlippedIndexes((prev) => [...prev, index]);
  };

  return (
    <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto p-4">
      {cards.map((card, index) => (
        <MemoryCard
          key={index}
          {...card}
          isFlipped={flippedIndexes.includes(index) || matchedPairs.includes(index)}
          isMatched={matchedPairs.includes(index)}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};