import { useEffect, useRef, useState } from "react";
import "./App.css";

function useInput() {
  const [input, setInput] = useState("");

  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    console.log(input);
  }

  return { input, inputChange, setInput };
}

function useTimer(startTime: number) {
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
    if (countRef === null) return;

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

function App() {
  const { input, setInput, inputChange } = useInput();
  const { leftTime, startButton, pauseButton, resetButton } =
    useTimer(Number(input)) || 0;

  const progress =
    input && Number(input) > 0 ? (leftTime / Number(input)) * 100 : 0;

  const hue = (progress * 120) / 100;

  function handleResetButton() {
    resetButton();
    setInput("");
  }
  return (
    <div className="timer text">
      <h1 className="title text">Timer</h1>
      <p className="text">set time</p>
      <input
        className="input"
        type="number"
        value={input}
        onChange={inputChange}
      ></input>
      <p className="text">time left:</p>
      <p className="seconds text">{leftTime.toFixed(3)}s</p>
      <div className="progress-div">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
          }}
        ></div>
      </div>

      <div className="button text">
        <button onClick={startButton}>start</button>
        <button onClick={pauseButton}>pause</button>
        <button onClick={handleResetButton}>reset</button>
      </div>
    </div>
  );
}

export default App;
