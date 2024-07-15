import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Input,
  Button,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./hackathonpage.css";
import axios from "axios";
import DisplayTimer from "../timers/displayTimer";
import { useNavigate } from "react-router-dom";
import TeamJoinModal from "./joinhackathonmodal";
import { Actions } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Logout from "@mui/icons-material/Logout";
import Chat from "../../services/chatting/Chat";





export const Hackathonpage = ({ isAuth = false, socket }) => {
  const nav = useNavigate();
  document.title = "Hackathon | Vedic Vision | Team Ast";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [teamCode, setTeamCode] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const teamcode = useSelector((state) => state.user?.Teamcode);
  const teamname = useSelector((state) => state.user?.Teamname);
  const member = useSelector((state) => state.user?.TeamMember);

  const dispatch = useDispatch();
  
  const handleJoin = async () => {
  
  
  
    try {
      const response = await Actions.JoinHackathon(teamCode, registrationNumber, password);

  
      if (response?.data?.error) {
        toast({
          title: "Error joining team.",
          description: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        dispatch({
          type: "JOINHACK",
          payload: {
            TeamCode: response?.data?.data?.TeamCode,
            TeamPassword: response?.data?.data?.Password,
            TeamMember: registrationNumber,
          },
        });
        onClose();
        toast({
          title: "Team joined.",
          description: "You have successfully joined the team.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error joining team.",
        description: error.message || "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };




  const tasks = [
    {
      taskName: "Round 1",
      content: "Description for Task 1",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    },
    {
      taskName: "Round 2",
      content: "Description for Task 2",
      startTime: "11:15 AM",
      endTime: "12:15 PM",
    },
    {
      taskName: "Round 3",
      content: "Description for Task 3",
      startTime: "12:30 PM",
      endTime: "1:30 PM",
    },
  ];
  const handleLogout = ()=>{
    dispatch({
      type: "JOINHACK",
      payload: {
        TeamCode: "",
        TeamPassword: "",
        TeamMember: "",
      },
    });
  }

  return (
    <Center p={8} className="hackathon-container">
      <DisplayTimer socket={socket} />
      <Stack spacing={8} maxW="5xl" w="full">
        <div className="text-center">
          {!isAuth && (
            <Button className="join-button" onClick={onOpen}>
              Join Hackathon
            </Button>
          )}

          {isAuth && (
            <>
         
            <Button className="join-button" onClick={() => window.location.href = "/games"}>
              Games
            </Button>

            <Button onClick={handleLogout} colorScheme="red">
              <Logout />
            </Button>
            </>
          )}
        </div>
        <div>
          {isAuth &&
            tasks.map((task, index) => (
              <Card key={index} className="task-card">
                <CardHeader className="task-header">
                  <Heading textAlign="center" fontSize="2xl" className="task-title-color">
                    {task.taskName}
                  </Heading>
                </CardHeader>
                <CardBody className="task-body">
                  <Text className="task-content">{task.content}</Text>
                  <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Text className="task-time" style={{ color: "green" }}>
                      Start Time: {task.startTime}
                    </Text>
                    <Text className="task-time" style={{ color: "red" }}>
                      End Time: {task.endTime}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            ))}
        </div>
      </Stack>
      {
        isAuth&&<Chat socket={socket} teamId={teamcode} participantId={member} teamname={teamname}/>
      }
      

      <TeamJoinModal
        isOpen={isOpen}
        onClose={onClose}
        teamCode={teamCode}
        setTeamCode={setTeamCode}
        registrationNumber={registrationNumber}
        setRegistrationNumber={setRegistrationNumber}
        password={password}
        setPassword={setPassword}
        handleJoin={handleJoin}
      />
    </Center>
  );
};

export default Hackathonpage;
