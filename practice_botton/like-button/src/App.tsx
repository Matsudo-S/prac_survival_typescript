import "./App.css";
import { useState} from "react";

function App() {
  return (
    <>
      <h1>TypeScriptはいいぞ - Auto Git Push Test</h1>
      <LikeButton />
    </>
  )
}

function LikeButton() {
  const [count, setCount] = useState(999);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <span className="like-button" onClick={handleClick}>
      ♡ {count}
    </span>
  )
}

export default App;