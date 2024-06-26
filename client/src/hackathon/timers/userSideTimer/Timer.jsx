import React, { useState, useEffect } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "./Timer.css"; // Assume styles are moved to a separate CSS file

const FULL_DASH_ARRAY = 283;

const Timer = ({
  id,
  timerTitle,
  serverEndTime = "2024-05-23T22:55:21Z",
  timerColor,
  toggleSidebar,
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const [totalDuration, setTotalDuration] = useState(0); // Total duration in seconds

  useEffect(() => {
    const timeLeftInSeconds = calculateTimeLeft(serverEndTime);
    setTimeLeft(timeLeftInSeconds);
    setTotalDuration(timeLeftInSeconds);
    setIsRunning(true);
  }, [serverEndTime]);

  useEffect(() => {
    // Retrieve position data from local storage
    const storedPosition = localStorage.getItem(`timerPosition_${id}`);
    if (storedPosition) {
      setPosition(JSON.parse(storedPosition));
    }
  }, [id]);

  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end - now;
    return Math.max(difference / 1000, 0); // convert milliseconds to seconds
  };

  const formatTime = (time) => {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().substring(0, 2)}`;
  };

  useEffect(() => {
    let timerInterval = null;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTimeLeft = calculateTimeLeft(serverEndTime);
          if (newTimeLeft <= 0) {
            clearInterval(timerInterval);
            setIsRunning(false);
          }
          return newTimeLeft;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, serverEndTime]);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const domNode = e.target.closest("#app");
    const rect = domNode.getBoundingClientRect();
    setRel({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    });

    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = () => {
    localStorage.setItem(`timerPosition_${id}`, JSON.stringify(position));
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const calculateTimeFraction = (totalDuration) => {
    const rawTimeFraction = timeLeft / totalDuration;
    return rawTimeFraction - (1 / totalDuration) * (1 - rawTimeFraction);
  };

  const setCircleDasharray = (totalDuration) => {
    const circleDasharray = `${(
      calculateTimeFraction(totalDuration) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    return circleDasharray;
  };

  useEffect(() => {
    const isMinimized = localStorage.getItem(`timer-${id}-minimized`);
    if (isMinimized === "true") {
      // Hide the timer element if it was minimized
      const timerElement = document.querySelector(`.timer-${id}`);
      if (timerElement) {
        timerElement.style.display = "none";
      }
    }
  }, [id]);

  const minimizeTimer = () => {
    const timerElement = document.querySelector(`.timer-${id}`);
    if (timerElement) {
      timerElement.style.display = "none";
      // toggleSidebar(true);
      // Store the minimized state in local storage
      localStorage.setItem(`timer-${id}-minimized`, true);
    }
  };

  return (
    <div
      id="app"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: dragging ? "grabbing" : "grab",
        borderColor: timerColor,
        color: timerColor,
      }}
      onMouseDown={handleMouseDown}
      className={`timer-${id}`}
    >
      <div className="base-timer">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              id="base-timer-path-remaining"
              strokeDasharray={setCircleDasharray(totalDuration)}
              className="base-timer__path-remaining arc"
              d="
                                M 50, 50
                                m -45, 0
                                a 45,45 0 1,0 90,0
                                a 45,45 0 1,0 -90,0
                            "
              style={{ color: timerColor }}
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          {formatTime(timeLeft)}
        </span>
        <button className="exit-fullscreen" onClick={minimizeTimer}>
              <VisibilityOffIcon /></button>
      </div>

      <div className="timer-title">
        <h3>{timerTitle}</h3>
      </div>
    </div>
  );
};

export default Timer;
