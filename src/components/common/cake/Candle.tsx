import { FC } from "react";
import "./Candle.scss";

interface ICandleProps {
  elementPositions: any;
  blowDetected: any;
}
const Candle: FC<ICandleProps> = ({ elementPositions, blowDetected }) => {
  return (
    <div className="ml-1">
      {elementPositions.map((position: any, i: number) => (
        <div
          className="candle"
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          key={i}
        >
          <div
            className={`flame ${blowDetected ? "fadeOut" : "flicker"}`}
          ></div>

          <div className="wick"></div>
          <div className={blowDetected ? "" : "drop"}></div>
        </div>
      ))}
    </div>
  );
};

export default Candle;
