import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useToast
} from "@chakra-ui/react";
import Logout from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../actions/actions";
import { CreateTeam } from "./create-team-model";

const HTRLoginForm = ({ isAuth }) => {
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [htrId, setHtrId] = useState("");
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [htrPassword, setHtrPassword] = useState("");
  const [isHtrAuth, setHtrAuth] = useState(isAuth);
  const dispatch = useDispatch()

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
          dispatch({
            type: "HTRLOGIN",
            payload: {
              Htr: res?.data?.data?.HtrCode,
              Htrpass: res?.data?.data?.Password,
              HtrLoginState: true,
            },
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

  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = () => {
    dispatch({
      type: "HTRLOGIN",
      payload: {
        Htr:"",
        Htrpass:"",
        HtrLoginState: false,
      },
    });
    toast(
      {
        title: "logout successfully",
        status: "success"
      }
    )
    window.location.reload();
  }
  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50">
      <CreateTeam isOpen={show} onClose={() => setShow(false)} data={data}
        refreshTeamCodes={() => fetchData()}
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
            src="../login-hackathon-banner.jpg"
            alt="Hackathon Logo"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
            loading="lazy"
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
              <Button onClick={() => setShow(true)} m={2}>
                Create Team
              </Button>
              <Button onClick={handleLogout} m={2} colorScheme="red">

                <Logout />
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
