import { Box, Button, Card, CardBody, CardHeader, Heading, Input, Spinner, Stack, StackDivider, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Actions } from "../../actions/actions";
import { HackathonNav } from "../hackathonnav/hackathonnav";
import './ps.css';

export const ProblemStatements = () => {
    const [dat, setDat] = useState([]);
    const [stmt, setStmt] = useState(true)
    const [select, setSelect] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const teamcode = useSelector((state) => state.user?.Teamcode)
    const toast = useToast();

    useEffect(() => {
        fetchTasks();
    }, []);
    const fetchTasks = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_Server + '/statements');
            setIsLoading(false)
            setDat(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const SelectPS = async (number, stmt, desc) => {
        setStmt(false)
        await Actions.SelectPS(teamcode, number, stmt, desc)
            .then((res) => {
                if (res?.data?.message) {
                    fetchTasks();
                    setStmt(true)
                    toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                }
                if (res?.data?.error) {
                    setStmt(true)
                    toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                }
            })
            .catch((e) => {
                setStmt(true)
                toast({ title: e?.message, status: 'error', position: 'bottom-right', isClosable: true })
            })
    }

    const UnSelectPS = async (number) => {
        setStmt(false)
        await Actions.UnSelectPS(teamcode, number)
            .then((res) => {
                if (res?.data?.message) {
                    fetchTasks();
                    setStmt(true)
                    toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                }
                if (res?.data?.error) {
                    setStmt(true)
                    toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                }
            })
            .catch((e) => {
                setStmt(true)
                toast({ title: e?.message, status: 'error', position: 'bottom-right', isClosable: true })
            })
    }

    const checkStmt = (number) => {
        return dat.some(ps => ps?.Number === number && ps?.Users?.some(val => val.includes(teamcode)));
    };

    const SelectedStmt=(user)=>{
        return dat.map(student =>(student?.TeamCode===user&&student?.PS?.Statement)); 
    }

    console.log(SelectedStmt(teamcode))

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
                    <div className="problemstatements">
                        <div className="task-form">
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', margin: '2% 0%' }}>
                                <Button bg="#3AA6B9" onClick={() => setSelect('sports')}>Sports</Button>
                                <Button bg="#3AA6B9" onClick={() => setSelect('yoga')}>Yoga</Button>
                            </div>

                            <Box mt={8}>
                                <div className='task-box'>
                                    <h1 className='h1-tasks'>Problem Statements</h1>
                                    {dat?.filter(val =>
                                    (val?.Theme?.toLowerCase().includes(select) ||
                                        val?.Number?.includes(select) ||
                                        val?.Desc?.toLowerCase().includes(select) ||
                                        val?.Statement?.toLowerCase().includes(select))
                                    ).map((task) => (
                                        <Card>
                                            <CardHeader>
                                                <Heading size='md'>Problem Statement {task?.Number}</Heading>
                                            </CardHeader>

                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='4'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            {task?.Statement}
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {task?.Desc}
                                                        </Text>
                                                        {stmt && <Text textAlign={'center'}>
                                                            {!checkStmt(task?.Number) && <Button onClick={() => SelectPS(task?.Number, task?.Statement, task?.Desc)}>select</Button>}
                                                        </Text>}
                                                    </Box>
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </Box>
                        </div>
                    </div>
            }
        </>
    );
};