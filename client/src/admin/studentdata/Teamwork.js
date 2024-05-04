import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr, Link } from "@chakra-ui/react";

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
            {/* <NavBar /> */}
            <Table variant='striped' colorScheme='teal' style={{ minWidth: "100%" }}>
                <Thead>
                    <Tr>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Start Date</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Work</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>End Date</Th>
                        <Th style={{ backgroundColor: 'teal', color: 'white' }}>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <>
                            <Tr>
                                <Td colSpan={4} style={{ width: '100%', backgroundColor: 'skyblue', color: 'black', textAlign: 'center' }}>{item.Teamname}</Td>
                                <Td></Td>
                            </Tr>
                            <React.Fragment key={index}>
                                <Tr>
                                    <Td className="mobile-view">{item.TeamWork[0].Startdate}</Td>
                                    <Td className="work">{item.TeamWork[0].Work}</Td>
                                    <Td className="end-date">{item.TeamWork[0].Enddate}</Td>
                                    <Td>
                                        <Button colorScheme="orange" size="sm" style={{backgroundColor:"orange"}} onClick={() => handlePost(item.TeamWork[0], 0, item)}>Post</Button>
                                    </Td>
                                </Tr>
                                {expandedTeams.includes(item.Teamname) &&
                                    item.TeamWork.slice(1).map((val, idx) => (
                                        <Tr key={idx}>
                                            <Td className="mobile-view">{val.Startdate}</Td>
                                            <Td className="work">{val.Work}</Td>
                                            <Td className="end-date">{val.Enddate}</Td>
                                            <Td>
                                                <Button colorScheme="orange" style={{backgroundColor:"orange"}} size="sm" onClick={() => handlePost(val, idx + 1, item)}>Post</Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                <Tr>
                                    <Td colSpan={4} style={{ textAlign: 'center' }}>
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
