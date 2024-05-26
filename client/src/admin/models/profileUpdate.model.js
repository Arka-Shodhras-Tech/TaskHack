import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ProfileUpdate = ({ show, onHide, team }) => {
    const [reg, setReg] = useState('')
    const [year, setYear] = useState('')
    const [load, setLoad] = useState('')
    const PostUpdate = async () => {
        if (year !== '' && reg !== '') {
            setLoad(true)
            try {
                const response = await axios.post(`${process.env.REACT_APP_Server}/updateyear`, { team: team, reg: reg, year: year })
                if (response.status === 200) {
                    alert(response.data.message)
                    setReg('')
                    setYear('')
                    setLoad(false)
                    onHide()
                }
            } catch (error) {
                console.error(error)
                setLoad(false)
                setReg('')
                setYear('')
                alert('An error occurred while fetching data. Please try again later.');
            }

        }
        else {
            alert("Please fill all the fields")
        }
    }
    return (
        <Modal show={show} onHide={onHide} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {team.Teamname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Flex align="center" justify="center" direction="column" w="90%" maxW="500px" m="auto" p="20px" bg="rgba(255, 255, 255, 0.5)" backdropFilter="blur(10px)" border="1px solid rgba(255, 255, 255, 0.2)" borderRadius="10px" mt="10px" >
                    <Form.Label htmlFor="inputPassword5"><b>Register number:</b></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Register numbver"
                        aria-describedby="passwordHelpBlock"
                        value={reg}
                        onChange={(e) => setReg(e.target.value.toUpperCase())}
                    />
                    <b>OR</b>
                    <Form.Select
                        aria-describedby="yearHelpBlock"
                        value={year}
                        onChange={(e) => setReg(e.target.value)}
                    >
                        <option value="">Select Register number</option>
                        {
                            team?.Teammembers?.map((val)=>(
                                <option value={val.Registernumber}>{val.Registernumber}</option>
                            ))
                        }
                    </Form.Select><br />
                    <Form.Label htmlFor="currentYear"><b>Current Year of Studying</b></Form.Label>
                    <Form.Select
                        aria-describedby="yearHelpBlock"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="">Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </Form.Select><br />
                    <Flex style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }} mt="10px">
                        <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} ml="5px" onClick={onHide}>Cancel</Button>
                        <Button bg="rgba(0, 123, 255, 0.7)" border="none" borderRadius="5px" p="10px" color="white" flex={1} mr="5px" onClick={PostUpdate}>{load ? "Submitting.." : "Submit"}</Button>
                    </Flex>
                </Flex>
            </Modal.Body>
        </Modal>
    )
}

export default ProfileUpdate
