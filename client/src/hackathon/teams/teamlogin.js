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
import { CreateTeam } from "./create-team-model";
import "./teamlogin.css";

export const TeamLoginForm = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const [regd, setRegd] = useState("");
  const [ishtr, setIshtr] = useState(false);
  const [password, setPassword] = useState("");
  const [htrId, setHtrId] = useState("");
  const [isHtrAuth, setHtrAuth] = useState(false);
  const [htrPassword, setHtrPassword] = useState("");
  const dispatch = useDispatch();

  const Login = async () => {
    if (ishtr) {
      if (htrId && htrPassword) {
        setLoad(true);
        try {
          const res = await Actions.CheckHTR(htrId, htrPassword);

          if (res?.data?.error) {
            toast({
              title: res?.data?.message,
              status: "error",
              position: "top-right",
              isClosable: true,
            });
          } else {
            toast({
              title: res?.data?.message,
              status: "success",
              position: "top-right",
              isClosable: true,
            });
            setHtrId("");
            setHtrPassword("");
            setHtrAuth(true);
          }
        } catch (error) {
          console.error("Error checking HTR:", error);
        } finally {
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
    } else {
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
            console.log(data)
            dispatch({
              type: "TEAM",
              payload: {
                Teamcode: res?.data?.data?.TeamCode,
                Teamname: res?.data?.data?.Password,
              },
            });
            window.location.href = "/problemstatements";
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
    }
  };

  const fetchData = async () => {
    try {
      const res = await Actions.TeamsCodes();
   
      if (res?.data) {
        setData(res?.data);
      }
    } catch (error) {
      console.error("Error fetching team codes:", error);
    }
  };

  const handelLoginChange = () => {
    if (ishtr && isHtrAuth) {
      toast({
        title: "You Need to ReLogin to Make changes",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      setHtrAuth(false);
    }
    setIshtr(!ishtr);
  };

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [data]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Login();
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50">
      <CreateTeam
        isOpen={show}
        onClose={() => {
          setShow(false);
          fetchData();
        }}
        data={data}
      />
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
            src={process.env.PUBLIC_URL + "/hackathon (1).jpg"}
            alt="Hackathon Logo"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
          />
        </Box>
        <Box>
          <Box textAlign="center">
            <Heading as="h2" size="lg" mb={4}>
              {ishtr ? "HTR Login" : "Team Login"}
            </Heading>
            <Badge
              mb={4}
              cursor="pointer"
              colorScheme={ishtr ? "teal" : "purple"}
              onClick={handelLoginChange}
            >
              {ishtr ? "Switch to Team Login" : "Switch to HTR Login"}
            </Badge>
          </Box>

          {isHtrAuth ? (
            ishtr && (
              <Box textAlign="center" mt={4}>
                <Button variant="link" onClick={() => setShow(true)}>
                  Create Team
                </Button>
              </Box>
            )
          ) : (
            <Box my={4} w="100%">
              <Text fontSize="lg" mb={2}>
                Enter your credentials to login
              </Text>
              {ishtr ? (
                <>
                  <Input
                    placeholder="Enter HTR ID"
                    value={htrId}
                    onChange={(e) => setHtrId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    mb={4}
                  />
                  <Input
                    placeholder="Enter Password"
                    type="password"
                    value={htrPassword}
                    onChange={(e) => setHtrPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    mb={4}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
              <Button
                colorScheme="blue"
                onClick={Login}
                isFullWidth
                disabled={load}
              >
                {load ? <Spinner size="sm" /> : "Login"}
              </Button>
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
