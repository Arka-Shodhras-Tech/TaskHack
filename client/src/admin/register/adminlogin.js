import { useState } from 'react';
import CryptoAES from "crypto-js/aes";
import { id, lock } from "../../api";
import { NavBar } from '../../navbar/navbar';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import "./register.css";

export const AdminLogin = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [load, setLoad] = useState(false);
  const toast = useToast();

  const Login = async () => {
    if (id === `${name}`) {
      if (lock === `${mail}`) {
        sessionStorage.lock = CryptoAES.encrypt(lock, id).toString();
        console.log(sessionStorage.lock);
        setLoad(true);
        window.location.reload(2);
      } else {
        toast({
          title: "Password incorrect",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Id incorrect",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <NavBar />
      <Container  centerContent>
        <Box p={5} borderWidth="1px" borderRadius="lg" bg="gray.50">
          <VStack spacing={4}>
            <FormControl id="id">
              <FormLabel>Enter Id</FormLabel>
              <Input
                type="text"
                placeholder="Enter Id"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Enter Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setMail(e.target.value)}
              />
            </FormControl>
            <Flex w="100%" justify="space-between">
              <Button
                w="100%"
                colorScheme="blue"
                onClick={Login}
                isLoading={load}
              >
                {load ? "Please Wait" : "Login"}
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </>
  );
};
