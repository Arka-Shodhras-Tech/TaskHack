import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { Button, useToast } from "@chakra-ui/react";
import "./PigBatter.css";
import hitSound from "./pig-sound.mp3";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const PigBatter = ({ socket }) => {

  var userid = "anil reddy kota"
  const [holes, setHoles] = useState(Array(8).fill(false));
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeHole, setActiveHole] = useState(-1);
  const [gameStarted, setGameStarted] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1000);
  const toast = useToast();
  const [playHit] = useSound(hitSound);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " ") {
        if (!gameStarted) startGame();
      } else if (event.key === "f" || event.key === "F") {
        toggleFullScreen();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameStarted]);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        const newActiveHole = Math.floor(Math.random() * 8);
        setActiveHole(newActiveHole);
        setHoles(holes.map((_, index) => index === newActiveHole));
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [gameStarted, holes, intervalTime]);

  useEffect(() => {
    socket.emit("myHighScore", { userid: userid });
    socket.on("yourHighScore", (data) => {
      if (data && data.score !== undefined) {
        setHighScore(data.score);
      }
    });
    return () => {
      socket.off("yourHighScore");
    };
  }, [socket]);

  const handleHoleClick = (index) => {
    if (!gameStarted) return;
    let newScore
    if (index === activeHole) {
      playHit();
      newScore = score + 5;
      let newStreak = streak + 1;
      if (newStreak === 3) {
        newScore += 10;
        newStreak = 0;
      }
      setScore(newScore); 
      setStreak(newStreak);

     

      setIntervalTime(Math.max(300, 1000 - newScore * 5));
      if (newScore > highScore) {
        setHighScore(newScore);
        socket.emit("newHighScore", { userid: userid, score: newScore });
      }
      setActiveHole(-1);
      setHoles(Array(8).fill(false));
    } else {

     
      toast({
        title: "Game Over",
        description: `Your score is ${score} and high score is ${highScore}`,
        status: "error",
        duration: 2000,
        position: "top",
      });

      setScore(0);
      setStreak(0);
      setActiveHole(-1);
      setHoles(Array(8).fill(false));
      setGameStarted(false);
      setIntervalTime(1000); // Reset interval time
    }
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setGameStarted(true);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="game">
      <div className="game-nav-bar">
        <h1>
          <a href="/"> Home </a> / Pig Batter
        </h1>
        <div className="game-score">
          <h4>Score: {score}</h4>
          <h4>High Score: {highScore}</h4>
        </div>
      </div>

      <section className="game-area">
        <div className="holes">
          {holes.map((hasPig, index) => (
            <div
              key={index}
              className={`hole ${hasPig ? "pig" : ""}`}
              onClick={() => handleHoleClick(index)}
            ></div>
          ))}
        </div>
      </section>
      <div className="game-controls">
        {!gameStarted && <Button onClick={startGame}><PlayCircleFilledWhiteIcon/></Button>}
        {!gameStarted && (
          <Button onClick={toggleFullScreen}> <FullscreenIcon/></Button>
        )}
      </div>
    </div>
  );
};

export default PigBatter;
