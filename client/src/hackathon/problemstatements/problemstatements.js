import { Box, Button, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HackathonNav } from "../hackathonnav/hackathonnav";
import './ps.css'

export const ProblemStatements = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_Server + '/statements');
            setIsLoading(false)
            setDat(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    const reloadTasks = () => {
        fetchTasks();
    };

    return (
        <>
            <HackathonNav />
            <Box display="flex" justifyContent="center" mb={6}>
                <Input id="search" value={select} placeholder="Enter problem statement name or number" onChange={(e) => setSelect(e.target.value)} width="70%" />
            </Box>
            {
                isLoading ?
                    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                        <Spinner size="xl" />
                    </Box>
                    :
                    <div className="task-form">
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', margin: '2% 0%' }}>
                            <Button bg="#3AA6B9">Sports</Button>
                            <Button bg="#3AA6B9">Yoga</Button>
                        </div>

                        <Box mt={8}>
                            <div className='task-box'>
                                <h1 className='h1-tasks'>Problem Statements</h1>
                                {dat?.map((task, index) => (
                                    <Box key={index} className='task-item' p={4} borderWidth={1} borderRadius="lg" mb={4}>
                                        <Text fontWeight="bold" textAlign="center">Problem Statement {task?.Number}</Text>
                                        <Text className='task-title'>Statement: {task?.Statement}</Text>
                                        <Text className='task-description'>Description: {task?.Desc}</Text>
                                        <Button>select</Button>
                                    </Box>
                                ))}
                            </div>
                        </Box>
                    </div>
            }
        </>
    );
};


// const groupStudentsIntoTeams = (students, teamSize) => {
//     const teams = [];
//     for (let i = 0; i < students.length; i += teamSize) {
//         const team = students.slice(i, i + teamSize);
//         teams.push(team.map(student => ({ ...student, teamIndex: Math.floor(i / teamSize) + 1 })));
//     }
//     return teams;
// };