import { useEffect, useRef, useState } from "react";
import "./App.css";

function useInput() {
  const [input, setInput] = useState(0);

  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(Number(event.target.value));
    console.log(input);
  }

  return { input, inputChange };
}

function useTimer(startTime: number) {
  const [leftTime, setLeftTime] = useState(startTime);
  const countRef = useRef(null as any);

  useEffect(() => {
    setLeftTime(startTime);
  }, [startTime]);

  function startButton() {
    if (countRef.current !== null) return;

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

  return { leftTime, startButton, setLeftTime };
}

function App() {
  const { input, inputChange } = useInput();
  const { leftTime, startButton, setLeftTime } = useTimer(input);
  return (
    <div className="timer text">
      <h1 className="title text">Timer</h1>
      <p className="text">Zeit festlegen</p>
      <input
        className="input "
        type="number"
        value={input}
        onChange={inputChange}
      ></input>
      <p>time left:</p>
      <p>{leftTime.toFixed(3)}s</p>

      <div className="button text">
        <button onClick={startButton}>start</button>
        <button>pause</button>
        <button>reset</button>
      </div>
    </div>
  );
}

export default App;
