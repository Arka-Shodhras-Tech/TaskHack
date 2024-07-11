import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from "react-redux";

const gameCodeToImage = {
  "game-001": "./game-banner.png",
};

const gameCodeToName = {
  "game-001": "Pig Batter",
};

const GameManager = ({ socket }) => {


  const member = useSelector((state) => state.user?.TeamMember);

  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const handleGameData = (data) => {
      if ((data && data.code === "000" )|| !data) {
        toast({
          title: "No Games Available to play",
          status: "error",
          position: "top",
          isClosable: true,
        });
        navigate("/");
      } else {
        setGames([data]);
      }
      setLoading(false);
    };

    // Fetch initial game data
    socket.emit("gameData");

    // Listen for game data updates
    socket.on("gameData", handleGameData);

    return () => {
      socket.off("gameData", handleGameData);
    };
  }, [socket, navigate, toast]);

  const handleGameClick = (gameCode) => {
    navigate(`/game/${gameCode}`, { state: { games ,member} });
  };

  const handleBackClick = () => {
    navigate('/'); 
  };

  return (
    <Box p={4} textAlign="center">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Heading as="h1" mb={4}>
            <Button onClick={handleBackClick} variant="link" mr={2}>
              <ArrowBackIcon />
            </Button>
            Available Games
          </Heading>
          <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
            {games && games?.map((game) => (
              <Box
                key={game.code}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                m={2}
                textAlign="center"
                boxShadow="lg"
                maxWidth="370px"
              >
                <img
                  src={gameCodeToImage[game?.code]}
                  alt={gameCodeToName[game?.code]}
                  style={{ marginBottom: "10px", maxWidth: "100%", height: "auto" }}
                />
                <Heading as="h2" size="md" mb={2}>
                  {gameCodeToName[game?.code] || game?.code}
                </Heading>
                <Button
                  onClick={() => handleGameClick(game?.code)}
                  colorScheme="teal"
                  width="100%"
                >
                  Play
                </Button>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default GameManager;
