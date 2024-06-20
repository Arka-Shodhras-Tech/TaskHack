import React, { useState, useEffect } from "react";
import "./Timer.css"; // Import your TimerItem CSS file

const TimerItem = ({ id, title, endTime, toggleSidebar, timerColor }) => {
  const [show,setShow]=useState(localStorage.getItem(`timer-${id}-minimized`))
  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const difference = new Date(endTime) - now;
    return Math.max(difference / 1000, 0); // Convert milliseconds to seconds
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    let timerInterval = null;
    
      timerInterval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);

    return () => clearInterval(timerInterval);
  }, [ endTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleMaximize = () => {
    const timerElement = document.querySelector(`.timer-${id}`);
    if (timerElement) {
      timerElement.style.display =show? "block":"none";
      localStorage.setItem(`timer-${id}-minimized`,show?false:true);
      setShow((show)=>!show)
    }
  };

  return (
    <div
      className={`timer-item`}
      id={`timer_${id}`}
      style={{ color: timerColor }}
    >
      <div className="timer-content">
        <h3>{title}</h3>
        <hr/>
        <div className="timer-countdown">{formatTime(timeLeft)}</div>
      </div>
      <button className="maximize-btn " onClick={toggleMaximize}>
     
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-eye-slash"
          viewBox="0 0 16 16"
        >
          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
          <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
        </svg>
      </button>
    </div>
  );
};

export default TimerItem;
