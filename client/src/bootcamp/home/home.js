import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeModel } from "../../models/hacthonhomemodel/hacthonhomemodel";
import { PopOver } from "../../models/hacthonhomepopover/hacthonhomepopover";
import "../main/main.css";
import aboutImage from "./about.png";
import feedbackFormimage from "./feedback.png";
import materialsimage from "./materials.png";
import mostlyUsedMaterialsimage from "./most-used-materials.png";
import performanceimage from "./performance.png";
import tasksimage from "./tasks.png";
import { Overlay } from "./overlay";

export const Home = ({ data }) => {
  const [openModel, setOpenModel] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const stickyScrollViewRef = useRef(null);

  // document.title =// "Home | Tasks | Performance | Feedback | Materials | BootCamp | Vedic Vision | AST TEAM";
  const nav = useNavigate();

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const openPage = (page) => {
    nav(page);
  };

  const handleScroll = () => {
    const overlay = overlayRef.current;
    const rect = overlay.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    Overlay("overlay-bar")
  })

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Box padding={{ base: "0", md: "2", lg: "4" }} color="black" width="100%">
        <Box
          className="background-static-container"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100vh"
          backgroundSize="cover"
          backgroundPosition="center"
          zIndex="1"
        >
          <Container maxW={{ base: "100%", md: "90%", lg: "90%", xl: "90%" }} className="profile-pic">
            {!data?.Gender && (
              <HomeModel
                open={openModel}
                close={() => setOpenModel(false)}
                data={data}
              />
            )}
            <Flex
              justifyContent="center"
              alignItems="center"
              padding="1rem"
              position="relative"
            >
              <Tooltip
                fontSize="sm"
                label={greeting + " , " + data?.Name}
                openDelay={500}
              >
                <Text
                  fontSize={{
                    base: "12px",
                    md: "20px",
                    lg: "25px",
                    xl: "20px",
                  }}
                  fontWeight="bold"
                  textAlign={{ base: "left", md: "center" }}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxW="70%"
                  color="black"
                >
                  {greeting}, {data?.Name}
                </Text>
              </Tooltip>

              <Box position="absolute" right={{ base: "0.3rem", md: "1rem" }}>
                <div className="profile">
                  <PopOver data={data} />
                </div>
              </Box>
            </Flex>
          </Container>

          <Box minH="80vh" alignItems="center">
            <div className="hacthongrid-home">
              <div className="hacthonlist">
                <div className="buttonsgrid">
                  <SimpleGrid minChildWidth="200px" spacing="40px">
                    <Button onClick={() => openPage("/bootcamp/tasks")}>
                      Tasks
                    </Button>
                    <Button onClick={() => openPage("/bootcamp/performance")}>
                      Performance
                    </Button>
                    <Button onClick={() => openPage("/bootcamp/materials")}>
                      Materials
                    </Button>
                  </SimpleGrid>
                </div>
              </div>
            </div>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="end"
              maxH="200px"
            >
              <Button
                onClick={() => window.scrollTo(0, window.innerHeight)}
                className="more-info-button"
                borderRadius={25}
              >
                <KeyboardDoubleArrowDownIcon onClick={() => { document.getElementById("overlay-bar").style.display = 'block' }} />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box style={{ display: 'none' }} id="overlay-bar" className="overlay-main-container" ref={overlayRef}>
          <Box
            className={`sticky-scroll-view ${showOverlay ? "visible" : ""}`}
            minH="90vh"
            boxShadow="md"
            borderRadius="lg"
            p="4"
            backgroundColor="gray.600"
            zIndex={4}
            position="relative"
            marginTop="80vh"
          >
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
              <KeyboardDoubleArrowDownIcon onClick={() => { document.getElementById("overlay-bar").style.display = 'none' }} />
            </div> */}
            <Heading color="white">More Interactions</Heading>

            <Box overflow="auto" padding="50px" width="auto" id="style-4">
              <Flex gap="15px" wrap="nowrap">
                <Box
                  onClick={() => openPage("/bootcamp/tasks")}
                  cursor="pointer"
                  maxW="sm"
                  height="200px"
                  borderWidth="1px"
                  minW="200px"
                  borderRadius="lg"
                  overflow="hidden"
                  flex="1 1 200px"
                  backgroundColor="white"
                >
                  <Image
                    src={tasksimage}
                    alt="Tasks image"
                    width="100%"
                    objectFit="cover"
                    height="100px"
                  />
                  <Box p={5}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="baseline"
                    >
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h6"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        Tasks
                      </Box>
                      <Box as="span" color="gray.600" fontSize="sm">
                        Go to Tasks
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => openPage("/bootcamp/performance")}
                  cursor="pointer"
                  minW="200px"
                  borderWidth="1px"
                  borderRadius="lg"
                  height="200px"
                  overflow="hidden"
                  flex="1 1 200px"
                  backgroundColor="white"
                >
                  <Image
                    src={performanceimage}
                    alt="Performance image"
                    width="100%"
                    objectFit="cover"
                    height="100px"
                  />
                  <Box p="6">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="baseline"
                    >
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h6"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        Performance
                      </Box>
                      <Box
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                        noOfLines={1}
                      >
                        Go to Performance
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => openPage("/bootcamp/materials")}
                  cursor="pointer"
                  maxW="sm"
                  height="200px"
                  minW="200px"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  flex="1 1 200px"
                  backgroundColor="white"
                >
                  <Image
                    src={materialsimage}
                    alt="Materials image"
                    width="100%"
                    objectFit="cover"
                    height="100px"
                  />
                  <Box p="5">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="baseline"
                    >
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h6"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        Materials
                      </Box>
                      <Box
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                        noOfLines={1}
                      >
                        Go to Materials
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => openPage("/bootcamp/most-used-materials")}
                  cursor="pointer"
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  height="200px"
                  minW="200px"
                  overflow="hidden"
                  flex="1 1 200px"
                  backgroundColor="white"
                >
                  <Image
                    src={mostlyUsedMaterialsimage}
                    alt="Mostly Used Materials image"
                    width="100%"
                    objectFit="cover"
                    height="100px"
                  />
                  <Box p="5">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="baseline"
                    >
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h6"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        Mostly Used Materials
                      </Box>
                      <Box
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                        noOfLines={1}
                      >
                        Go to Mostly Used Materials
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => openPage("/bootcamp/feedbackform")}
                  cursor="pointer"
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  height="200px"
                  minW="200px"
                  overflow="hidden"
                  flex="1 1 200px"
                  backgroundColor="white"
                >
                  <Image
                    src={feedbackFormimage}
                    alt="Feedback Form image"
                    width="100%"
                    objectFit="cover"
                    height="100px"
                  />
                  <Box p="5">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="baseline"
                    >
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h6"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        Feedback Form
                      </Box>
                      <Box
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                        noOfLines={1}
                      >
                        Go to Feedback Form
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => openPage("/bootcamp/about")}
                  cursor="pointer"
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  height="200px"
                  minW="200px"
                  overflow="hidden"
                  flex="1 1 200px"
                  backgroundColor="white"
                >
                  <Image
                    src={aboutImage}
                    alt="About image"
                    width="100%"
                    objectFit="cover"
                    height="100px"
                  />
                  <Box p="5">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="baseline"
                    >
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h6"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        About
                      </Box>
                      <Box
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                        noOfLines={1}
                      >
                        Learn More About Vedic Vision
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
