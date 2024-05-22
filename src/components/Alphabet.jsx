import { useState } from "react";

const Alphabet = () => {
  const [outputString, setOutputString] = useState("");
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 65)
  );

  const handleClick = (letter) => {
    setOutputString((prev) => {
      const newString = prev + letter;
      const lastLetter = newString.slice(-1);
      const count = newString
        .split("")
        .reverse()
        .findIndex((char) => char !== lastLetter);
      if (count >= 3) {
        return newString.slice(0, -count) + "_".repeat(count);
      }
      return newString;
    });
  };

  const handleClear = () => {
    setOutputString("");
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
        }}
      >
        {letters.map((letter, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
              border: "1px solid #000",
            }}
            onClick={() => handleClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "justify-between",
          marginTop: "20px",
          gap: "10px",
          width: "100%",
        }}
      >
        <div
          id="outputString"
          style={{
            padding: "10px",
            border: "1px solid #000",
            backgroundColor: "#f0f0f0",
            width: "100%",
          }}
        >
          {outputString}
        </div>
        <button
          onClick={handleClear}
          style={{
            padding: "10px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #000",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Alphabet;
