import { useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

// Define the props for SpriteContainer
interface SpriteContainerProps {
  spriteCount: number;
  emitterSize: number;
  spriteSizes: { min: number; max: number };
  speed: number;
  gravity: number;
}

// Define the methods that will be exposed to the parent component
export interface SpriteContainerRef {
  playAnimation: () => void;
}

const SpriteContainer = forwardRef<SpriteContainerRef, SpriteContainerProps>(
  ({ spriteCount, emitterSize, spriteSizes }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const timeline = useRef(gsap.timeline({ paused: true })).current;

    const getRandom = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const getDimensions = () => getRandom(spriteSizes.min, spriteSizes.max);

    const getColor = () =>
      `rgb(${Math.floor(getRandom(100, 255))}, ${Math.floor(
        getRandom(100, 255)
      )}, ${Math.floor(getRandom(100, 255))})`;

    // Function to animate sprites and remove them after explosion
    const playAnimation = () => {
      const sprites = Array.from(
        containerRef.current!.children
      ) as HTMLDivElement[];

      timeline.clear();
      sprites.forEach((sprite) => {
        const angle = getRandom(0, Math.PI * 2); // Random angle for sprite movement
        const distance = getRandom(emitterSize / 2, emitterSize); // How far each sprite moves
        const duration = getRandom(1.0, 2.0); // Slow down the explosion (increase duration)

        // GSAP animation for each sprite
        timeline.to(
          sprite,
          {
            duration,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0, // Fade out the sprite after movement
            ease: "power3.out", // Slow ease out
            rotation: getRandom(0, 360), // Rotate each sprite for a dynamic effect
            scale: 0.5, // Shrink the sprite to give a vanishing effect
          },
          0 // Start all animations at the same time
        );
      });

      timeline.play();
    };

    // Expose the playAnimation method to the parent component
    useImperativeHandle(ref, () => ({
      playAnimation,
    }));

    return (
      <div
        ref={containerRef}
        className="sprite-container"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: spriteCount * 2 }).map((_, i) => (
          <div
            key={`sprite${i}`}
            className="sprite"
            style={{
              zIndex: "999999999",
              backgroundColor: getColor(),
              width: `${getDimensions()}px`,
              height: `${getDimensions()}px`,
              position: "absolute",
              bottom: "-10%", // Start from the bottom
              left: "0%", // Center horizontally
              transform: "translateX(-50%)", // Adjust to center sprites
              opacity: 1, // Ensure sprites are visible initially
            }}
          />
        ))}
        {Array.from({ length: spriteCount * 2 }).map((_, i) => (
          <div
            key={`sprite${i}`}
            className="sprite"
            style={{
              zIndex: "999999999",
              backgroundColor: getColor(),
              width: `${getDimensions()}px`,
              height: `${getDimensions()}px`,
              position: "absolute",
              bottom: "-10%", // Start from the bottom
              left: "100%", // Center horizontally
              transform: "translateX(-50%)", // Adjust to center sprites
              opacity: 1, // Ensure sprites are visible initially
            }}
          />
        ))}
      </div>
    );
  }
);

export default SpriteContainer;
