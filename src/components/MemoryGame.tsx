import { useState, useEffect } from "react";
import { MemoryCard } from "./MemoryCard";
import { toast } from "sonner";

const CARDS = [
  { id: 1, content: "Product" },
  { id: 2, content: "Product" },
  { id: 3, content: "Lead" },
  { id: 4, content: "Lead" },
  { id: 5, content: "Promotion!" },
  { id: 6, content: "Promotion!" },
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
        
        if (matchedPairs.length === 4) {
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
    <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto p-4">
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