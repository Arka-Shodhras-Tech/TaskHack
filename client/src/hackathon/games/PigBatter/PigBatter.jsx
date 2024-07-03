import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import useSound from "use-sound";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Kbd,
} from "@chakra-ui/react";
import "./PigBatter.css";
import hitSound from "./pig-sound.mp3";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import InfoIcon from "@mui/icons-material/Info";

const PigBatter = ({ socket }) => {
  var userid = "anil reddy kota";
  const nav = useNavigate();
  const [holes, setHoles] = useState(Array(8).fill(false));
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeHole, setActiveHole] = useState(-1);
  const [gameStarted, setGameStarted] = useState(false);
  const [intervalTime, setIntervalTime] = useState(1000);
  const [playHit] = useSound(hitSound);
  const {
    isOpen: isAboutOpen,
    onOpen: onAboutOpen,
    onClose: onAboutClose,
  } = useDisclosure();
  const {
    isOpen: isGameOverOpen,
    onOpen: onGameOverOpen,
    onClose: onGameOverClose,
  } = useDisclosure({ isCentered: true, closeOnOverlayClick: false });

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

  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem("isFirstVisit");
    if (!isFirstVisit) {
      onAboutOpen();
      sessionStorage.setItem("isFirstVisit", "false");
    }
  }, [onAboutOpen]);

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

      setIntervalTime(Math.max(300, 1000 - newScore * 5));
      if (newScore > highScore) {
        setHighScore(newScore);
        socket.emit("newHighScore", { userid: userid, score: newScore });
      }
      setActiveHole(-1);
      setHoles(Array(8).fill(false));
    } else {
      onGameOverOpen();
    }
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setGameStarted(true);
    onGameOverClose(); // Close the game over modal if it's open
  };

  const handleGameOverClose = () => {
    onGameOverClose();
    nav("/games");
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
        <h3>
          <a href="/"> Home </a>/<a href="/games"> Games </a> / Pig Batter
        </h3>
        <div className="game-score">
          <h4>Score: {score}</h4>
          <h4>High Score: {highScore}</h4>
        </div>
      </div>
      <div className="info-div">
        <Button onClick={onAboutOpen} className="info-button">
          <InfoIcon /> {"  "} About
        </Button>
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
        {!gameStarted && (
          <Button onClick={startGame} colorScheme="green">
            Play
            <PlayCircleFilledWhiteIcon />
          </Button>
        )}
        {!gameStarted && (
          <Button onClick={toggleFullScreen}>
            <FullscreenIcon />
          </Button>
        )}
      </div>

      <Modal isOpen={isAboutOpen} onClose={onAboutClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Game Info and Tips</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>1. Click on the pigs as they appear to score points.</p>
            <p>2.1. Each pig hit gives you 5 points.</p>
            <p>2.2. pig miss ends game.</p>

            <p>3. Hitting 3 pigs in a row gives you an additional 10 points.</p>
            <p>
              4. Use the <Kbd colorScheme='brand' color={"black"}>space bar</Kbd> to start the game and the <Kbd color={"black"}>F</Kbd> to toggle
              full screen mode.
            </p>
            <p>5. For a better experience, use both the mouse and keyboard.</p>
            <p>6. To exit the Game click Exit</p>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onAboutClose}>
             Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isGameOverOpen}
        onClose={handleGameOverClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent className="game-over-modal">
          <ModalHeader>Game Over</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Your score: {score}</p>
            <p>High score: {highScore}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={startGame}>
              Play Again
            </Button>
            <Button colorScheme="red" onClick={handleGameOverClose}>
              Exit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PigBatter;
