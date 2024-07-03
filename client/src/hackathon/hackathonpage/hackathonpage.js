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

const calculateTimeLeft = (endTime) => {
    const difference = endTime - new Date().getTime();
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  
    return timeLeft;
  };
  
  
  const getTargetTime = () => {
    // August 14, 2024, 9:00 AM
    const targetDate = new Date('2024-08-14T09:00:00');
    return targetDate.getTime();
  };

export const Hackathonpage = ({isAuth = false,socket}) => {
 const nav = useNavigate();
  // document.title = "Hackathon | Vedic Vision | Team Ast"

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(getTargetTime()));
  const [targetTime] = useState(getTargetTime);
  const JoinTeam = () => {}

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);



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

  return (
    <Center p={8} className="hackathon-container">
      <DisplayTimer socket={socket} />
      <Stack spacing={8} maxW="5xl" w="full">
        <div className="text-center">
      
         { isAuth && <Button className="join-button" onClick={JoinTeam}>
            Join Team
          </Button>
          
          }

          {!isAuth &&  <div>
            <Button className="join-button" onClick={()=>window.location.href="/games"}>games </Button>
      </div>}
        </div>
        <Box textAlign="center" className="d-none">
          <Heading size="lg" className="timer-text">
            Time Left: {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S
          </Heading>
        </Box>
        <div>
          {isAuth && tasks.map((task, index) => (
            <Card key={index} className="task-card">
              <CardHeader className="task-header">
                <Heading
                  textAlign="center"
                  fontSize="2xl"
                  className="task-title-color"
                >
                  {task.taskName}
                </Heading>
              </CardHeader>
              <CardBody className="task-body">
                <Text className="task-content">{task.content}</Text>
                <Box
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
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
     
    </Center>
  );
};

export default Hackathonpage;
