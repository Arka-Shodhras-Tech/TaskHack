import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Portal,
  Stack,
  Text,
  Badge
} from "@chakra-ui/react";
import { InfoOutlineIcon, CloseIcon } from "@chakra-ui/icons";

const TechTeamList = ({ techTeamData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <Box>
      <IconButton
        icon={<InfoOutlineIcon />}
        onClick={handleToggle}
        aria-label="Show Tech Team Details"
        position="fixed"
        bottom="20px"
        left="20px"
        zIndex="1000"
        colorScheme="blue"
      />

      {isOpen && (
        <Portal>
          <Box
            position="fixed"
            top="10%"
            left="10%"
            right="10%"
            bottom="10%"
            overflowY="auto"
            bg="white"
            borderWidth={1}
            borderRadius="md"
            boxShadow="lg"
            p={4}
            zIndex="1000"
            transition="linear"
          >
            <Stack spacing={4}>
              <Box textAlign="right">
                <IconButton
                  icon={<CloseIcon />}
                  onClick={handleToggle}
                  aria-label="Close Tech Team Details"
                  colorScheme="red"
                />
              </Box>
              <Text fontSize="xl" mb={4} fontWeight="bold">
                Tech Team Details
              </Text>
              <Box overflow="auto">
            
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Mobile</Th>
                    <Th>Name</Th>
                    <Th>Will Help You in </Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {techTeamData?.map((team) => (
                    <Tr key={team.id}>
                      <Td>{team.MemberID}</Td>
                      <Td>{team.Name}</Td>
                      <Td>{team.Subject}</Td>
                      <Td><Badge colorScheme={team.Status === "active"?"green":"red"}>{team.Status}</Badge></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
                  
              </Box>
            </Stack>
          </Box>
        </Portal>
      )}
    </Box>
  );
};

export default TechTeamList;
