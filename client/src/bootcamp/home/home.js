import {
    Box,
    Flex,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading,
    Container,
    Image,
    Tooltip,
  } from "@chakra-ui/react";
  import React, { useState, useEffect, useRef } from "react";
  import "../main/main.css";
  import { Materials } from "../materials/materials";
  import Performance from "../performance/performance";
  import { HomeModel } from "../../models/hacthonhomemodel/hacthonhomemodel";
  import { PopOver } from "../../models/hacthonhomepopover/hacthonhomepopover";
  import { Tasks } from "../tasks/tasks";
  import tasksimage from "./tasks.png";
  import performanceimage from "./performance.png";
  import materialsimage from "./materials.png";
  import mostlyUsedMaterialsimage from "./most-used-materials.png";
  import feedbackFormimage from "./feedback.png";
  import aboutImage from "./about.png"; // Add appropriate image path
import { useNavigate } from "react-router-dom";

  
  export const Home = ({ data, perfom, student }) => {
    const [openModel, setOpenModel] = useState(true);
    const [greeting, setGreeting] = useState("");
  
    const tasksRef = useRef(null);
    const performanceRef = useRef(null);
    const materialsRef = useRef(null);
    const mostlyUsedMaterialsRef = useRef(null);
    const feedbackFormRef = useRef(null);
    document.title = "Home | Tasks | Performance | Feedback| Materials | BootCamp | Vedic Vision | AST TEAM"
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
  
    const scrollToSection = (ref) => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    };
  
    return (
      <>
        <Container maxW={{ base: "100%", md: "90%", lg: "90%", xl: "90%" }}>
          <Box padding={{ base: "0", md: "2", lg: "4" }} color="black" width="100%">
            {!data?.Gender && (
              <HomeModel open={openModel} close={() => setOpenModel(false)} data={data} />
            )}
            <Flex justifyContent="center" alignItems="center" padding="1rem" position="relative">

            <Tooltip  fontSize='sm' label={greeting + " , "+data?.Name}  openDelay={500}>

              <Text
                fontSize={{ base: "12px", md: "20px", lg: "25px", xl: "20px" }}
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
            <Box overflow="auto" margin="30px" width="auto"  id="style-4">
              <Flex gap="15px" wrap="nowrap">
                <Box
                  onClick={() => scrollToSection(tasksRef)}
                  cursor="pointer"
                  maxW="sm"
                  height="200px"
                  borderWidth="1px"
                  minW="200px"

                  borderRadius="lg"
                  overflow="hidden"
                  flex="1 1 200px"
                >
                  <Image src={tasksimage} alt="Tasks image" width="100%" objectFit="cover" height="100px" />
                  <Box p={5}>
                    <Box display="flex" flexDirection="column" alignItems="baseline">
                      <Box mt="1" fontWeight="semibold" as="h6" lineHeight="tight" noOfLines={1}>
                        Tasks
                      </Box>
                      <Box as="span" color="gray.600" fontSize="sm">
                        Go to Tasks
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => scrollToSection(performanceRef)}
                  cursor="pointer"
                  minW="200px"
                  borderWidth="1px"
                  borderRadius="lg"
                  height="200px"
                  overflow="hidden"
                  flex="1 1 200px"
                >
                  <Image src={performanceimage} alt="Performance image" width="100%" objectFit="cover" height="100px" />
                  <Box p="6">
                    <Box display="flex" flexDirection="column" alignItems="baseline">
                      <Box mt="1" fontWeight="semibold" as="h6" lineHeight="tight" noOfLines={1}>
                        Performance
                      </Box>
                      <Box as="span" color="gray.600" fontSize="sm" noOfLines={1}>
                        Go to Performance
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => scrollToSection(materialsRef)}
                  cursor="pointer"
                  maxW="sm"
                  height="200px"
                  minW="200px"

                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  flex="1 1 200px"
                >
                  <Image src={materialsimage} alt="Materials image" width="100%" objectFit="cover" height="100px" />
                  <Box p="5">
                    <Box display="flex" flexDirection="column" alignItems="baseline">
                      <Box mt="1" fontWeight="semibold" as="h6" lineHeight="tight" noOfLines={1}>
                        Materials
                      </Box>
                      <Box as="span" color="gray.600" fontSize="sm" noOfLines={1}>
                        Go to Materials
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => scrollToSection(mostlyUsedMaterialsRef)}
                  cursor="pointer"
                  borderWidth="1px"
                  height="200px"
                  borderRadius="lg"
                  minW="200px"
                  overflow="hidden"
                  flex="1 1 200px"
                >
                  <Image src={mostlyUsedMaterialsimage} alt="Mostly Used Materials image" width="100%" objectFit="cover" height="100px" />
                  <Box p="5">
                    <Box display="flex" flexDirection="column" alignItems="baseline">
                      <Box mt="1" fontWeight="semibold" as="h6" lineHeight="tight" noOfLines={1}>
                        Mostly Used Materials
                      </Box>
                      <Box as="span" color="gray.600" fontSize="sm" noOfLines={1}>
                        Go to Mostly Used Materials
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => scrollToSection(feedbackFormRef)}
                  cursor="pointer"
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  height="200px"
                  minW="200px"

                  overflow="hidden"
                  flex="1 1 200px"
                >
                  <Image src={feedbackFormimage} alt="Feedback Form image" width="100%" objectFit="cover" height="100px" />
                  <Box p="5">
                    <Box display="flex" flexDirection="column" alignItems="baseline">
                      <Box mt="1" fontWeight="semibold" as="h6" lineHeight="tight" noOfLines={1}>
                        Feedback Form
                      </Box>
                      <Box as="span" color="gray.600" fontSize="sm" noOfLines={1}>
                        Go to Feedback Form
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  onClick={() => nav("/bootcamp/about")}
                  cursor="pointer"
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  height="200px"
                  minW="200px"

                  overflow="hidden"
                  flex="1 1 200px"
                >
                  <Image src={aboutImage} alt="About image" width="100%" objectFit="cover" height="100px" />
                  <Box p="5">
                    <Box display="flex" flexDirection="column" alignItems="baseline">
                      <Box mt="1" fontWeight="semibold" as="h6" lineHeight="tight" noOfLines={1}>
                        About
                      </Box>
                      <Box as="span" color="gray.600" fontSize="sm" noOfLines={1}>
                        Learn More About Vedic Vision
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>
            <Accordion defaultIndex={[0, 1, 2, 3, 4]} allowMultiple>
              <AccordionItem ref={tasksRef}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading
                      fontSize={{
                        base: "15px",
                        md: "20px",
                        lg: "25px",
                        xl: "20px",
                      }}
                    >
                      Tasks
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box boxShadow="md" padding="0" rounded="md">
                    <Tasks />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
  
              <AccordionItem ref={performanceRef} maxH="200vh">
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading
                      fontSize={{
                        base: "15px",
                        md: "20px",
                        lg: "25px",
                        xl: "20px",
                      }}
                    >
                      Performance
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box boxShadow="md" padding="0" rounded="md">
                    <Performance perfom={perfom} student={student} />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
  
              <AccordionItem ref={materialsRef}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading
                      fontSize={{
                        base: "15px",
                        md: "20px",
                        lg: "25px",
                        xl: "20px",
                      }}
                    >
                      Materials
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box boxShadow="md" padding="0" rounded="md">
                    <Materials />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
  
              <AccordionItem ref={mostlyUsedMaterialsRef}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading
                      fontSize={{
                        base: "15px",
                        md: "20px",
                        lg: "25px",
                        xl: "20px",
                      }}
                    >
                      Mostly Used Materials
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box boxShadow="md" padding="0" rounded="md">
                    {/* <MostlyUsedMaterials /> */}
                  </Box>
                </AccordionPanel>
              </AccordionItem>
  
              <AccordionItem ref={feedbackFormRef}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading
                      fontSize={{
                        base: "15px",
                        md: "20px",
                        lg: "25px",
                        xl: "20px",
                      }}
                    >
                      Feedback Form
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box boxShadow="md" padding="6" rounded="md">
                    {/* <FeedbackForm /> */}
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Container>
      </>
    );
  };
  