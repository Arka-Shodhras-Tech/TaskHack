import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
export const WorkReview = ({show,onHide,teamname,work}) => {
    // let 
    const [status, setStatus] = useState();
    const [credits, setCredits] = useState(0);
    const [load, sload] = useState();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const [startdate, setstartdate] = useState();
    useEffect(() => {
        setstartdate(`${year}-${month}-${day}`);
    }, [year, month, day]);
    const handleStop=()=>{
        // stop();
    }
    const PostWork = async () => {
        if ( status) {
            sload(true)
            await axios.post(`${process.env.REACT_APP_Server}/postwork/` + teamname + "/" + work + "/" + credits + "/" + status + "/" + startdate)
                .then((res) => {
                    if (res.data.message) {
                        alert("Updated work")
                        window.location.reload(5);
                    }
                    else {
                        alert(res.data.error)
                        sload(false)
                    }
                })
                .catch((e) => {console.log(e);sload(false)});
        }
        else {
            alert("Enter all fields")
        }
    }
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
                    <table>
                        <tr>
                            <Form.Check type="radio" id="pending">
                                <Form.Check.Input for="pending" name="same" type="radio" onChange={(e) => setStatus("Pending")} isValid />
                                <Form.Check.Label style={{ color: "yellowgreen" }}>Pending</Form.Check.Label>
                            </Form.Check>
                        </tr>
                        <tr>
                            <Form.Check type="radio" id="progress">
                                <Form.Check.Input for="progress" name="same" type="radio" onChange={(e) => setStatus("Progress")} isValid />
                                <Form.Check.Label style={{ color: "orange" }}>Progress</Form.Check.Label>
                            </Form.Check>
                        </tr>
                        <tr>
                            <Form.Check type="radio" id="complete">
                                <Form.Check.Input for="complete" name="same" type="radio" onChange={(e) => setStatus("Complete")} isValid />
                                <Form.Check.Label style={{ color: "green" }}>Complete</Form.Check.Label>
                            </Form.Check>
                        </tr>
                        <tr>
                            <Form.Check type="radio" id="reject">
                                <Form.Check.Input for="reject" name="same" type="radio" onChange={(e) => setStatus("Reject")} isValid />
                                <Form.Check.Label style={{ color: "red" }}>Reject</Form.Check.Label>
                            </Form.Check>
                        </tr>
                        <tr>
                            <Form.Check type="radio" id="none">
                                <Form.Check.Input for="none" name="same" type="radio" onChange={(e) => setStatus("")} isValid />
                                <Form.Check.Label style={{ color: "black" }}>None</Form.Check.Label>
                            </Form.Check>
                        </tr>
                    </table>
                    <Form.Label htmlFor="inputPassword5"><b>Enter No of Credits</b></Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter no of credits"
                        aria-describedby="passwordHelpBlock"
                        value={credits}
                        onChange={(e) => setCredits(credits === 0 ? "" : e.target.value)}
                    />
                    <Flex style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }} mt="10px">
                        <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} mr="5px" onClick={PostWork}>{load ? "Submitting.." : "Submit"}</Button>
                        <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} ml="5px" onClick={onHide}>Cancel</Button>
                    </Flex>
                </Flex>
            </Modal.Body>
        </Modal>
    )
}