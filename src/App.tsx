import { useState } from "react";
import "./App.css";

function userInput() {
  const [input, setInput] = useState(0);

  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(Number(event.target.value));
    console.log(input);
  }

  return { input, inputChange };
}

function App() {
  const { input, inputChange } = userInput();
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
      <p>{input.toFixed(3)}s</p>

      <div className="button text">
        <button>start</button>
        <button>pause</button>
        <button>reset</button>
      </div>
    </div>
  );
}

export default App;
