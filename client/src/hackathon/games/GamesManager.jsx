import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const gameCodeToName = {
  "game-001": "Pig Batter",
};

const GameManager = ({ socket }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const toast = useToast();

  useEffect(() => {
    socket.emit("gameData");
    socket.on("gameData", (data) => {
      if (data.code === "000") {
        toast({
          title: "No Games Available to play",
          status: "error",
          position: "top",
        });
        nav("/");
      } else {
        setGames([data]);
      }
      setLoading(false);
    });

    return () => {
      socket.off("gameData");
    };
  }, [socket, nav, toast]);

  const handleGameClick = (gameCode) => {
    nav(`/game/${gameCode}`, { state: { games } });
  };

  return (
    <Box p={4}>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Heading as="h1" mb={4}>
            Available Games
          </Heading>
          <List spacing={3}>
            {games.map((game) => (
              <ListItem key={game.code}>
                <Button
                  onClick={() => handleGameClick(game.code)}
                  colorScheme="teal"
                >
                  {gameCodeToName[game.code] || game.code}
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default GameManager;
