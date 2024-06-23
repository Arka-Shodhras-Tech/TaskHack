import React, { useState, useEffect } from "react";
import "./Timer.css"; // Import your TimerItem CSS file
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
      {show? <VisibilityIcon / >:<VisibilityOffIcon />}
      </button>
    </div>
  );
};

export default TimerItem;
