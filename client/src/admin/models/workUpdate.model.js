import { Flex, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
export const WorkUpdate = ({ show, onHide, teamname, work, endtime }) => {
    const [status, setStatus] = useState();
    const [load, sload] = useState(false);
    const [load1, sload1] = useState(false);
    const [startdate, setstartdate] = useState();
    const PostWork = async () => {
        if (startdate && status) {
            sload(true)
            await axios.post(`${process.env.REACT_APP_Server}/updatework/` + teamname + "/" + work + "/" + status + "/" + startdate)
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message + " work")
                        window.location.reload(5);
                    }
                    else {
                        alert(res.data.error)
                        sload(false)
                    }
                })
                .catch((e) => { console.log(e); sload(false) });
        }
        else {
            alert("Enter all fields")
        }
    }

    const DeleteWork = async () => {
        if ((startdate && status)) {
            sload1(true)
            await axios.post(`${process.env.REACT_APP_Server}/deletework/` + teamname + "/" + work)
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message + " work")
                        window.location.reload(5);
                    }
                    else {
                        alert(res.data.error)
                        sload1(false)
                    }
                })
                .catch((e) => { console.log(e); sload1(false) });
        }
        else {
            alert("Enter all fields")
        }
    }
    useEffect(() => {
        setStatus(work)
        setstartdate(endtime)
    }, [show])
    return (
        <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {teamname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Flex align="center" justify="center" direction="column" w="90%" maxW="500px" m="auto" p="20px" bg="rgba(255, 255, 255, 0.5)" backdropFilter="blur(10px)" border="1px solid rgba(255, 255, 255, 0.2)" borderRadius="10px" mt="10px" >
                    <Form.Label htmlFor="inputPassword5"><b>Work Progress</b></Form.Label>
                    <Textarea type="text" placeholder="Enter task" value={status}
                        onChange={(e) => setStatus(e.target.value)} />
                    <Form.Label htmlFor="inputPassword5"><b>End Date of Work</b></Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Assign work date to the Team"
                        aria-describedby="passwordHelpBlock"
                        value={startdate}
                        onChange={(e) => setstartdate(e.target.value)}
                    />
                    <Flex style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }} mt="10px">
                        <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} mr="5px" onClick={PostWork}>{load ? "Submitting.." : "Submit"}</Button>
                        <Button variant="danger" border="none" borderRadius="5px" p="10px" color="white" flex={1} ml="5px" onClick={DeleteWork} >{load1 ? "Please wait" : "Delete"}</Button>
                        <Button variant="warning" border="none" borderRadius="5px" p="10px" color="white" flex={1} ml="5px" onClick={onHide}>Cancel</Button>
                    </Flex>
                </Flex>
            </Modal.Body>
        </Modal>
    )
}