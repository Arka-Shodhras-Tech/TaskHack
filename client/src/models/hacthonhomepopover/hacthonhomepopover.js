import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Box,
  Avatar,
  VStack,
  Text,
  useColorModeValue,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import ManImage from "./man.png";
import Image from "./user.png";
import WomanImage from "./woman.png";
import LogoutIcon from "@mui/icons-material/Logout";
export const PopOver = ({ data }) => {
  const dispatch = useDispatch();
  const popoverBg = useColorModeValue("white", "gray.700");

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          src={
            data?.Gender
              ? data.Gender === "male"
                ? data?.Photo
                : WomanImage
              : Image
          }
          name={data?.Name}
          size="md"
          cursor="pointer"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg={popoverBg} maxH="80vh" overflowY="auto" boxShadow='dark-lg'>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <Box display="flex">
              <Box alignContent="center">
                <Avatar
                  src={
                    data?.Gender
                      ? data.Gender === "male"
                        ? ManImage
                        : WomanImage
                      : Image
                  }
                  name={data?.Name}
                  size="lg"
                  cursor="pointer"
                />
              </Box>
              <Box p={2} width={"75%"}>


                <Tooltip hasArrow label={data?.Gmail} bg='gray.300' color='black'>
                  <Text
                    marginBottom="0"
                    fontSize={{ base: "15px" }}
                    noOfLines={1}
                  >
                    {data?.Gmail}
                  </Text>
                </Tooltip>
                <Tooltip hasArrow label={data?.Name} bg='gray.300' color='black'>

                  <Text
                    fontSize={{ base: "20px" }}
                    marginBottom="0"
                    noOfLines={1}
                  >
                    {data?.Name}
                  </Text>
                </Tooltip>

              </Box>
            </Box>
          </PopoverHeader>
          <PopoverBody>
            <VStack align="start" spacing={1}>
              <Box>
                <Text fontWeight="bold" marginBottom="0">
                  Register Number:
                </Text>
                <Text marginBottom="1">{data?.Reg_No}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" marginBottom="0">
                  Year:
                </Text>
                <Text marginBottom="2">
                  {" "}
                  <Badge>{data?.Year}/4 , B.Tech</Badge>
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" marginBottom="0">
                  Branch & Section:
                </Text>
                <Text marginBottom="1">
                  {data?.Branch} - {data?.Section}{" "}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" marginBottom="0">
                  Phone Number:
                </Text>
                <Text>{data?.Number}</Text>
              </Box>
              <Button
                colorScheme="red"
                width="100%"
                textAlign="left"
                onClick={() => {
                  dispatch({ type: "AUTH", payload: { auth: null } });
                  window.location.reload();
                }}
              >
                <LogoutIcon></LogoutIcon> Log Out
              </Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
