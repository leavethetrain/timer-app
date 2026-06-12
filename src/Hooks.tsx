import { useEffect, useRef, useState } from "react";

export function useInput() {
  const [input, setInput] = useState("");

  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    console.log(input);
  }

  return { input, inputChange, setInput };
}

export function useTimer(startTime: number) {
  const [leftTime, setLeftTime] = useState(startTime);
  const countRef = useRef(null as any);

  useEffect(() => {
    setLeftTime(startTime);
  }, [startTime]);

  function startButton() {
    if (countRef.current !== null) return;

    if (leftTime <= 0) {
      setLeftTime(startTime);
      return;
    }

    countRef.current = setInterval(() => {
      setLeftTime((time) => {
        if (time <= 0) {
          clearInterval(countRef.current);
          countRef.current = null;
          return 0;
        }
        return time - 0.01;
      });
    }, 10);
  }

  function pauseButton() {
    if (countRef.current === null) return;

    clearInterval(countRef.current);
    countRef.current = null;
  }

  function resetButton() {
    clearInterval(countRef.current);
    countRef.current = null;
    setLeftTime(0);
  }

  return { leftTime, startButton, setLeftTime, pauseButton, resetButton };
}
