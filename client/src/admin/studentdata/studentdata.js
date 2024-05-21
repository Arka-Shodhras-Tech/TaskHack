import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr, Link, Input, Flex, Box, Heading, IconButton } from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

export const Studentdata = () => {
    const [data, sdata] = useState([]);
    const [rmv, srmv] = useState();
    const [load, sload] = useState();
    const [load1, sload1] = useState(true);
    const [showInput, setShowInput] = useState(false);
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

    const onClose = () => {
        setShowInput(false);
    }

    const AddWork = () => {
        setShowInput(true);
    };

    const AddTeamWork = async () => {
        await axios.post(`${process.env.REACT_APP_Server}/addteamwork/` + work + "/" + startdate + "/" + enddate + "/" + rmv.data)
            .then((res) => {
                if (res.data) {
                    setShowInput(false);
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
            {/* <NavBar /> */}
            {showInput ? (
                <>
                    <Flex align="center" justify="center" direction="column" w="90%" maxW="500px" m="auto" p="20px" bg="rgba(255, 255, 255, 0.5)" backdropFilter="blur(10px)" border="1px solid rgba(255, 255, 255, 0.2)" borderRadius="10px" pos="relative">
                        <Heading as="h1" m="0">{rmv.data}</Heading>
                        <IconButton onClick={onClose} pos="absolute" top="10px" right="10px" bg="transparent" border="none" color="red" fontSize="1.5rem" icon={<CloseIcon />} />
                    </Flex>
                    <Flex align="center" justify="center" direction="column" w="90%" maxW="500px" m="auto" p="20px" bg="rgba(255, 255, 255, 0.5)" backdropFilter="blur(10px)" border="1px solid rgba(255, 255, 255, 0.2)" borderRadius="10px" mt="10px" >
                        <Box>
                            <label><b>Enter the Team Work</b></label>
                            <Input type="text" placeholder="Assign work to the Team" onChange={(e) => setwork(e.target.value)} mb="10px" bg="rgba(255, 255, 255, 0.2)" border="none" borderRadius="5px" p="5px" />
                            <label><b>End Date of Work</b></label>
                            <Input type="date" onChange={(e) => setenddate(e.target.value)} bg="rgba(255, 255, 255, 0.2)" border="none" borderRadius="5px" p="5px" />
                        </Box>
                        <Flex justify="space-between" mt="10px">
                            <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} mr="5px" onClick={AddTeamWork}>Submit</Button>
                            <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} ml="5px" onClick={onClose}>Cancel</Button>
                        </Flex>
                    </Flex>
                </>

            ) : (
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
                                data.sort((a, b) => (a.Teamname?.trim().slice(-1) || '').localeCompare((b.Teamname?.trim().slice(-1) || ''))).map((item, index) =>
                                (
                                    <>
                                        <Tr key={index}>
                                            <Th colSpan={7} bg="skyblue" color="blue">
 
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <label><b>{item.Teamname.toUpperCase()}</b></label>
                                                <Button id={item.Teamname} style={{ margin: '0 -38% 0 40%', backgroundColor: '#FBA834' }} onClick={AddWork} onClickCapture={() => { srmv({ data: (item.Teamname), index }) }}>+</Button>
                                                <Button id={item.Teamname} style={{ margin: '0 -40% 0 40%', backgroundColor: 'orange' }} onClick={DropTeam} onClickCapture={() => { srmv({ data: (item.Teamname), index }) }}>X</Button>
                                                <Button id={item.Teamname + index} style={{ margin: '0 -40% 0 40%', backgroundColor: 'yellow', color: 'black', display: 'none' }} onClick={StopDropTeam} onClickCapture={() => { srmv({ data: (item.Teamname), index }) }}>UNDO</Button>
                                            </div>
                                            </Th>
                                        </Tr>
                                        <>
                                            {
                                                item.Teammembers.map((val, idx) =>
                                                (
                                                    val.Name.trim().slice(-6) === "(LEAD)" && <Tr style={{ color: "orangered" }} key={idx}>
                                                        <Td>{val.Name}</Td>
                                                        <Td>{val.Registernumber}</Td>
                                                        <Td>{val.Branch}</Td>
                                                        <Td>{val.Section}</Td>
                                                        <Td>{val.Phonenumber}</Td>
                                                        <Td>{item.Teamname}</Td>
                                                        <Td>
                                                            <Button bg="red" onClick={Remove} onClickCapture={() => srmv({ val, index, item })}>X</Button>
                                                        </Td>
                                                    </Tr>
                                                ))
                                            }
                                            {
                                                item.Teammembers.map((val, idx) =>
                                                (
                                                    val.Name.trim().slice(-6) === "(LEAD)" || <Tr key={idx}>
                                                        <Td>{val.Name}</Td>
                                                        <Td>{val.Registernumber}</Td>
                                                        <Td>{val.Branch}</Td>
                                                        <Td>{val.Section}</Td>
                                                        <Td>{val.Phonenumber}</Td>
                                                        <Td>{item.Teamname}</Td>
                                                        <Td>
                                                            <Button bg="red" onClick={Remove} onClickCapture={() => srmv({ val, index, item })}>X</Button>
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
            )}
        </>
    );
};
