import React, { useEffect, useState, useRef } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Avatar,
  Input,
  Button,
  Text,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import SendIcon from "@mui/icons-material/Send";
import "./Chat.css";
const MotionBox = motion(Box);

function Chat({ socket, participantId, teamId,teamname }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(
    JSON.parse(localStorage.getItem("isChatOpen")) || false
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinTeam", teamId, participantId);

    socket.on("chatmessage", handleIncomingMessage);

    return () => {
      socket.off("chatmessage", handleIncomingMessage);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("isChatOpen", JSON.stringify(isChatOpen));
  }, [isChatOpen]);

  useEffect(() => {
    socket.on("fullmessages", (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.off("fullmessages");
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleIncomingMessage = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        timestamp: new Date().toISOString(),
        participantId: participantId,
        teamId: teamId,
      };
      socket.emit("chatmessage", newMessage);
      setMessage("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  const formatMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()}`;
  };

  return (
    <ChakraProvider>
      <Box
        bg="gray.700"
        color="white"
        position="fixed"
        bottom="0"
        right="0"
        borderRadius="md"
        boxShadow="dark-lg"
      >
        <Box
          bg="gray.800"
          borderRadius="md"
          w={{ base: "90vw", sm: "380px" }}
          boxShadow="lg"
        >
          {isChatOpen ? (
            <VStack spacing={4} align="stretch" h="90vh">
              <Box
                bg="gray.900"
                borderRadius="md"
                p={2}
                boxShadow="md"
                textAlign="center"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack spacing={2} alignItems="center">
                  <Avatar name={teamname||` Team ${teamId}'s chat`} src="" size="sm" />
                  <Text fontSize="xl" fontWeight="bold" mb={0} color="white">
                   {teamname||` Team ${teamId}'s chat`}
                  </Text>
                </HStack>
                <IconButton
                  aria-label="Close chat"
                  icon={<ChevronUpIcon />}
                  onClick={() => setIsChatOpen(false)}
                  colorScheme="teal"
                  size="sm"
                />
              </Box>
              <Box
                bg="gray.800"
                borderRadius="md"
                p={4}
                flex="1"
                overflowY="auto"
                className="messages"
              >
                {messages.map((msg, index) => (
                  <React.Fragment key={index}>
                    {(index === 0 ||
                      new Date(msg.timestamp).toDateString() !==
                        new Date(messages[index - 1].timestamp).toDateString()) && (
                      <Box
                        position="sticky"
                        justifyContent="center"
                        display="flex"
                        top="0"
                        zIndex={50}
                      >
                        <Badge colorScheme="green">
                          {formatMessageDate(msg.timestamp)}
                        </Badge>
                      </Box>
                    )}
                    <VStack
                      align={
                        msg.participantId === participantId
                          ? "flex-end"
                          : "flex-start"
                      }
                      w="100%"
                    >
                      <HStack
                        mb={2}
                        justify={
                          msg.participantId === participantId
                            ? "flex-end"
                            : "flex-start"
                        }
                        w="100%"
                      >
                        {msg.participantId !== participantId && (
                          <Avatar name={msg.participantId} src="" size="sm" />
                        )}
                        <MotionBox
                          bg={
                            msg.participantId === participantId
                              ? "teal.500"
                              : "gray.600"
                          }
                          color="white"
                          borderRadius="md"
                          p={2}
                          maxW="70%"
                          alignSelf={
                            msg.participantId === participantId
                              ? "flex-end"
                              : "flex-start"
                          }
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Text color={"gray.900"} mb={0}>
                            {msg.text}
                          </Text>
                          <Text fontSize="9px" color="gray.300" m={0}>
                            {formatTimestamp(msg.timestamp)}
                          </Text>
                        </MotionBox>
                        {msg.participantId === participantId && (
                          <Avatar name={msg.participantId} src="" size="sm" />
                        )}
                      </HStack>
                    </VStack>
                  </React.Fragment>
                ))}
                <div ref={messagesEndRef} />
              </Box>
              <HStack p={2}>
                <Input
                  variant="filled"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                {message && (
                  <Button onClick={handleSendMessage} colorScheme="teal">
                    <SendIcon />
                  </Button>
                )}
                <Button
                  position={"fixed"}
                  bottom={"60px"}
                  right={"20px"}
                  size="sm"
                  onClick={scrollToBottom}
                >
                  <ArrowDownIcon />
                </Button>
              </HStack>
            </VStack>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              w="100%"
              height="50px"
              p={2}
            >
              <Avatar name={teamname||` Team ${teamId}'s chat`} src={teamId} size="sm" />
              <Text
                fontSize="xl"
                fontWeight="bold"
                verticalAlign="baseline"
                color="white"
                mb={0}
              >
                {" "}
                AST TEAM CHATS{" "}
              </Text>
              <IconButton
                aria-label="Open chat"
                icon={<ChevronDownIcon />}
                onClick={() => setIsChatOpen(true)}
                colorScheme="teal"
                size="sm"
              />
            </Box>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Chat;
