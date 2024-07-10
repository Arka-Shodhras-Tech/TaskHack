import {
  Box,
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  Text,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { Actions } from "../../actions/actions";

export const CreateTeam = ({ isOpen, onClose, data }) => {
  const toast = useToast();
  const [team, setTeam] = useState("");
  const [gmail, setGmail] = useState("");
  const [code, setCode] = useState("11236");
  const [phone, setPhone] = useState("");
  const [members, setMembers] = useState("");
  const [memberDetails, setMemberDetails] = useState([]);
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleMemberDetailsChange = (index, value) => {
    const newMemberDetails = [...memberDetails];
    newMemberDetails[index] = value;
    setMemberDetails(newMemberDetails);
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast({
        title: "Terms and Conditions",
        description: "You must accept the terms and conditions to create a team.",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
      return;
    }

    if (team && gmail && code && phone && members && memberDetails.length === parseInt(members) && password) {
      if (new Set(memberDetails).size !== memberDetails.length) {
        toast({
          title: "Duplicate team details found",
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
        return;
      }
      if (!memberDetails.every((detail) => detail.length === 10)) {
        toast({
          title: "Each team detail must be exactly 10 characters long",
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
        return;
      }
      const memberDetailsString = memberDetails.join(",");

      try {
        const res = await Actions.CreateTeam(team, gmail, phone, code, memberDetailsString, password);
        if (res?.data?.message === "Success") {
          toast({
            title: "Team created successfully!",
            status: "success",
            position: "top-right",
            isClosable: true,
          });
          setTeam("");
          setGmail("");
          setPhone("");
          setCode("");
          setMembers("");
          setMemberDetails([]);
          setPassword("");
          onClose();
        } else if (res?.data?.error) {
          toast({
            title: res.data.error,
            description: res.data.matchingNumbers?.length ? `Matching Numbers: ${res.data.matchingNumbers.join(", ")}` : "",
            status: "error",
            position: "bottom-right",
            isClosable: true,
            duration: 10000,
          });
        } else {
          toast({
            title: "Failed to create team",
            status: "error",
            position: "bottom-right",
            isClosable: true,
          });
        }
      } catch (e) {
        toast({
          title: "Error creating team",
          description: e.message,
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "All fields are required",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
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
              placeholder="Team Leader Email"
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              mb={2}
            />
            <Input
              placeholder="Team Leader Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[ ,.]/g, ""))}
              mb={2}
              maxLength={10}
            />
            <Select
              placeholder="Select Team Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              mb={2}
            >
              {data?.map((team, index) => (
                <option key={index} value={team?.TeamCode}>
                  {team?.TeamCode}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Select Number of Members"
              value={members}
              onChange={(e) => {
                setMembers(e.target.value);
                setMemberDetails(Array(parseInt(e.target.value)).fill(""));
              }}
              mb={2}
            >
              {[4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  Team of {num}
                </option>
              ))}
            </Select>
            {Array.from({ length: parseInt(members || 0) }).map((_, index) => (
              <Input
                key={index}
                placeholder={`Team ${index + 1 === 1 ? "Leader" : "Member " + (index + 1)} Registration Number`}
                type="text"
                maxLength={10}
                value={memberDetails[index] || ""}
                onChange={(e) => handleMemberDetailsChange(index, e.target.value.toLowerCase())}
                mb={2}
              />
            ))}
            <Input
              placeholder="Create password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={2}
            />
            <Text color={"red"}>
              Remember your <strong>password</strong>, no chance to reset <strong>it</strong>
            </Text>
            <Tooltip
              label="By creating a team, you agree that the team details are genuine. Once created, the team cannot be modified or deleted."
              aria-label="Terms and Conditions"
              hasArrow
              placement="top-end"
              isDisabled={termsAccepted}
            >
              <Checkbox
                isChecked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                mb={2}
                colorScheme="green"
              >
                I accept the terms and conditions
              </Checkbox>
            </Tooltip>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Create Team
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
