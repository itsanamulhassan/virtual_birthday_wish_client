import music from "/sound/hbd.mp3";
import popper from "/sound/popper.mp3";

export const playSound = (
  variant: "music" | "popper",
  volume: number = 1.0
) => {
  if (variant === "music") {
    const audio = new Audio(music);
    audio.volume = volume;
    audio.loop = true;
    return audio.play();
  }
  if (variant === "popper") {
    const audio = new Audio(popper);
    audio.volume = 0.5;
    return audio.play();
  }
};
