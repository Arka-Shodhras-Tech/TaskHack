import React, { useEffect, useState } from "react";
import axios from "axios";
import Timer from "./userSideTimer/Timer"; // Assume Timer is your previously created Timer component
import TimerListSidebar from "./userSideTimer/TimerList";
import { io } from "socket.io-client";

const DisplayTimer = ({ URL }) => {
  const [timers, setTimers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  function notifyMe(message, options) {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification(message, options);
      notification.onclick = (event) => {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open("./", "_blank");
      };
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification(message, options);
          notification.onclick = (event) => {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open("./", "_blank");
          };
          // …
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }
  useEffect(() => {
    const socket = io(URL);
    socket.on("newTimer", (timer) => {
      const options = {
        body: `${timer.title} ends at ${timer.endTime}`,
      };
      notifyMe("New Timer Added", options);
      setTimers((prevTimers) => [timer, ...prevTimers]);
    });
    socket.on("timerDeleted", (timerId) => {
      setTimers((prevTimers) =>
        prevTimers.filter((timer) => timer.id !== timerId)
      );
    });

    socket.on("alert", (alert) => {
      console.log(alert);
      const options = {
      body: `${alert.notification}`,
    };
    notifyMe("admin sent you a message", options);

  }
)
    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [URL]);

  useEffect(() => {
    const fetchTimers = async () => {
      try {
        const response = await axios.get(`${URL}/api/timer`); // Adjust the endpoint if needed

        if (response.data.timers) {
          setTimers(response.data.timers);
        }
      } catch (error) {
        console.error("There was an error fetching the timers!", error);
      }
    };

    fetchTimers();
  }, [URL]);
  const toggleSidebar = () => {
    setIsSidebarOpen( !isSidebarOpen);
  };


  return (
    <div>
      {timers.length > 0 ? (
        <>
          {timers.map((timer) => (
            <Timer
              key={timer.id}
              id={timer.id}
              timerTitle={timer.title}
              serverEndTime={timer.endTime}
              URL={URL}
              timerColor={timer.timerColor}
              toggleSidebar={toggleSidebar}
            />
          ))}
          <TimerListSidebar
            timers={timers}
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default DisplayTimer;
