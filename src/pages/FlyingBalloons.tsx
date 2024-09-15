import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const balloonImages = [
  "/balloon/blue.png",
  "/balloon/green.png",
  "/balloon/indigo.png",
  "/balloon/blue.png",
  "/balloon/green.png",
  "/balloon/indigo.png",
  "/balloon/orange.png",
  "/balloon/pink.png",
  "/balloon/red.png",
  "/balloon/violet.png",
  "/balloon/pink.png",
  "/balloon/red.png",
  "/balloon/violet.png",
  "/balloon/yellow.png",
  "/balloon/blue.png",
  "/balloon/green.png",
  "/balloon/indigo.png",
  "/balloon/orange.png",
  "/balloon/orange.png",
  "/balloon/pink.png",
  "/balloon/red.png",
  "/balloon/violet.png",
  "/balloon/yellow.png",
  "/balloon/pink.png",
  "/balloon/red.png",
  "/balloon/yellow.png",
  "/balloon/blue.png",
  "/balloon/green.png",
  "/balloon/indigo.png",
  "/balloon/yellow.png",
  "/balloon/blue.png",
  "/balloon/green.png",
  "/balloon/indigo.png",
  "/balloon/orange.png",
  "/balloon/pink.png",
  "/balloon/red.png",
  "/balloon/violet.png",
  "/balloon/orange.png",
  "/balloon/orange.png",
  "/balloon/pink.png",
  "/balloon/red.png",
  "/balloon/violet.png",
  "/balloon/yellow.png",
  "/balloon/violet.png",
  "/balloon/yellow.png",
  "/balloon/blue.png",
  "/balloon/green.png",
  "/balloon/indigo.png",
];

interface IFlyingBalloons {
  flyBalloons: boolean;
  setFlyBalloons: (flyBalloons: boolean) => void;
}
const FlyingBalloons: React.FC<IFlyingBalloons> = ({
  flyBalloons,
  setFlyBalloons,
}) => {
  const balloonRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (flyBalloons) {
      setFlyBalloons(true);

      // Animate each balloon to fly in a random direction
      balloonRefs.current.forEach((balloon, index) => {
        const startX = Math.random() * 100 - 50; // Random start position X
        const startY = Math.random() * 200 - 100; // Random start position Y
        const endX = Math.random() * 1000 - 500; // Random end position X
        const endY = -1000; // Fixed end position Y

        gsap.fromTo(
          balloon,
          { x: startX, y: startY, opacity: 1 },
          {
            x: endX,
            y: endY,
            opacity: 0,
            duration: 4 + index * 0.5, // Staggered animation
            ease: "power1.out",
            onComplete: () => {
              if (index === balloonRefs.current.length - 1) {
                setFlyBalloons(false); // Set flying to false after all balloons have animated
              }
            },
          }
        );
      });
    }
  }, [flyBalloons, setFlyBalloons]);
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="relative w-52 h-80 mt-4">
        {balloonImages.map((image, index) => (
          <div
            key={index}
            className="absolute z-40 -bottom-[130%] w-3/4 scale-50 h-full bg-cover"
            style={{ backgroundImage: `url(${image})` }}
            ref={(el) => (balloonRefs.current[index] = el!)}
          />
        ))}
      </div>
    </div>
  );
};

export default FlyingBalloons;
