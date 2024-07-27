// components/TeamLoginForm.js

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../actions/actions";
import {
  Badge,
  Box,
  Button,
  Input,
  useToast,
  Spinner,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import "./teamlogin.css";

const TeamLoginForm = () => {
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [regd, setRegd] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const Login = async () => {
    if (regd && password) {
      setLoad(true);
      try {
        const res = await Actions.CheckTeam(regd, password);
        if (res?.data?.error) {
          toast({
            title: res?.data?.message,
            status: "error",
            position: "top-right",
            isClosable: true,
          });
        } else {
          dispatch({
            type: "TEAM",
            payload: {
              Teamcode: res?.data?.data?.TeamCode,
              Teamname: res?.data?.data?.Password,
            },
          });
          window.location.href = "/problemstatement-selection";
          toast({
            title: res?.data?.message,
            status: "success",
            position: "top-right",
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error checking Team:", error);
        setLoad(false);
      }
    } else {
      toast({
        title: "All fields are required",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Login();
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50">
      <Flex
        p={8}
        maxW="800px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
        direction={["column", "column", "row"]}
        align="center"
        justify="space-between"
      >
        <Box textAlign="center" mb={[4, 4, 0]} mr={[0, 0, 4]} flexShrink={0}>
          <img
           src="login-hackathon-banner.jpg"
           alt="Hackathon Logo"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
          />
        </Box>
        <Box>
          <Box textAlign="center">
            <Heading as="h2" size="lg" mb={4}>
              Team Login
            </Heading>
          </Box>
          <Box my={4} w="100%">
            <Text fontSize="lg" mb={2}>
              Enter your credentials to login
            </Text>
            <Input
              placeholder="Enter Team Code"
              value={regd}
              onChange={(e) => setRegd(e.target.value)}
              onKeyPress={handleKeyPress}
              mb={4}
            />
            <Input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              mb={4}
            />
            <Button
              colorScheme="blue"
              onClick={Login}
              isFullWidth
              disabled={load}
            >
              {load ? <Spinner size="sm" /> : "Login"}
            </Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};


export default TeamLoginForm;