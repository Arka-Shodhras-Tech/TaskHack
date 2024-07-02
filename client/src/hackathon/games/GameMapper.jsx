import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
import PigBatter from "./PigBatter/PigBatter";

const gameComponents = {
  "game-001": PigBatter,
  // Add more mappings as needed
};

const GameMapper = ({socket}) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [gameExists, setGameExists] = useState(true);
  const { games } = location.state || { games: [] };

  useEffect(() => {
    const game = games.find((g) => g?.code === name);
    if (!game) {
      setGameExists(false);
      navigate("/games");
    }
  }, [name, navigate, games]);

  const GameComponent = gameComponents[name];

  return (
    <Box p={4}>
      {gameExists && GameComponent ? (
        <GameComponent socket={socket}/>
      ) : (
        <Heading as="h2">Game not found</Heading>
      )}
    </Box>
  );
};

export default GameMapper;
