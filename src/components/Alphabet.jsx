import { useState } from "react";

const Alphabet = () => {
  const [outputString, setOutputString] = useState("");

  // Create an array of uppercase letters
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 65)
  );

  // Function to handle click on a letter button (i.e., add the letter to the output string)
  const handleClick = (letter) => {
    setOutputString((prev) => {
      // Append the clicked letter to the previous string
      const newString = prev + letter;

      // Get the last letter of the new string
      const lastLetter = newString.slice(-1);

      // Count how many times the last letter appears consecutively at the end of the string
      const count = newString
        .split("")
        .reverse()
        .findIndex((char) => char !== lastLetter);

      // If the last letter appears more than 3 times consecutively, replace the last occurrences with underscores (_)
      if (count >= 3) {
        return newString.slice(0, -count) + "_".repeat(count);
      }

      // Otherwise, return the new string as is
      return newString;
    });
  };

  // Function to clear the output string
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
