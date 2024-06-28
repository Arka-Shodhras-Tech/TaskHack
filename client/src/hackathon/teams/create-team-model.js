import { Box, Button, Input, Modal, ModalBody, Text, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Actions } from "../../actions/actions";

export const CreateTeam = ({ isOpen, onClose, data }) => {
    const toast = useToast();
    const [team, setTeam] = useState("");
    const [gmail, setGmail] = useState("");
    const [code, setCode] = useState("");
    const [phone, setPhone] = useState("");
    const [members, setMembers] = useState();
    const [password, setPassword] = useState()
    const CreateTeam = async () => {
        if (team && gmail && code && phone && members && password) {
            await Actions.CreateTeam(team, gmail, phone, code, members, password)
                .then((res) => {
                    if (res?.data?.message) {
                        toast({
                            title: res?.data?.message,
                            status: 'success',
                            position: 'top-right',
                            isClosable: true,
                        });
                        setTeam("");
                        setGmail("");
                        setPhone("");
                        setCode("");
                        setMembers('')
                        setPassword('')
                        onClose();
                    } else{
                        toast({
                            title: "required all fileds",
                            status: 'success',
                            position: 'bottom-right',
                            isClosable: true,
                        });
                    }
                }).catch((e) => {
                    toast({
                        title: e?.message,
                        status: 'error',
                        position: 'bottom-right',
                        isClosable: true,
                    })
                })
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Team Request</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box mb={5}>
                        <Input
                            placeholder="Team Name"
                            value={team}
                            onChange={(e) => setTeam(e.target.value.toUpperCase())}
                            mb={2}
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                            mb={2}
                        />
                        <Input
                            placeholder="Phone Number"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            mb={2}
                        />
                        <Select
                            placeholder="Select Team Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            mb={2}
                        >
                            {
                                data?.map((team) => (
                                    team?.Team || <option>{team?.TeamCode}</option>
                                ))
                            }
                        </Select>
                        <Input
                            placeholder="Team Members"
                            type="number"
                            value={members}
                            onChange={(e) => setMembers(e.target.value)}
                            mb={2}
                        />

                        <Input
                            placeholder="Enter password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            mb={2}
                        />
                        <Text color={"red"}>Remember no chance to forget <strong>password</strong></Text>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={CreateTeam}>
                        Create Team
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}