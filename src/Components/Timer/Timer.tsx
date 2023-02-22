import { FC } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface TimerProps {
  seconds: number;
  onData: (time: number) => void;
}

const Timer: FC<TimerProps> = ({ seconds, onData }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime: any) => prevTime - 1);
      onData(timeLeft);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft, onData]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progress: number = (1 - timeLeft / seconds) * 283;

  const circleStyle = {
    strokeDashoffset: progress,
  };

  return (
    <Container>
      <Svg viewBox="0 0 100 100">
        <TimerCircleBg cx="50" cy="50" r="45" />
        <TimerCircle cx="50" cy="50" r="45" style={circleStyle} />
      </Svg>
      <TimerText>{formatTime(timeLeft)}</TimerText>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin-left: auto;
`;

const Svg = styled.svg`
  width: 50px;
  height: 50px;
`;
const TimerCircleBg = styled.circle`
  fill: none;
  stroke: ${(p) => p.theme.colors.timerColor};
  stroke-width: 10;
`;

const TimerCircle = styled.circle`
  fill: none;
  stroke: ${(p) => p.theme.colors.active};
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 1s ease-out;
`;

const TimerText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
`;

export default Timer;
