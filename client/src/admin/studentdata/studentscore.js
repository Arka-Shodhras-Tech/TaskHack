import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavBar } from "../../navbar/navbar";
import ProfileUpdate from "../models/profileUpdate.model";
import {
  Box,
  Button,
  Center,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
  useToast,
  Badge,
} from "@chakra-ui/react";

export const Studentscore = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [teamName, setTeamName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_Server}/studentdata`)
      .then((res) => {
        setData(res.data);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setLoad(false);
        toast({
          title: "Error fetching data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  return (
    <>
      <ProfileUpdate isOpen={isOpen} onClose={onClose} team={teamName} />
      <NavBar />
      <Box p={5}>
        {load ? (
          <Center>
            <Spinner size="xl" />
            <Text ml={3}>Please wait...</Text>
          </Center>
        ) : (
          data
            .sort((a, b) =>
              a.Teamname.trim()
                .slice(-1)
                .localeCompare(b.Teamname.trim().slice(-1))
            )
            .map((item) => (
              <Box
                key={item.Teamname}
                mb={5}
                boxShadow="lg"
                p="5"
                rounded="md"
                bg="white"
              >
                <TableContainer>
                  <Table variant="simple" colorScheme="gray">
                    <TableCaption placement="top">
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Badge size={5} colorScheme="purple" p={1}>
                          {item.Teamname.toUpperCase()}
                        </Badge>
                        <Box>
                          <Button
                            variant="link"
                            colorScheme="purple"
                            href="teamwork"
                            mr={3}
                          >
                            My Work
                          </Button>
                          <Button
                            variant="link"
                            colorScheme="purple"
                            onClick={() => {
                              onOpen();
                              setTeamName(item);
                            }}
                          >
                            Update Profile
                          </Button>
                        </Box>
                      </Box>
                    </TableCaption>
                    <Thead>
                      <Tr bg={"gray.300"} color={"white"}>
                        <Th>Student Name</Th>
                        <Th>Register Number</Th>
                        <Th>Branch</Th>
                        <Th>Year</Th>
                        <Th>Section</Th>
                        <Th>Marks</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {item.Teammembers.sort((a, b) =>
                        a.Name.trim().slice(-6) === "(LEAD)" ? -1 : 1
                      ).map((val) => (
                        <Tr key={val.Registernumber} bg={"white"}>
                          <Td>{val.Name}</Td>
                          <Td>{val.Registernumber}</Td>
                          <Td>{val.Branch}</Td>
                          <Td>{val?.year}</Td>
                          <Td>{val.Section}</Td>
                          <Td>{val.Marks}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            ))
        )}
      </Box>
    </>
  );
};
