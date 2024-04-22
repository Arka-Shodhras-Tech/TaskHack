import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavBar } from "../../navbar/navbar";
import { Table, Tbody, Td, Th, Thead, Tr, TableContainer } from "@chakra-ui/react";
import './teamwork.css';

const TeamWork = () => {
    const [data, setData] = useState([]);
    const [expandedTeams, setExpandedTeams] = useState([]);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_Server}/Teamworkdata`)
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    const handlePost = (val, index, item) => {
        // Handle post action
        console.log("Post clicked:", val, index, item);
    };

    const toggleTeamExpansion = (teamName) => {
        setExpandedTeams((prevState) =>
            prevState.includes(teamName)
                ? prevState.filter((name) => name !== teamName)
                : [...prevState, teamName]
        );
    };

    return (
        <>
            <NavBar />
            <TableContainer style={{ width: "100%", overflowX: "auto" }}>
                <Table variant='striped' colorScheme='teal' style={{ minWidth: "100%" }}>
                    <Thead>
                        <Tr>
                            <Th style={{ backgroundColor: 'teal', color: 'white' }}>Start Date</Th>
                            <Th style={{ backgroundColor: 'teal', color: 'white' }}>Work</Th>
                            <Th style={{ backgroundColor: 'teal', color: 'white' }}>End Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, index) => (
                            <>
                                <Tr>
                                    <Td colSpan={3} style={{ width: '100%', backgroundColor: 'skyblue', color: 'black', textAlign: 'center' }}>{item.Teamname}</Td>
                                </Tr>
                                <React.Fragment key={index}>
                                    <Tr>
                                        <Td className="mobile-view">{item.TeamWork[0].Startdate}</Td>
                                        <Td className="work">{item.TeamWork[0].Work}</Td>
                                        <Td className="end-date">{item.TeamWork[0].Enddate}
                                        <Button style={{ backgroundColor: 'orange', display: 'block' }} >Post</Button>
                                        </Td>
                                    </Tr>
                                    {expandedTeams.includes(item.Teamname) &&
                                        item.TeamWork.slice(1).map((val, idx) => (
                                            <Tr key={idx}>
                                                <Td className="mobile-view">{val.Startdate}</Td>
                                                <Td className="work">{val.Work}</Td>
                                                <Td className="end-date">{val.Enddate}
                                                <Button style={{ backgroundColor: 'orange', display: 'block' }} onClick={() => handlePost(val, idx, item)}>Post</Button></Td>
                                            </Tr>
                                        ))
                                    }
                                    <Tr>
                                        <Td colSpan={3} style={{ textAlign: 'center' }}>
                                            <a onClick={() => toggleTeamExpansion(item.Teamname)} style={{cursor:'pointer'}}>{expandedTeams.includes(item.Teamname) ? 'View Less' : 'View More'}</a>
                                        </Td>
                                    </Tr>
                                </React.Fragment>
                            </>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TeamWork;
