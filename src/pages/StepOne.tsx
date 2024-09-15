import { FC } from "react";
import { BubblyLink } from "react-bubbly-transitions";

interface IStepOneProps {}

const StepOne: FC<IStepOneProps> = () => {
  return (
    <div className="w-full overflow-hidden h-screen bg-[#180a0f] flex justify-center items-center">
      <button className="glow-button">
        <BubblyLink className="w-full block" to="/2">
          Turn on light
        </BubblyLink>
      </button>
    </div>
  );
};

export default StepOne;
