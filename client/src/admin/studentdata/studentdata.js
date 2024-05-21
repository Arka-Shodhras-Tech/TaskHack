import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { NavBar } from "../../navbar/navbar";

export const Studentdata = () => {
    const [data, sdata] = useState([]);
    const [rmv, srmv] = useState();
    const [load, sload] = useState();
    const [load1, sload1] = useState(true);
    const [modalShow, setModalShow] =useState(false);
    const [work, setwork] = useState();
    const [enddate, setenddate] = useState();
    const [startdate, setstartdate] = useState();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    useEffect(() => {
        setstartdate(`${year}-${month}-${day}`);
    }, [year, month, day]);

    const Remove = async () => {
        await axios.post(`${process.env.REACT_APP_Server}/remove`, { rmv })
            .then((res) => {
                if (res.data) {
                    alert("Removed Successfully");
                    window.location.reload(3);
                } else {
                    alert("Try again");
                }
            })
            .catch((e) => console.log(e));
    };

    const AddTeamWork = async () => {
        await axios.post(`${process.env.REACT_APP_Server}/addteamwork/` + work + "/" + startdate + "/" + enddate + "/" + rmv.data)
            .then((res) => {
                if (res.data) {
                    setModalShow(false);
                }
                else {
                    console.log("work is not assign");
                }
            })
            .catch((e) => console.log(e))
    }

    const DropTeam = async () => {
        document.getElementById(rmv.data + rmv.index).style.display = "block";
        document.getElementById(rmv.data).style.display = "none";
        const x = setTimeout(async () => {
            await axios.post(`${process.env.REACT_APP_Server}/droptable/` + rmv.data)
                .then((res) => {
                    if (res.data) {
                        alert("Delete Team");
                        document.getElementById(rmv.data + rmv.index).style.display = "none";
                        document.getElementById(rmv.data).style.display = "block";
                        window.location.reload(3);
                    } else {
                        alert("Try again");
                    }
                })
                .catch((e) => console.log(e));
        }, 2000);
        sload(x);
    };

    const StopDropTeam = () => {
        if (load) {
            clearTimeout(load);
            document.getElementById(rmv.data + rmv.index).style.display = "none";
            document.getElementById(rmv.data).style.display = "block";
        }
    };

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_Server}/studentdata`)
            .then((res) => {
                sdata(res.data);
                sload1(false);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <>
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {rmv?.data}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Flex align="center" justify="center" direction="column" w="90%" maxW="500px" m="auto" p="20px" bg="rgba(255, 255, 255, 0.5)" backdropFilter="blur(10px)" border="1px solid rgba(255, 255, 255, 0.2)" borderRadius="10px" mt="10px" >
                        <Form.Label htmlFor="inputPassword5"><b>Enter the Team Work</b></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Assign work to the Team"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => setwork(e.target.value)}
                            />
                            <Form.Label htmlFor="inputPassword5"><b>End Date of Work</b></Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Assign work date to the Team"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => setenddate(e.target.value)}
                            />
                        <Flex style={{display:"flex",justifyContent:"space-evenly",width:"100%"}} mt="10px">
                            <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} mr="5px" onClick={AddTeamWork}>Submit</Button>
                            <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} ml="5px" onClick={()=>setModalShow(false)}>Cancel</Button>
                        </Flex>
                    </Flex>
                </Modal.Body>
            </Modal>
            <NavBar />
            <Box>
                <Table responsive className="table2">
                    <Thead>
                        <Tr>
                            <Th>Student Name</Th>
                            <Th>Register Number</Th>
                            <Th>Branch</Th>
                            <Th>Section</Th>
                            <Th>Phone Number</Th>
                            <Th colSpan={2}>Team</Th>
                        </Tr>
                    </Thead>
                    {load1 && <Thead>
                        <Tr>
                            <Th colSpan={5} bg="white" color="red" textAlign="center"><Heading as="h5">please wait.....</Heading></Th>
                        </Tr>
                    </Thead>}
                    <Tbody>
                        {
                            data?.sort((a, b) => (a.Teamname?.trim().slice(-1) || '').localeCompare((b.Teamname?.trim().slice(-1) || '')))?.map((item, index) =>
                            (
                                <>
                                    <Tr key={index}>
                                        <Th colSpan={7} bg="skyblue" color="blue">

                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <label><b>{item.Teamname.toUpperCase()}</b></label>
                                                <Button id={item.Teamname} style={{ margin: '0 -38% 0 40%', backgroundColor: '#FBA834' }} onClick={() => { srmv({ data: (item.Teamname), index }); setModalShow(true) }}>+</Button>
                                                <Button id={item.Teamname} style={{ margin: '0 -40% 0 40%', backgroundColor: 'orange' }} onClick={DropTeam} onClickCapture={() => { srmv({ data: (item.Teamname), index }) }}>X</Button>
                                                <Button id={item.Teamname + index} style={{ margin: '0 -40% 0 40%', backgroundColor: 'yellow', color: 'black', display: 'none' }} onClick={StopDropTeam} onClickCapture={() => { srmv({ data: (item.Teamname), index }) }}>UNDO</Button>
                                            </div>
                                        </Th>
                                    </Tr>
                                    <>
                                        {
                                            item?.Teammembers?.map((val, idx) =>
                                            (
                                                val.Name.trim().slice(-6) === "(LEAD)" && <Tr style={{ color: "orangered" }} key={idx}>
                                                    <Td>{val.Name}</Td>
                                                    <Td>{val.Registernumber}</Td>
                                                    <Td>{val.Branch}</Td>
                                                    <Td>{val.Section}</Td>
                                                    <Td>{val.Phonenumber}</Td>
                                                    <Td>{item.Teamname}</Td>
                                                    <Td>
                                                        <Button style={{ backgroundColor: "red" }} onClick={Remove} onClickCapture={() => srmv({ val, index, item })}>X</Button>
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                        {
                                            item?.Teammembers?.map((val, idx) =>
                                            (
                                                val.Name.trim().slice(-6) === "(LEAD)" || <Tr key={idx}>
                                                    <Td>{val.Name}</Td>
                                                    <Td>{val.Registernumber}</Td>
                                                    <Td>{val.Branch}</Td>
                                                    <Td>{val.Section}</Td>
                                                    <Td>{val.Phonenumber}</Td>
                                                    <Td>{item.Teamname}</Td>
                                                    <Td>
                                                        <Button style={{ backgroundColor: "red" }} onClick={Remove} onClickCapture={() => srmv({ val, index, item })}>X</Button>
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                    </>
                                </>
                            ))
                        }
                    </Tbody>
                </Table>
            </Box>
        </>
    );
};
