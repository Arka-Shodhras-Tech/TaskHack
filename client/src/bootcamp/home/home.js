import {
  Box,
  Flex,
  Text,
  Container,
  Image,
  Tooltip,
  SimpleGrid,
  Button,
  Heading,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import "../main/main.css";
import { HomeModel } from "../../models/hacthonhomemodel/hacthonhomemodel";
import { PopOver } from "../../models/hacthonhomepopover/hacthonhomepopover";
import tasksimage from "./tasks.png";
import performanceimage from "./performance.png";
import materialsimage from "./materials.png";
import mostlyUsedMaterialsimage from "./most-used-materials.png";
import feedbackFormimage from "./feedback.png";
import aboutImage from "./about.png"; // Add appropriate image path
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { light } from "@mui/material/styles/createPalette";

export const Home = ({ data }) => {
  const [openModel, setOpenModel] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null); // Ref for the overlay section
  const stickyScrollViewRef = useRef(null); // Ref for the sticky-scroll-view section

  document.title =
    "Home | Tasks | Performance | Feedback | Materials | BootCamp | Vedic Vision | AST TEAM";
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
          <Container
            maxW={{ base: "100%", md: "90%", lg: "90%", xl: "90%" }}
            marginTop={{ base: "10vh" }}
          >
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
                  <SimpleGrid minChildWidth="220px" spacing="40px">
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
              minH="300px"
            >
              <Button
                onClick={() => window.scrollTo(0, window.innerHeight)}
                className="more-info-button"
                borderRadius={25}
              >
                <KeyboardDoubleArrowDownIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="overlay-main-container" ref={overlayRef}>
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
            <Heading color="white">More Interactions</Heading>

            <Box overflow="auto" padding="50px" width="auto" id="style-4">
              <Flex gap="15px" wrap="nowrap">
                <Box
                  onClick={() => openPage("/tasks")}
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
                  onClick={() => openPage("/performance")}
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
                  onClick={() => openPage("/materials")}
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
                  onClick={() => openPage("/most-used-materials")}
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
                  onClick={() => openPage("/feedback-form")}
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
