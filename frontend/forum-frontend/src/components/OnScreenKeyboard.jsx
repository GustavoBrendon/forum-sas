import React, { useState, useEffect } from "react";
import "./OnScreenKeyboard.css";

const OnScreenKeyboard = ({ onKeyPress }) => {
  const [keys, setKeys] = useState([]);

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  useEffect(() => {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const numbers = "1234567890".split("");
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>/?".split("");

    const allKeys = shuffleArray([
      ...lowerCase,
      ...upperCase,
      ...numbers,
      ...symbols,
    ]);
    setKeys(allKeys);
  }, []);
  return (
    <div className="virtual-keyboard">
      <div className="keyboard-keys">
        {keys.map((key, index) => (
          <button
            key={index}
            type="button"
            className="key"
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="keyboard-actions">
        <button
          type="button"
          className="key action-key"
          onClick={() => onKeyPress("Backspace")}
        >
          Apagar
        </button>
        <button
          type="button"
          className="key action-key"
          onClick={() => onKeyPress("Clear")}
        >
          Limpar Tudo
        </button>
      </div>
    </div>
  );
};

export default OnScreenKeyboard;
