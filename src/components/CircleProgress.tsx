import React, { useEffect, useRef, useState } from "react";
import { AnimatedCircularProgressBar } from "./magicui/animated-circular-progress-bar";

interface CircleProgressProps {
  value: number;
}

const CircleProgress = (
  props: React.PropsWithChildren<CircleProgressProps>
) => {
  //! State
  const interval = useRef<NodeJS.Timeout>();
  const [valuePercent, setValuePercent] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev < props.value) {
        return prev + props.value / 100;
      }

      clearInterval(interval.current);
      return prev;
    };

    interval.current = setInterval(() => setValuePercent(handleIncrement), 5);

    return () => clearInterval(interval.current);
  }, [props.value]);

  //! Function

  //! Render
  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={valuePercent}
      gaugePrimaryColor="hsl(169 100% 30.4%)"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  );
};

export default CircleProgress;
