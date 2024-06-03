import { Box, Card, CardBody, CardHeader, Center, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import './hackathonpage.css';

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
            <Stack spacing={8} maxW="5xl" w="full">
                <Box textAlign="center" className="timer-box">
                    <Heading size="lg" className="timer-text">Time Left: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</Heading>
                </Box>
                <div style={{ height: "50vh" }}>
                    {tasks.map((task, index) => (
                        <Card key={index} className="task-card">
                            <CardHeader className="task-header">
                                <Heading textAlign="center" fontSize="2xl" className="task-title-color">{task.taskName}</Heading>
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
        </Center>
    );
}
