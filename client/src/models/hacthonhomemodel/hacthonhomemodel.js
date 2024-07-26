import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Select, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Actions } from "../../actions/actions";
export const HomeModel = ({ open, close, data }) => {
  const [gender, setGender] = useState();
  const toast = useToast();
  const Save = async () => {
    await Actions.updateGender(data?.Reg_No, gender)
      .then((res) => {
        if (res) {
          toast({
            title: "Gender Updated Successfully",
            position: "top-right",
          });
          close();
          window.location.reload(5);
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <Modal isOpen={open} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Gender</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Select
            placeholder="Select option"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={Save}>
            Save
          </Button>
          <Button onClick={close}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
