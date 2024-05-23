import { Link } from "@chakra-ui/react";
import axios from "axios";
import CryptoAES from "crypto-js/aes.js";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

import { id, lock, lock1, salt } from '../../api.js';
import { NavBar } from "../../navbar/navbar";
import { WorkReview } from "../models/workReview.model.js";
import { WorkUpdate } from "../models/workUpdate.model.js";

const TeamWork = () => {
    const [data, setData] = useState([]);
    const [expandedTeams, setExpandedTeams] = useState([]);
    const [rmv, srmv] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [updatemodel, setupdatemodel] = useState(false);
    const [status, setStatus] = useState();
    const [credits, setCredits] = useState(0);
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
            <WorkReview show={modalShow} onHide={() => setModalShow(false)} teamname={ rmv?.item.Teamname} work={rmv?.work} />
            <WorkUpdate show={updatemodel} onHide={() => setupdatemodel(false)} teamname={ rmv?.item.Teamname} work={rmv?.work} endtime={rmv?.endtime}/>
            <NavBar />

            {data?.map((item, index) => (
                item?.TeamWork && <>
                    <Card className="text-center">
                        <Card.Header><b>{item?.Teamname}</b></Card.Header>
                        {
                            item?.TeamWork.map((val, idx) => (
                                !val?.Submited && !val?.Reject &&
                                <Card.Body>
                                    <Card.Title><b>Task : </b> {val.Work}</Card.Title>
                                    <Card.Text>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                                            <div style={{ width: "50%", display: "flex", justifyContent: "space-evenly", marginBottom: "1%" }}>
                                                <Badge pill bg="light" text="dark">Start Date</Badge>
                                                <Badge pill bg="light" text="dark">End Date</Badge>
                                                <Badge pill bg="light" text="dark">Last Update</Badge>
                                            </div>
                                            <div style={{ width: "50%", display: "flex", justifyContent: "space-evenly", marginBottom: "1%" }}>
                                                <Badge pill bg="light" text="dark">Progress</Badge>
                                                <Badge pill bg="light" text="dark">Credits</Badge>
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", marginBottom: "1%" }}>
                                            <div style={{ width: "50%", display: "flex", justifyContent: "space-evenly" }}>
                                                <Badge pill bg="primary">{val.Startdate}</Badge>
                                                <Badge pill bg="warning" text="dark">{val.Enddate}</Badge>
                                                <Badge pill bg="info">{val.Lastupdate}</Badge>
                                            </div>
                                            <div style={{ width: "50%", display: "flex", justifyContent: "space-evenly" }}>
                                                <Badge pill bg="secondary">{val?.Progress}</Badge>
                                                <Badge pill bg="dark">{val?.Credits}</Badge>
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", marginTop: "1%" }}>
                                            {lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) && <Button style={{ backgroundColor: "lightgreen", color: "black" }} onClick={() => { setModalShow(true); srmv({ item, work: val.Work }) }}>Work Review</Button>}
                                            {lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) && <Button style={{ backgroundColor: "lightblue", color: "black" }} onClick={() => { setupdatemodel(true); srmv({ item, work: val.Work,endtime:val.Enddate }) }}>Work Update</Button>}
                                            {/* <Button style={{ backgroundColor: "gray" }}>{val?.Submited ? "Submitted" : "Time out"}</Button> */}
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            ))}
                        {expandedTeams.includes(item?.Teamname) &&
                            item?.TeamWork.map((val, idx) => (
                                (val?.Submited || val?.Reject) &&
                                <Card.Body>
                                    <Card.Title><b>Task : </b> {val.Work}</Card.Title>
                                    <Card.Text>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                                            <div style={{ width: "50%", display: "flex", justifyContent: "space-evenly", marginBottom: "1%" }}>
                                                <Badge pill bg="light" text="dark">Start Date</Badge>
                                                <Badge pill bg="light" text="dark">End Date</Badge>
                                                <Badge pill bg="light" text="dark">Last Update</Badge>
                                            </div>
                                            <div style={{ width: "50%", display: "flex", justifyContent: "space-evenly", marginBottom: "1%" }}>
                                                <Badge pill bg="light" text="dark">Progress</Badge>
                                                <Badge pill bg="light" text="dark">Credits</Badge>
                                                <b bg="light" text="dark">Project</b>
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", marginBottom: "1%" }}>
                                            <div style={{ width: "50%", display: "flex", justifyContent: "space-evenly" }}>
                                                <Badge pill bg="primary">{val.Startdate}</Badge>
                                                <Badge pill bg="warning" text="dark">{val.Enddate}</Badge>
                                                <Badge pill bg="info">{val.Lastupdate}</Badge>
                                            </div>
                                            <div style={{ width: "50%", display: "flex", justifyContent: "space-evenly" }}>
                                                <Badge pill bg="secondary" style={{ color: val?.Submited && "lightgreen" }}>{val?.Progress}</Badge>
                                                <Badge pill bg="dark">{val?.Credits}</Badge>
                                                <b>{val?.Submited ? "Submitted" : "Time out"}</b>
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", marginTop: "1%" }}>
                                            {lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) && <Button style={{ backgroundColor: "lightgreen", color: "black" }} onClick={() => { setModalShow(true); srmv({ item, work: val.Work }) }}>Work Review</Button>}
                                            {lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) && <Button style={{ backgroundColor: "lightblue", color: "black" }} onClick={() => { setupdatemodel(true); srmv({ item, work: val.Work,endtime:val.Enddate }) }}>Work Update</Button>}

                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            ))}
                        <Card.Footer className="text-muted">
                            <Link onClick={() => toggleTeamExpansion(item.Teamname)} style={{ cursor: 'pointer' }}>
                                {expandedTeams.includes(item.Teamname) ? 'View Less' : 'View More'}
                            </Link>
                        </Card.Footer>
                    </Card>
                </>
            ))}
        </>
    );
};

export default TeamWork;
