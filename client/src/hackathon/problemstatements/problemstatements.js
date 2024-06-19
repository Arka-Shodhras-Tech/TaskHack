import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Text, Heading, Spinner, Badge, Input, useToast, Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { HackathonNav } from "../hackathonnav/hackathonnav";

export const ProblemStatements = () => {
    const [dat, setDat] = useState([]);
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const toast = useToast();

    const fetchStudentData = async () => {
        try {
            const result = await axios.post(process.env.REACT_APP_database + "/students");
            setDat(result.data.sort((a, b) => a.Year - b.Year));
        } catch (error) {
            console.error("Error fetching student data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);


    // const groupStudentsIntoTeams = (students, teamSize) => {
    //     const teams = [];
    //     for (let i = 0; i < students.length; i += teamSize) {
    //         const team = students.slice(i, i + teamSize);
    //         teams.push(team.map(student => ({ ...student, teamIndex: Math.floor(i / teamSize) + 1 })));
    //     }
    //     return teams;
    // };

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
                    <div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly',margin:'2% 0%'}}>
                            <Button bg="#3AA6B9">Sports</Button>
                            <Button bg="#3AA6B9">Yoga</Button>
                        </div>
                        <Table variant="simple" width="80%" margin="auto">
                            <Thead >
                                <Tr >
                                    <Th backgroundColor={"#FF9EAA"} color="white">Theme</Th>
                                    <Th backgroundColor={"#FF9EAA"} color="white">Number</Th>
                                    <Th backgroundColor={"#FF9EAA"} color="white">Statement</Th>
                                    <Th backgroundColor={"#FF9EAA"} color="white">Select</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Hii</Td>
                                    <Td>Hii</Td>
                                    <Td>Hii</Td>
                                    <Td>Hii</Td>
                                </Tr>
                                <Tr>
                                    <Td backgroundColor={"white"}>Hii</Td>
                                    <Td backgroundColor={"white"}>Hii</Td>
                                    <Td backgroundColor={"white"}>Hii</Td>
                                    <Td backgroundColor={"white"}>Hii</Td>
                                </Tr>
                            {dat?.map((x, index) => (
                                <Tr key={index}>
                                    {index % 4 === 0 && (
                                        <Td rowSpan={4}>
                                            Team {x.teamIndex}
                                        </Td>
                                    )}
                                    <Td>{x.Name.toUpperCase()}</Td>
                                    <Td>{x.Year} Btech</Td>
                                    <Td>
                                        <Button>Select</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                        </Table>
                    </div>
            }
        </>
    );
};