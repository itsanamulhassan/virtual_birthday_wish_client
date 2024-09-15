import { FC } from "react";
import "./Cake.scss";
import Candle from "./Candle";
interface ICakeProps {
  elementPositions: any;
  blowDetected: any;
  candle: boolean;
}

const Cake: FC<ICakeProps> = ({ candle, elementPositions, blowDetected }) => {
  return (
    <div className="cake">
      <div className="plate"></div>
      <div className="layer layer-bottom"></div>
      <div className="layer layer-middle"></div>
      <div className="layer layer-top"></div>
      <div className="icing"></div>
      <div className="drip drip1"></div>
      <div className="drip drip2"></div>
      <div className="drip drip3"></div>

      {candle && (
        <Candle
          elementPositions={elementPositions}
          blowDetected={blowDetected}
        />
      )}
    </div>
  );
};

export default Cake;
