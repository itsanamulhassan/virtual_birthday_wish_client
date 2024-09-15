import PageTransition from "@/components/common/effect/PageTransition";
import BulbsComp from "./BlinkingBulbs";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import FlyingBalloons from "./FlyingBalloons";
import CakeCandle from "./CakeCandle";
import { playSound } from "@/utils/helpers/playSound";
import SpriteContainer from "./Explode";
import TextReveal from "./TextReveal";
import { Link } from "react-router-dom";

type IStep =
  | "play"
  | "decorate"
  | "balloon"
  | "cake"
  | "candle"
  | "message"
  | "begin"
  | "sprite";

const StepTwo = () => {
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [banner, setBanner] = useState(false);
  const [flyBalloons, setFlyBalloons] = useState(false);
  const [candle, setCandle] = useState(false);
  const [cake, setCake] = useState(false);
  const [blow, setBlow] = useState(false);
  const [btn, setBtn] = useState(false);
  const explosionRef = useRef<any>(null);
  const [reset, setReset] = useState(false);

  const handleExplode = () => {
    explosionRef.current?.playAnimation(); // Trigger the explosion animation
  };

  const [step, setStep] = useState<IStep>("begin");

  const sentences = [
    "Happy Birthday! 🎉",
    "I hope your day is full of joy, love, and great memories.",
    "Wishing you many more happy birthdays",
    "and all the best today and always! 💖🥳",
  ];

  useEffect(() => {
    if (step === "play") {
      setBtn(false);
      playSound("music");
      setIsBlinking(true);
      setTimeout(() => {
        setBtn(true);
      }, 1000);
    }
    if (step === "decorate") {
      setBtn(false);
      setBanner(true);
      setTimeout(() => {
        setBtn(true);
      }, 2000);
    }
    if (step === "balloon") {
      setBtn(false);
      setFlyBalloons(true);
      setTimeout(() => {
        setBtn(true);
      }, 12000);
    }
    if (step === "cake") {
      setBtn(false);
      setCake(true);
      setTimeout(() => {
        setBtn(true);
      }, 3000);
    }
    if (step === "candle") {
      setBtn(false);
      setCandle(true);
      setTimeout(() => {
        setBtn(true);
      }, 5000);
    }
    if (step !== "message" && blow) {
      setBtn(false);
      setStep("sprite");
      playSound("popper");
      handleExplode();
      setTimeout(() => {
        setBtn(true);
      }, 3000);
      setTimeout(() => {
        setReset(true);
      }, 35000);
    }
  }, [step, blow]);

  return (
    <div className="overflow-hidden h-screen bg-[#f06595]">
      <PageTransition speed="slow">
        <div className="h-[90vh] items-center flex flex-col justify-between">
          <div>
            <BulbsComp isBlinking={isBlinking} />
          </div>
          {/* BANNER`` */}
          {(step === "decorate" ||
            step === "balloon" ||
            step === "cake" ||
            step === "message" ||
            step === "sprite" ||
            step === "candle") && (
            <div>
              <img
                className={cn(
                  "w-6/12 absolute z-10 duration-1000 ease-in-out -translate-x-1/2 -top-full left-1/2",
                  banner && "top-4",
                  step === "cake" && "top-1"
                )}
                src="/element/happy_birthday.png"
              />
              <img
                className={cn(
                  "w-full opacity-0 absolute -translate-x-1/2 left-1/2  z-20 duration-1000 ease-in-out top-7",
                  banner && "opacity-100"
                )}
                src="/element/flags.png"
                alt=""
              />
              <img
                className={cn(
                  "w-6/12 animate-pulse opacity-0 absolute -translate-x-1/2 left-1/2  z-20 duration-[2000] ease-in-out top-56",
                  banner && "opacity-100",
                  step === "cake" && "top-52"
                )}
                src="/element/name.png"
                alt=""
              />
            </div>
          )}

          {step === "balloon" && (
            <FlyingBalloons
              flyBalloons={flyBalloons}
              setFlyBalloons={setFlyBalloons}
            />
          )}

          {(step === "cake" || step === "candle") && (
            <div
              className={cn(
                "opacity-0 duration-1000 w-full ml-10 ease-in-out",
                cake && "opacity-100"
              )}
            >
              <CakeCandle setBlow={setBlow} candle={candle} />
            </div>
          )}

          {step === "sprite" && (
            <SpriteContainer
              ref={explosionRef}
              spriteCount={200} // Increased number of sprites for a more intense effect
              emitterSize={800} // Larger emitter size to spread sprites further
              spriteSizes={{ min: 10, max: 30 }} // Adjust size range as needed
              speed={0.1} // Increased speed for faster explosions
              gravity={0.1} // Lower gravity for more explosive effect
            />
          )}

          {step === "message" && (
            <div className="py-3 w-11/12 mx-auto">
              <TextReveal sentences={sentences} delay={8000} duration={0.5} />
            </div>
          )}

          <div className="mb-6">
            {step === "candle" && (
              <p className="text-white font-nerko text-lg">
                Blow out the candle
              </p>
            )}

            {reset && (
              <PageTransition>
                <Link to="/">
                  <button className="relative font-nerko inline-flex h-8 overflow-hidden rounded-lg p-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#f8b2ca] focus:ring-offset-2 focus:ring-offset-[#903d59]">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60283c_0%,#f9c1d5_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#c05177] px-3 py-0.5 font-medium text-white backdrop-blur-3xl text-lg">
                      Restart
                    </span>
                  </button>
                </Link>
              </PageTransition>
            )}
            {step === "begin" && (
              <PageTransition>
                <button
                  onClick={() => setStep("play")}
                  // // onClick={() => setStep("play")}
                  // onClick={handleExplode}
                  className="relative font-nerko inline-flex h-8 overflow-hidden rounded-lg p-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#f8b2ca] focus:ring-offset-2 focus:ring-offset-[#903d59]"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60283c_0%,#f9c1d5_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#c05177] px-3 py-0.5 font-medium text-white backdrop-blur-3xl text-lg">
                    Play Music
                  </span>
                </button>
              </PageTransition>
            )}
            {step === "play" && btn && (
              <PageTransition>
                <button
                  onClick={() => setStep("decorate")}
                  className="relative inline-flex h-8 overflow-hidden rounded-lg p-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#f8b2ca] focus:ring-offset-2 focus:ring-offset-[#903d59] font-nerko"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60283c_0%,#f9c1d5_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#c05177] px-3 py-0.5 text-lg font-medium text-white backdrop-blur-3xl">
                    Let's Decorate
                  </span>
                </button>
              </PageTransition>
            )}
            {step === "decorate" && btn && (
              <PageTransition>
                <button
                  onClick={() => setStep("balloon")}
                  className="relative inline-flex h-8 overflow-hidden rounded-lg p-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#f8b2ca] focus:ring-offset-2 focus:ring-offset-[#903d59] font-nerko"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60283c_0%,#f9c1d5_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#c05177] px-3 py-0.5 text-lg font-medium text-white backdrop-blur-3xl">
                    Fly With Balloons
                  </span>
                </button>
              </PageTransition>
            )}
            {step === "balloon" && btn && (
              <PageTransition>
                <button
                  onClick={() => setStep("cake")}
                  className="relative inline-flex h-8 overflow-hidden rounded-lg p-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#f8b2ca] focus:ring-offset-2 focus:ring-offset-[#903d59] font-nerko"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60283c_0%,#f9c1d5_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#c05177] px-3 py-0.5 text-lg font-medium text-white backdrop-blur-3xl">
                    Most Delicious Cake Ever
                  </span>
                </button>
              </PageTransition>
            )}
            {step === "cake" && btn && (
              <PageTransition>
                <button
                  onClick={() => setStep("candle")}
                  className="relative inline-flex h-8 overflow-hidden rounded-lg p-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#f8b2ca] focus:ring-offset-2 focus:ring-offset-[#903d59] font-nerko"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60283c_0%,#f9c1d5_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#c05177] px-3 py-0.5 text-lg font-medium text-white backdrop-blur-3xl">
                    Set Candle
                  </span>
                </button>
              </PageTransition>
            )}
            {step === "sprite" && btn && (
              <PageTransition>
                <button
                  onClick={() => setStep("message")}
                  className="relative inline-flex h-8 overflow-hidden rounded-lg p-[1.5px] focus:outline-none focus:ring-2 focus:ring-[#f8b2ca] focus:ring-offset-2 focus:ring-offset-[#903d59] font-nerko"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60283c_0%,#f9c1d5_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#c05177] px-3 py-0.5 text-lg font-medium text-white backdrop-blur-3xl ">
                    A Message For Your
                  </span>
                </button>
              </PageTransition>
            )}
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default StepTwo;
