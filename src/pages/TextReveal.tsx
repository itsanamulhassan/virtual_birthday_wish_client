"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  sentences: string[];
  delay?: number; // Delay between sentences (in milliseconds)
  duration?: number; // Duration for reveal animation (in seconds)
  className?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({
  sentences,
  delay = 3000,
  duration = 0.5,
  className,
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false); // To manage the completion of all sentences
  const controls = useAnimation();

  useEffect(() => {
    if (isComplete) return; // Stop the timer if all sentences are shown

    const timer = setInterval(() => {
      setCurrentSentenceIndex((prev) =>
        prev < sentences.length - 1 ? prev + 1 : prev
      );
    }, delay);

    return () => clearInterval(timer);
  }, [sentences.length, delay, isComplete]);

  useEffect(() => {
    if (currentSentenceIndex >= sentences.length - 1) {
      setIsComplete(true); // Stop further sentence changes when the last sentence is reached
    }

    controls.start({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        delay: 0,
      },
    });
  }, [currentSentenceIndex, controls, duration]);

  const renderSentences = () => (
    <motion.div>
      {sentences[currentSentenceIndex].split(" ").map((word, idx) => (
        <motion.span
          key={word + idx}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={controls}
          className="text-white font-nerko leading-5 font-normal"
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-[26px] text-center leading-snug tracking-wide">
          {renderSentences()}
        </div>
      </div>
    </div>
  );
};

export default TextReveal;
