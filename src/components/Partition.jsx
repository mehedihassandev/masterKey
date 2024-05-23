import { useState, useRef } from "react";
import PropTypes from "prop-types";

const Partition = ({ color, style = {} }) => {
  const [orientation, setOrientation] = useState(null);
  const [color1, setColor1] = useState(null);
  const [color2, setColor2] = useState(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const [size, setSize] = useState(50);
  const containerRef = useRef(null);

  // Function to generate a random color
  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  // // Functions to split the container vertically or horizontally.
  const splitVertically = () => {
    setOrientation("vertical");
    setColor1(randomColor());
    setColor2(randomColor());
  };

  const splitHorizontally = () => {
    setOrientation("horizontal");
    setColor1(randomColor());
    setColor2(randomColor());
  };

  // Function to remove the split.
  const removeSplit = () => {
    setIsRemoved(true);
  };

  /*
  This function is called when the mouse is pressed down on the resizer element (the gray bar)

  Frist click the left mouse button on the gray bar, then move the mouse to resize then click the right mouse button to stop resizing
  */
  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = size;

    // Function to handle the mouse move event.
    const handleMouseMove = (e) => {
      if (orientation === "vertical") {
        const delta =
          ((e.clientX - startX) / containerRef.current.clientWidth) * 100;
        setSize(Math.min(Math.max(startSize + delta, 0), 100));
      } else {
        const delta =
          ((e.clientY - startY) / containerRef.current.clientHeight) * 100;
        setSize(Math.min(Math.max(startSize + delta, 0), 100));
      }
    };

    // This function is called when the mouse is released (i.e., the resizing is done)
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      snapToClosest();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Function to snap the size to the closest value.
  const snapToClosest = () => {
    const snapPoints = [25, 50, 75];
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
    );
    setSize(closest);
  };

  // If the split has been removed, render nothing.
  if (isRemoved) {
    return null;
  }

  // If the orientation is null, render a container with buttons to split vertically or horizontally, or remove the split.
  if (orientation === null) {
    return (
      <div
        style={{
          backgroundColor: color,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: 24,
          ...style,
        }}
      >
        <button onClick={splitVertically}>V</button>
        <button onClick={splitHorizontally}>H</button>
        <button onClick={removeSplit}>-</button>
      </div>
    );
  }

  // Calculate the styles for the two partitions.
  const style1 =
    orientation === "vertical"
      ? { width: `${size}%`, height: "100%" }
      : { width: "100%", height: `${size}%` };
  const style2 =
    orientation === "vertical"
      ? { width: `${100 - size}%`, height: "100%" }
      : { width: "100%", height: `${100 - size}%` };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: orientation === "vertical" ? "row" : "column",
        width: "100vw",
        height: "100vh",
        position: "relative",
        ...style,
      }}
    >
      <Partition style={style1} color={color1} />
      <div
        style={{
          backgroundColor: "gray",
          cursor: orientation === "vertical" ? "col-resize" : "row-resize",
          width: orientation === "vertical" ? "5px" : "100%",
          height: orientation === "vertical" ? "100%" : "5px",
          position: "absolute",
          top: orientation === "vertical" ? "0" : `${size}%`,
          left: orientation === "vertical" ? `${size}%` : "0",
          zIndex: 1,
        }}
        onMouseDown={handleMouseDown}
      />
      <Partition style={style2} color={color2} />
    </div>
  );
};

Partition.propTypes = {
  color: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Partition;
