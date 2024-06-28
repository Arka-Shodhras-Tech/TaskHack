import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { Button, Toast, useToast } from "@chakra-ui/react";
import "./PigBatter.css";
import hitSound from "./pig-sound.mp3";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const PigBatter = () => {
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

  const handleHoleClick = (index) => {
    if (!gameStarted) return;

    if (index === activeHole) {
      playHit();
      let newScore = score + 5;
      let newStreak = streak + 1;
      if (newStreak === 3) {
        newScore += 10;
        newStreak = 0;
      }
      setScore(newScore);
      setStreak(newStreak);

      if (newScore > highScore) {
        setHighScore(newScore);
      }

   
      setIntervalTime(Math.max(300, 1000 - newScore * 5));

      setActiveHole(-1);
      setHoles(Array(8).fill(false));
    } else {
      toast({
        title: "Game Over",
        description: ` your score is ${score} and high score is ${highScore}`,
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
      <h1 className="h1-animation">Vedic Vision Hackathon</h1>
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
