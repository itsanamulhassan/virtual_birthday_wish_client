import Cake from "@/components/common/cake/Cake";
import { useState, useEffect, useRef, FC } from "react";

interface Position {
  x: number;
  y: number;
}

interface ICakeCandleProps {
  candle: boolean;
  setBlow: (blow: boolean) => void;
}

const CakeCandle: FC<ICakeCandleProps> = ({ candle, setBlow }) => {
  const [elementPositions, setElementPositions] = useState<Position[]>([]);
  const [blowDetected, setBlowDetected] = useState<boolean>(false);

  // Use refs to store the audio-related objects
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    const newPositions = Array.from(
      { length: 12 - elementPositions.length },
      () => ({
        x: Math.random() * 200 + 10,
        y: Math.random() * 0,
      })
    );

    setElementPositions((prevPositions) => [...prevPositions, ...newPositions]);
  }, [elementPositions.length]);

  useEffect(() => {
    const handleBlow = () => {
      setBlowDetected(true);

      // Suspend the audio context when blow is detected
      if (
        microphoneRef.current &&
        analyserRef.current &&
        audioContextRef.current?.state === "running"
      ) {
        audioContextRef.current.suspend();
        setBlow(true);
      }
    };

    const initializeMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Check for both AudioContext and webkitAudioContext
        const AudioContext =
          window.AudioContext || (window as any).webkitAudioContext;

        // Instantiate the audio context
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);

        // Set the ref values
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        microphoneRef.current = microphone;

        microphone.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);

          const average =
            dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

          if (average > 100 && !blowDetected) {
            handleBlow();
          }

          requestAnimationFrame(detectBlow);
        };

        detectBlow();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    initializeMicrophone();

    // Clean up audio context on unmount
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [blowDetected]);

  return (
    <Cake
      candle={candle}
      elementPositions={elementPositions}
      blowDetected={blowDetected}
    />
  );
};

export default CakeCandle;
