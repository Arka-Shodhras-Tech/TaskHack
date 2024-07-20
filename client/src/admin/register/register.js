import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavBar } from '../../navbar/navbar';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  HStack,
} from '@chakra-ui/react';
import "./register.css";

export const Register = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [number, setNumber] = useState('');
  const [regd, setRegd] = useState('');
  const [sec, setSec] = useState('');
  const [branch, setBranch] = useState('');
  const [data, setData] = useState([]);
  const [teamname, setTeamname] = useState('');
  const [load, setLoad] = useState(false);
  const toast = useToast();

  const Registers = async () => {
    if (name && mail && number && regd && branch && sec && teamname) {
      setLoad(true);
      await axios.post(`${process.env.REACT_APP_Server}/verifyregister/` + regd)
        .then(async (res) => {
          if (res.data) {
            toast({
              title: "Already registered",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
            setLoad(false);
            window.location.reload(5);
          } else {
            await axios.post(`${process.env.REACT_APP_Server}/studentregister/` + name + "/" + mail + "/" + number + "/" + regd + "/" + branch + "/" + sec + "/" + teamname)
              .then((res) => {
                if (res.data) {
                  toast({
                    title: "Registered Successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  window.location.reload(5);
                } else {
                  toast({
                    title: "Try again",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              });
          }
        });
    } else {
      toast({
        title: "Fill all details",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_Server}/studentdata`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <NavBar />
      <Container  centerContent>
        <Box p={5} borderWidth="1px" borderRadius="lg" bg="gray.50" width={{base:"90%",md:"90%"}}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setMail(e.target.value)}
              />
            </FormControl>
            <FormControl id="name">
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="text"
                placeholder="Enter your phone number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </FormControl>
            <FormControl id="regd">
              <FormLabel>Registration Number</FormLabel>
              <Input
                type="text"
                placeholder="Enter your registration number"
                onChange={(e) => setRegd(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormControl id="branch">
              <FormLabel>Branch</FormLabel>
              <Input
                type="text"
                placeholder="Branch"
                onChange={(e) => setBranch(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormControl id="section">
              <FormLabel>Section</FormLabel>
              <Select
                placeholder="Select your section..."
                onChange={(e) => setSec(e.target.value)}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </Select>
            </FormControl>
            <FormControl id="teamname">
              <FormLabel>Team Name</FormLabel>
              <Input
                type="text"
                placeholder="Team Name"
                onChange={(e) => setTeamname(e.target.value.toUpperCase())}
              />
            </FormControl>
            <HStack>
              <Box>OR</Box>
            </HStack>
            <FormControl id="team">
              <FormLabel>Team Name</FormLabel>
              <Select
                placeholder="Select Your Team"
                onChange={(e) => setTeamname(e.target.value.toUpperCase())}
              >
                {data.map((val) => (
                  <option key={val.Teamname} value={val.Teamname}>{val.Teamname}</option>
                ))}
              </Select>
            </FormControl>
            <Button
              w="100%"
              colorScheme="blue"
              onClick={Registers}
              isLoading={load}
            >
              {load ? "Please Wait" : "Register"}
            </Button>
          </VStack>
        </Box>
      </Container>
    </>
  );
};
