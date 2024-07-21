import axios from "axios";
import React, { useState } from "react";
import { Box, Button, Center, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";

export const Login = () => {
  const [regd, setRegd] = useState("");
  const [load, setLoad] = useState(false);
  const toast = useToast();

  const Login = async () => {
    setLoad(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_Server}/verifyregister/${regd}`);
      if (res.data) {
        sessionStorage.student = regd;
        setLoad(false);
        window.location = "192.5264.27";
      } else {
        toast({
          title: "No data found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoad(false);
      }
    } catch (e) {
      console.log(e);
      setLoad(false);
      toast({
        title: "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center h="100vh">
      <Box p={4} borderWidth={1} borderRadius="lg" bg="gray.100" w="sm">
        <FormControl id="register-number" mb={4}>
          <FormLabel>Enter register number</FormLabel>
          <Input
            type="text"
            placeholder="Enter register number"
            onChange={(e) => setRegd(e.target.value.toUpperCase())}
          />
        </FormControl>
        <Button
          colorScheme="green"
          size="lg"
          width="full"
          onClick={Login}
          isLoading={load}
        >
          Login
        </Button>
      </Box>
    </Center>
  );
};
