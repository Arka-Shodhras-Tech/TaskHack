// components/HTRLoginForm.js

import React, { useState } from "react";
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
import Logout from "@mui/icons-material/Logout";

const HTRLoginForm = () => {
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [htrId, setHtrId] = useState("");
  const [data, setData] = useState([])
  const [show,setShow] = useState(false)
  const [htrPassword, setHtrPassword] = useState("");
  const [isHtrAuth, setHtrAuth] = useState(false);
 

  const Login = async () => {
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
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Login();
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
  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50">
      <CreateTeam
        isOpen={show}
      onClose={()=>setShow(false)}
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
              HTR Login
            </Heading>
          </Box>
          {isHtrAuth ? (
            <Box textAlign="center" mt={4} >
              <Button  onClick={() => setShow(true)} m={2}>
                Create Team
              </Button>
              <Button  onClick={() => window.location.reload()}m={2} colorScheme="red">
                
                <Logout/>
              </Button>
            </Box>
          ) : (
            <Box my={4} w="100%">
              <Text fontSize="lg" mb={2}>
                Enter your credentials to login
              </Text>
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

export default HTRLoginForm;
