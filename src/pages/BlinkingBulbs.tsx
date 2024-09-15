import React, { useState, useEffect, FC } from "react";

// Define the types for bulb states
type BulbState = "white" | "color";

// Array of bulb images (replace with your actual image paths)
const bulbImages: string[] = [
  "/bulb/bulb.png", // White bulb image for non-blinking state
  "/bulb/bulb_blue.png",
  "/bulb/bulb_green.png",
  "/bulb/bulb_orange.png",
  "/bulb/bulb_pink.png",
  "/bulb/bulb_yellow.png",
];
interface IBlinkingBulbs {
  isBlinking: boolean;
}

const BlinkingBulbs: FC<IBlinkingBulbs> = ({ isBlinking }) => {
  const [bulbStates, setBulbStates] = useState<BulbState[]>(
    Array(7).fill("white")
  );

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isBlinking) {
      // Set up an interval to change bulb states randomly
      intervalRef.current = setInterval(() => {
        setBulbStates((prevStates) =>
          prevStates.map(() => (Math.random() > 0.5 ? "color" : "white"))
        );
      }, 500); // Adjust the interval time for blinking speed
    } else {
      // Set all bulbs to white when blinking stops
      setBulbStates(Array(7).fill("white"));
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on component unmount or when blinking state changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isBlinking]);

  return (
    <div>
      <div className="flex animate-pulse justify-center w-full overflow-hidden gap-x-4 absolute -translate-x-1/2 left-1/2 -top-1 z-30">
        {bulbStates.map((state, index) => (
          <img
            key={index}
            src={
              state === "white"
                ? bulbImages[0]
                : bulbImages[
                    Math.floor(Math.random() * (bulbImages.length - 1)) + 1
                  ]
            }
            alt={`Bulb ${index}`}
            className="size-12"
          />
        ))}
      </div>
    </div>
  );
};

export default BlinkingBulbs;
