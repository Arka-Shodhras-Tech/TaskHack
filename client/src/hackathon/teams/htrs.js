import React, { useState, useEffect } from "react";
import { Actions } from "../../actions/actions";
import {
  Box,
  Flex,
  Heading,
  Text,
  useToast,
  Spinner,
  Badge,
  Grid,
  GridItem,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const HtrsContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await Actions.AllTeamRegistrers();
       
        if (res?.data) {
          setContacts(res.data);
        } else {
          toast({
            title: "Failed to fetch contacts",
            status: "error",
            position: "top-right",
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast({
          title: "Error fetching contacts",
          description: error.message,
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [toast]);

  if (loading) {
    return (
      <Flex align="center" justify="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={4}>
       <Button onClick={()=> window.history.back()}>
        <ArrowBackIcon/>
        </Button> HTR Contact List
        <Tooltip label="HTR (Hackathon Team Registrers) are people who have access to register your teams during the respective schedule times">
              <Text mt={2} fontSize="sm" color="gray.500" cursor="help" border={3}>
                <i className="fa fa-info-circle" aria-hidden="true"></i> Learn More
              </Text>
            </Tooltip>
      </Heading>
      <Text p={5} boxShadow={"base"}>
      HTR (Hackathon Team Registrers) are people who have access to register your teams during the respective schedule times
      </Text>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
      >
        {contacts.map((contact, index) => (
          <GridItem key={index} bg="white" p={4} borderRadius={8} boxShadow="lg">
            <Text fontSize="xl" fontWeight="bold">{contact.Name}</Text>
            <Text fontSize="md">Mobile: {contact.HtrCode}</Text>
            <Text fontSize="md">
              Status: <Badge colorScheme={contact.Status === "active" ? "green" : "red"}>{contact.Status}</Badge>
            </Text>
         
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
