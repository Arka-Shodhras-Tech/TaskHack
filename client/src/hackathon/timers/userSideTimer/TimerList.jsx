import React from "react";
import TimerItem from "./TimerItem"; // Import your TimerItem component
import "./Timer.css";
import timer from "../icons/timer.svg";
import close from "../icons/close.svg";

const TimerListSidebar = ({ timers, isOpen, toggleSidebar }) => {
  return (
    <div className={`timer-list-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        {isOpen ?<img src={close} alt="Open sidebar" /> : <img src={timer} alt="Open sidebar" />}
      </button>
      <div className="sidebar-content">
        <h2 className="h1">Timers </h2>
        <hr></hr>
       
        <div className="timer-list">
          {timers.map((timer) => (
            <TimerItem
              key={timer.id}
              {...timer}
              toggleSidebar={toggleSidebar}
            />
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default TimerListSidebar;
