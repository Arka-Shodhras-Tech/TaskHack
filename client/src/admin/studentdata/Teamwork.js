import { Flex, Link, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import CryptoAES from "crypto-js/aes.js";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { id, lock, lock1, salt } from '../../api.js';
import { NavBar } from "../../navbar/navbar";

const TeamWork = () => {
    const [data, setData] = useState([]);
    const [expandedTeams, setExpandedTeams] = useState([]);
    const [rmv, srmv] = useState();
    const [load, sload] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [status, setStatus] = useState();
    const [credits, setCredits] = useState(0);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const [startdate, setstartdate] = useState();
    useEffect(() => {
        setstartdate(`${year}-${month}-${day}`);
    }, [year, month, day]);

    const PostWork = async () => {
        if (credits && status) {
            await axios.post(`${process.env.REACT_APP_Server}/postwork` + rmv?.Teamname + "/" + credits + "/" + status + "/" + startdate)
                .then((res) => {
                    if (res.data.message) {
                        alert("Updated work")
                    }
                    else {
                        alert(res.data.error)
                    }
                })
                .catch((e) => console.log(e));
        }
        else {
            alert("Enter all fields")
        }
    }

    console.log(credits, status)

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_Server}/Teamworkdata`)
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        if (credits > 10) {
            alert("Enter credites b/w 1 t0 10")
            setCredits('');
        }
    }, [credits])

    const toggleTeamExpansion = (teamName) => {
        setExpandedTeams((prevState) =>
            prevState.includes(teamName)
                ? prevState.filter((name) => name !== teamName)
                : [...prevState, teamName]
        );
    };

    return (
        <>
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {rmv?.Teamname}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Flex align="center" justify="center" direction="column" w="90%" maxW="500px" m="auto" p="20px" bg="rgba(255, 255, 255, 0.5)" backdropFilter="blur(10px)" border="1px solid rgba(255, 255, 255, 0.2)" borderRadius="10px" mt="10px" >
                        <Form.Label htmlFor="inputPassword5"><b>Work Progress</b></Form.Label>
                        <Form.Check type="radio" id="pending">
                            <Form.Check.Input for="pending" name="same" type="radio" onChange={(e) => setStatus("Pending")} isValid />
                            <Form.Check.Label style={{ color: "yellowgreen" }}>Pending</Form.Check.Label>
                        </Form.Check>
                        <Form.Check type="radio" id="progress">
                            <Form.Check.Input for="progress" name="same" type="radio" onChange={(e) => setStatus("Progress")} isValid />
                            <Form.Check.Label style={{ color: "orange" }}>Progress</Form.Check.Label>
                        </Form.Check>
                        <Form.Check type="radio" id="complete">
                            <Form.Check.Input for="complete" name="same" type="radio" onChange={(e) => setStatus("Complete")} isValid />
                            <Form.Check.Label style={{ color: "green" }}>Complete</Form.Check.Label>
                        </Form.Check>
                        <Form.Check type="radio" id="none">
                            <Form.Check.Input for="none" name="same" type="radio" onChange={(e) => setStatus("")} isValid />
                            <Form.Check.Label style={{ color: "black" }}>None</Form.Check.Label>
                        </Form.Check>
                        <Form.Label htmlFor="inputPassword5"><b>Enter No of Credits</b></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter no of credits"
                            aria-describedby="passwordHelpBlock"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                        />
                        <Flex style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }} mt="10px">
                            <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} mr="5px" onClick={PostWork}>Submit</Button>
                            <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} ml="5px" onClick={() => setModalShow(false)}>Cancel</Button>
                        </Flex>
                    </Flex>
                </Modal.Body>
            </Modal>
            <NavBar />
            <Table variant='striped' colorScheme='teal' style={{ minWidth: "100%" }}>
                <Thead>
                    <Tr>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Work</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Start Date</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>End Date</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Status</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Last Update</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Credits</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((item, index) => (
                        item?.TeamWork && <>
                            <Tr>
                                <Td colSpan={8} style={{ width: '100%', backgroundColor: 'skyblue', color: 'black', textAlign: 'center' }}>{item?.Teamname}</Td>
                                <Td></Td>
                            </Tr>
                            <React.Fragment key={index}>
                                {
                                    item?.TeamWork.map((val, idx) => (
                                        !val?.Submited&&<Tr key={idx}>
                                            <Td className="work">{val.Work}</Td>
                                            <Td className="mobile-view">{val.Startdate}</Td>
                                            <Td className="end-date">{val.Enddate}</Td>
                                            <Td className="end-date">{val.Progress}</Td>
                                            <Td className="end-date">{val.Credits}</Td>
                                            <Td className="end-date">{val.Lastupdate}</Td>
                                            <Td style={{ display: "flex" }}>
                                                {lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) ? <Button style={{ backgroundColor: "orange" }} onClick={() => { setModalShow(true); srmv(item) }}>Post</Button> : <Button href="/" style={{ backgroundColor: "orange" }}>Post by Admin</Button>}
                                            </Td>
                                        </Tr>
                                    ))}
                                {expandedTeams.includes(item?.Teamname) &&
                                    item?.TeamWork.map((val, idx) => (
                                        val?.Submited||val?.Reject&&<Tr key={idx}>
                                            <Td className="work">{val.Work}</Td>
                                            <Td className="mobile-view">{val.Startdate}</Td>
                                            <Td className="end-date">{val.Enddate}</Td>
                                            <Td className="end-date">{val.Progress}</Td>
                                            <Td className="end-date">{val.Credits}</Td>
                                            <Td className="end-date">{val.Lastupdate}</Td>
                                            <Td style={{ display: "flex" }}>
                                                <Button style={{ backgroundColor: "gray" }}>{val?.Submited ? "Submitted" : "Time out"}</Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                <Tr>
                                    <Td colSpan={8} style={{ textAlign: 'center' }}>
                                        <Link onClick={() => toggleTeamExpansion(item.Teamname)} style={{ cursor: 'pointer' }}>
                                            {expandedTeams.includes(item.Teamname) ? 'View Less' : 'View More'}
                                        </Link>
                                    </Td>
                                </Tr>
                            </React.Fragment>
                        </>
                    ))}
                </Tbody>
            </Table>
        </>
    );
};

export default TeamWork;
