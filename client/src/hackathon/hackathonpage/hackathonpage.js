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
    useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import './hackathonpage.css';
import axios from "axios";
import DisplayTimer from "../timers/displayTimer";

const calculateTimeLeft = (endTime) => {
    const difference = endTime - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    } else {
        timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
};

export const Hackathonpage = () => {
    const toast=useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [team, setTeam] = useState("");
    const [gmail, setGmail] = useState("");
    const [code, setCode] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const CreateTeam = async () => {
        try {
            const res = await axios.post(process.env.REACT_APP_Server + "/createteam/" + team + "/" + gmail + "/" + phone + "/" + code  )
            setMessage(res.data.message);
            
            if (res.data.message){
                toast({
                    title: 'Request sent',
                    status: 'success',
                    position: 'bottom-right',
                    isClosable: true,
                });
            }
            setTeam("");
            setGmail("");
            setPhone("");
            setCode("");
            onClose();
        } catch (error) {
            toast({
                title: 'Fail to send request',
                    status: 'error',
                    position: 'bottom-right',
                    isClosable: true,
            })
        }
    };

    const JoinTeam = () => {
    };

    const getTargetTime = () => {
        const savedTime = localStorage.getItem("hackathonEndTime");
        if (savedTime) {
            return parseInt(savedTime, 10);
        } else {
            const newTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem("hackathonEndTime", newTime);
            return newTime;
        }
    };

    const [targetTime] = useState(getTargetTime);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetTime));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTime]);

    const tasks = [
        { taskName: "Round 1", content: "Description for Task 1", startTime: "10:00 AM", endTime: "11:00 AM" },
        { taskName: "Round 2", content: "Description for Task 2", startTime: "11:15 AM", endTime: "12:15 PM" },
        { taskName: "Round 3", content: "Description for Task 3", startTime: "12:30 PM", endTime: "1:30 PM" }
    ];

    return (
        <Center p={8} className="hackathon-container">
              <DisplayTimer URL={"https://timer-server-edko.onrender.com"}/>
            <Stack spacing={8} maxW="5xl" w="full">
                <div>
                    <Button className="create-button" onClick={onOpen}>Create Team</Button>
                    <Button className="join-button" onClick={JoinTeam}>Join Team</Button>
                </div>
                <Box textAlign="center">
                    <Heading size="lg" className="timer-text">
                        Time Left: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </Heading>
                </Box>
                <div>
                    {tasks.map((task, index) => (
                        <Card key={index} className="task-card">
                            <CardHeader className="task-header">
                                <Heading textAlign="center" fontSize="2xl" className="task-title-color">
                                    {task.taskName}
                                </Heading>
                            </CardHeader>
                            <CardBody className="task-body">
                                <Text className="task-content">{task.content}</Text>
                                <Box style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                    <Text className="task-time" style={{ color: "green" }}>Start Time: {task.startTime}</Text>
                                    <Text className="task-time" style={{ color: "red" }}>End Time: {task.endTime}</Text>
                                </Box>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </Stack>
            <div>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create Team Request</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box mb={4}>
                                <Input
                                    placeholder="Team Name"
                                    value={team}
                                    onChange={(e) => setTeam(e.target.value)}
                                    mb={2}
                                />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={gmail}
                                    onChange={(e) => setGmail(e.target.value)}
                                    mb={2}
                                />
                                <Input
                                    placeholder="Phone Number"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    mb={2}
                                />
                                <Input
                                    placeholder="Team Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </Box>
                            {message && <Box mt={4} color="red.500">{message}</Box>}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={CreateTeam}>
                                Request to Create Team
                            </Button>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </Center>
    );
};

export default Hackathonpage;
