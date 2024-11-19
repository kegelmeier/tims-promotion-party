import { useState } from "react";
import { MemoryGame } from "@/components/MemoryGame";
import { Confetti } from "@/components/Confetti";
import { motion } from "framer-motion";

const Index = () => {
  const [gameCompleted, setGameCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img
            src="/lovable-uploads/ced73d92-5ca3-4aa4-9a1e-17f99b844519.png"
            alt="FINN Logo"
            className="h-12 mx-auto mb-8"
          />
          <span className="inline-block bg-finn-accent/10 text-finn-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Special Announcement
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-finn-primary mb-4">
            {gameCompleted ? "Congratulations Tim!" : "Let's Play a Game"}
          </h1>
          <p className="text-finn-secondary text-lg md:text-xl max-w-2xl mx-auto">
            {gameCompleted
              ? "You've been promoted to Product Lead!"
              : "Match the cards to reveal a special message"}
          </p>
        </motion.div>

        {!gameCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MemoryGame onGameComplete={() => setGameCompleted(true)} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Confetti />
            <div className="mb-8">
              <img
                src="/lovable-uploads/1bf92578-1184-4cb4-9939-e261a368f70e.png"
                alt="Tim"
                className="w-48 h-48 rounded-full mx-auto mb-6 shadow-lg"
              />
              <p className="text-finn-primary text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                Your dedication, leadership, and incredible work at FINN.com have led to this
                well-deserved promotion. We're excited to see you take on this new
                challenge as Product Lead!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;