import { useState, useRef } from "react";
import PropTypes from 'prop-types';

const Partition = ({ color, style = {} }) => {
  const [orientation, setOrientation] = useState(null);
  const [color1, setColor1] = useState(null);
  const [color2, setColor2] = useState(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const [size, setSize] = useState(50);
  const containerRef = useRef(null);

  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

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

  const removeSplit = () => {
    setIsRemoved(true);
  };

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startSize = size;

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

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("contextmenu", handleMouseUp);
            snapToClosest();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("contextmenu", handleMouseUp);
    };

    const snapToClosest = () => {
        const snapPoints = [25, 50, 75];
        const closest = snapPoints.reduce((prev, curr) =>
            Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
        );
        setSize(closest);
    };

  if (isRemoved) {
    return null;
  }

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
