import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Heading, Input, Select, Table, Tbody, Td, Th, Thead, Tr, Box, Text, FormControl, FormLabel, Radio, RadioGroup } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

export const Exam = () => {
    const pageparam = new URLSearchParams(window.location.search);
    const page1 = pageparam.get("questions");
    const page2 = pageparam.get("choose answer");
    const page3 = pageparam.get("fill in the blank");
    
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [teamname, setTeamname] = useState("");
    const [regd, setRegd] = useState(null);
    const [ques, setQues] = useState(page1);
    const [blank, setBlank] = useState(page3);
    const [choose, setChoose] = useState(page2);
    const [ans, setAns] = useState("");
    const [ans1, setAns1] = useState(null);
    const [marks, setMarks] = useState(0);
    const [btns, setBtns] = useState("");
    const [i, setI] = useState(0);
    const [j, setJ] = useState(0);
    const [load, setLoad] = useState(false);
    const [all, setAll] = useState(!page1 && !page2 && !page3);
    const buttonref = useRef(null);

    const Request = async () => {
        const btn = document.getElementById(btns);
        btn.innerHTML = "Please wait....";
        try {
            const res = await axios.post(`${process.env.REACT_APP_Server}/request/${regd.index}/${regd.val.Registernumber}`);
            btn.innerHTML = res.data ? "Request sent" : "Request failed try again";
        } catch (e) {
            console.log(e);
            btn.innerHTML = "Request failed try again";
        }
    };

    const Submit = async () => {
        setLoad(true);
        if (JSON.parse(sessionStorage.getItem(`${ans1.val.Question}`))?.question === ans1.val.Question ? JSON.parse(sessionStorage.getItem(`${ans1.val.Question}`)).answer : ans) {
            const student = sessionStorage.student;
            const index = i;
            const question = ans1.val.Question;
            const answer = ans1.val.Answer;
            try {
                const res = await axios.post(`${process.env.REACT_APP_Server}/exam/`, { student, index, question, answer, ans: JSON.parse(sessionStorage.getItem(`${ans1.val.Question}`))?.question === ans1.val.Question ? JSON.parse(sessionStorage.getItem(`${ans1.val.Question}`)).answer : ans });
                if (res.data) {
                    if (ans1.len === i) {
                        document.getElementById("blank").click();
                    } else {
                        setI(i + 1);
                    }
                    setAns('');
                    setLoad(false);
                } else {
                    alert("Try again");
                    setLoad(false);
                }
            } catch (e) {
                console.log(e);
                setLoad(false);
            }
        } else {
            alert("Enter answer and submit");
            setLoad(false);
        }
    };

    const Choosesubmit = async () => {
        if (ans && ans1) {
            if (ans1.val.Answer === ans) {
                setMarks(marks + 1);
            }
            setI(i + 1);
            setJ(j + 1);
            setAns('');
        } else {
            alert("Choose one option");
        }
    };

    const Submitexam = async () => {
        document.getElementById(ans1.index).innerHTML = "Please wait";
        try {
            const res = await axios.post(`${process.env.REACT_APP_Server}/sumitexam/${ans1.index}/${ans1.val.Registernumber}/${marks}`);
            if (res.data) {
                document.getElementById(ans1.index).innerHTML = "Submitted exam";
                sessionStorage.removeItem("student");
                window.location.reload(5);
            } else {
                document.getElementById(ans1.index).innerHTML = "Please again submit";
            }
        } catch (e) {
            document.getElementById(ans1.index).innerHTML = "Network Error";
        }
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                try {
                    buttonref.current.click();
                    alert("Exam Submitted Successfully");
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentData = await axios.post(`${process.env.REACT_APP_Server}/studentdata`);
                setData1(studentData.data);
                const examData = await axios.post(`${process.env.REACT_APP_Server}/examdata`);
                setData(examData.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Container centerContent>
                <Box p={4} borderWidth={1} borderRadius="md">
                    <Input 
                        placeholder="Enter Team Name" 
                        onChange={(e) => setTeamname(e.target.value.toUpperCase())} 
                        mb={4}
                    />
                    <Text textAlign="center" mb={2}><b>OR</b></Text>
                    <Select 
                        placeholder="Select Your Team" 
                        onChange={(e) => setTeamname(e.target.value)} 
                        mb={4
                    }>
                        {data1.map((val) => (
                            <option key={val.Teamname}>{val.Teamname}</option>
                        ))}
                    </Select>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th colSpan="4" textAlign="center">Team Name: {teamname}</Th>
                            </Tr>
                            <Tr>
                                <Th textAlign="center">S.NO</Th>
                                <Th textAlign="center">Students</Th>
                                <Th textAlign="center">Confirm</Th>
                                <Th textAlign="center">Action</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {data1.map((item) => (
                                item.Teamname === teamname &&
                                <>
                                    {item.Teammembers.map((val, index) => (
                                        <Tr key={val.Registernumber}>
                                            <Td textAlign="center">{index + 1}</Td>
                                            <Td textAlign="center">{val.Name}</Td>
                                            <Td textAlign="center">{val.Registernumber}</Td>
                                            <Td textAlign="center">
                                                {val.Confirm ? (
                                                    <Button colorScheme="green" disabled>Accepted</Button>
                                                ) : (
                                                    <Button 
                                                        colorScheme="teal" 
                                                        onClick={() => { setRegd({ val, index }); setBtns(val.Registernumber); Request(); }}
                                                    >
                                                        Request
                                                    </Button>
                                                )}
                                            </Td>
                                        </Tr>
                                    ))}
                                </>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Container>

            <Container centerContent my={4}>
                <Text color="red" textAlign="center">
                    <b>Note:</b> Submit your exam then your paper goes under verification, otherwise you lose your score.
                </Text>
            </Container>

            <Container centerContent>
                <Box p={4} borderWidth={1} borderRadius="md">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th textAlign="center">
                                    <Link to="/192.5264.27?questions=true">
                                        <Button 
                                            colorScheme={ques ? "blue" : "gray"} 
                                            onClick={() => { setQues(true); setChoose(false); setBlank(false); setI(0); setAll(false); }}
                                        >
                                            Questions
                                        </Button>
                                    </Link>
                                </Th>
                                <Th textAlign="center">
                                    <Link to="/192.5264.27?choose answer=true">
                                        <Button 
                                            colorScheme={choose ? "blue" : "gray"} 
                                            onClick={() => { setQues(false); setChoose(true); setBlank(false); setI(0); setAll(false); }}
                                        >
                                            Choose the correct Answers
                                        </Button>
                                    </Link>
                                </Th>
                                <Th textAlign="center">
                                    <Link to="/192.5264.27?fill in the blank=true">
                                        <Button 
                                            colorScheme={blank ? "blue" : "gray"} 
                                            onClick={() => { setQues(false); setChoose(false); setBlank(true); setI(0); setAll(false); }}
                                        >
                                            Fill in the blanks
                                        </Button>
                                    </Link>
                                </Th>
                            </Tr>
                        </Thead>
                    </Table>
                </Box>
            </Container>

            <Container centerContent>
                {load && <Text>Loading....</Text>}
                {all && <Heading>Choose Your Exam</Heading>}
                {ques && (
                    data.map((val, index) => (
                        <Box key={val.Question} p={4} borderWidth={1} borderRadius="md" mb={4}>
                            {index === i && val.Type === "question" && (
                                <>
                                    <Heading size="md" mb={4}>Q.{i + 1} {val.Question}</Heading>
                                    <FormControl>
                                        <FormLabel>Enter Your Answer</FormLabel>
                                        <Input 
                                            placeholder="Enter Your Answer"
                                            value={ans}
                                            onChange={(e) => { setAns(e.target.value.toUpperCase()); setAns1({ val, index, len: data.length - 1 }); }}
                                            mb={4}
                                        />
                                    </FormControl>
                                    <Button colorScheme="teal" onClick={() => Submit()}>Submit</Button>
                                </>
                            )}
                        </Box>
                    ))
                )}
                {choose && (
                    data.map((val, index) => (
                        <Box key={val.Question} p={4} borderWidth={1} borderRadius="md" mb={4}>
                            {index === i && val.Type === "choose answer" && (
                                <>
                                    <Heading size="md" mb={4}>Q.{j + 1} {val.Question}</Heading>
                                    <FormControl>
                                        <FormLabel>Choose the correct answer</FormLabel>
                                        <RadioGroup onChange={(value) => { setAns(value); setAns1({ val, index, len: data.length - 1 }); }}>
                                            <Radio value={val.Option1}>{val.Option1}</Radio>
                                            <Radio value={val.Option2}>{val.Option2}</Radio>
                                            <Radio value={val.Option3}>{val.Option3}</Radio>
                                            <Radio value={val.Option4}>{val.Option4}</Radio>
                                        </RadioGroup>
                                    </FormControl>
                                    <Button colorScheme="teal" onClick={() => Choosesubmit()} mt={4}>Submit</Button>
                                </>
                            )}
                        </Box>
                    ))
                )}
                {blank && (
                    data.map((val, index) => (
                        <Box key={val.Question} p={4} borderWidth={1} borderRadius="md" mb={4}>
                            {index === i && val.Type === "fill in the blank" && (
                                <>
                                    <Heading size="md" mb={4}>Q.{i + 1} {val.Question}</Heading>
                                    <FormControl>
                                        <FormLabel>Enter Your Answer</FormLabel>
                                        <Input 
                                            placeholder="Enter Your Answer"
                                            value={ans}
                                            onChange={(e) => { setAns(e.target.value.toUpperCase()); setAns1({ val, index, len: data.length - 1 }); }}
                                            mb={4}
                                        />
                                    </FormControl>
                                    <Button colorScheme="teal" onClick={() => Submit()} mt={4} ref={buttonref}>Submit</Button>
                                </>
                            )}
                        </Box>
                    ))
                )}
            </Container>
        </>
    );
};
