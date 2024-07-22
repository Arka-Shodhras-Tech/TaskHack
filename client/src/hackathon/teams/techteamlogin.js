import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
  Radio,
  RadioGroup,
  Stack,
  Badge,
} from "@chakra-ui/react";
import Logout from "@mui/icons-material/Logout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../actions/actions";

const TechTeamLoginForm = ({ isAuth }) => {
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [techTeamId, setTechTeamId] = useState("");
  const [newStatus, setNewStatus] = useState(useSelector((state) => state.user.Status));
  const [techTeamPassword, setTechTeamPassword] = useState("");
  const [isTechTeamAuth, setTechTeamAuth] = useState(isAuth);
  const dispatch = useDispatch();
  const techTeamMemberId = useSelector((state) => state.user.TechTeamMemberId);
  

  const Login = async () => {
    if (techTeamId && techTeamPassword) {
      setLoad(true);
      try {
        const res = await Actions.CheckTechTeam(techTeamId, techTeamPassword);

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
            type: "TECHTEAMLOGIN",
            payload: {
              TechTeamLoginState: true,
              TechTeamMemberId: techTeamId,
              Status: res?.data?.Status,
            },
          });

          setTechTeamId("");
          setTechTeamPassword("");
          setTechTeamAuth(true);
        }
      } catch (error) {
        console.error("Error checking Tech Team:", error);
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

  const updateStatus = async () => {
    if (newStatus) {
      try {
        const res = await Actions.UpdateTechTeamMemberStatus(
          techTeamMemberId,
          newStatus
        );
        if (res?.data?.message === "Success") {
          toast({
            title: "Status updated successfully",
            status: "success",
            position: "top-right",
            isClosable: true,
          });
          dispatch({
            type: "TECHTEAMLOGIN",
            payload: {
              TechTeamLoginState: true,
              TechTeamMemberId: techTeamMemberId,
              Status: newStatus,
            },
          });
        } else {
          toast({
            title: "Failed to update status",
            status: "error",
            position: "top-right",
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error updating status:", error);
        toast({
          title: "Error updating status",
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Select a status",
        status: "warning",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    dispatch({
      type: "TECHTEAMLOGIN",
      payload: {
        TechTeamLoginState: false,
      },
    });
    toast({
      title: "Logout successful",
      status: "success",
      position: "top-right",
      isClosable: true,
    });
    window.location.reload();
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
            src="../login-hackathon-banner.jpg"
            alt="Hackathon Logo"
            style={{ maxWidth: "300px", borderRadius: "8px" }}
            loading="lazy"
          />
        </Box>
        <Box>
          <Box textAlign="center">
            <Heading as="h2" size="lg" mb={4}>
              Tech Team Login
            </Heading>
          </Box>
          {isTechTeamAuth ? (
            <Box textAlign="center" mt={4}>
              <Badge m={4}>Your Id: {techTeamMemberId}</Badge>
              <RadioGroup
                onChange={setNewStatus}
                value={newStatus}
              >
                <Stack direction="row" mb={4}>
                  <Radio value="active">Active</Radio>
                  <Radio value="inactive">Inactive</Radio>
                </Stack>
              </RadioGroup>
              <Button onClick={updateStatus} m={2}>
                Update Status
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
                placeholder="Enter Tech Team ID"
                value={techTeamId}
                onChange={(e) => setTechTeamId(e.target.value)}
                onKeyPress={handleKeyPress}
                mb={4}
              />
              <Input
                placeholder="Enter Password"
                type="password"
                value={techTeamPassword}
                onChange={(e) => setTechTeamPassword(e.target.value)}
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

export default TechTeamLoginForm;
