import { useState, useRef } from "react";
import "./App2.css";

const App2 = () => {
  const [hexValue, setHexValue] = useState("");
  const [rgbValue, setRgbValue] = useState("");

  const hexInputRef = useRef(null); //?

  const [error, setError] = useState("");

  function valid(element) {
    element.style.color = "#202040";
    setError("");
  }

  function invalid(element, otherElement, errorMessage) {
    element.style.color = "#000000";
    otherElement("");
    setError(errorMessage);
    
  }

  function toRgb(hexCode) {
    const rgbArr = [];
    if (/^#?[A-Fa-f0-9]{6}$/.test(hexCode)) {
      valid(hexInputRef.current);
      hexCode = hexCode.split("#")[1] || hexCode;
      for (let i = 0; i < hexCode.length; i += 2) {
        rgbArr.push(parseInt(hexCode[i] + hexCode[i + 1], 16));
      }

      setRgbValue(`rgb(${rgbArr.join(", ")})`);
      document.body.style.backgroundColor = `rgb(${rgbArr.join(", ")})`;
    }
  
    else {
      invalid(hexInputRef.current, setRgbValue, "#Error");
    }
  }

  return (
    <>
      <div className="wrapper">
        <input
          type="text"
          id="hex"
          value={hexValue}
          onChange={(e) => {
            setHexValue(e.target.value);
            toRgb(e.target.value);
          }}
          ref={hexInputRef}
          placeholder="Enter Hex color"
        />
        <div id="rgb" value={rgbValue} className="rectangle">
          {rgbValue ? rgbValue : error}
        </div>
      </div>
    </>
  );
};

export default App2;
