import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
  HStack,
  Icon,
  Tooltip,
  Select,
  Center,
} from "@chakra-ui/react";
import { StarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { Actions } from "../../actions/actions";

export const FeedbackForm = () => {
  const [isInteractive, setIsInteractive] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [type, setType] = useState("tech");
  const [submitted, setSubmitted] = useState(false);
  const auth = useSelector((state) => state.user?.auth);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString().split("T")[0]; 
    try {
      const response = await Actions.AddFeedBack({
        user: auth,
        isInteractive,
        rating,
        feedbackmessage: feedback,
        date,
        type,
      });
      if (response?.data?.error) {
        toast({
          title: "Something Went Wrong!",
          description: response?.data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setSubmitted(true);
        toast({
          title: "Feedback submitted.",
          description: "Thank you for your feedback!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "An error occurred while submitting your feedback.";
      toast({
        title: "Feedback not submitted.",
        description: errorMsg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleNewFeedback = () => {
    setSubmitted(false);
    setIsInteractive("");
    setRating(5);
    setFeedback("");
    setType("tech");
  };

  const ratingNames = ["Bad", "Okay", "Good", "Very Good", "Excellent"];
  const interactivites = {"tech":"bootcamp", 'site':"Website"}

  return (
    <Box
      className="feedback-form"
      maxW="md"
      mx="auto"
      p={6}
      boxShadow="md"
      borderRadius="md"
    >
      {submitted ? (
        <Center flexDirection="column">
          <CheckCircleIcon boxSize="200px" color="green.500" mb={6} />
          <Heading as="h3" size="lg" mb={6}>
            Feedback Submitted!
          </Heading>
          <Button colorScheme="blue" onClick={handleNewFeedback}>
            Submit Another Feedback
          </Button>
        </Center>
      ) : (
        <>
          <Heading as="h2" size="lg" mb={6}>
            Write to Us...
          </Heading>
          <form onSubmit={handleSubmit}>
          <FormControl id="type" mb={4}>
              <FormLabel>For (Tech stack / Site)</FormLabel>
              <Select
                placeholder="Select type"
                onChange={(e) => setType(e.target.value)}
                value={type}
                required
              >
                <option value="tech">Tech Stack</option>
                <option value="site">Site</option>
              </Select>
            </FormControl>
            <FormControl id="isInteractive" mb={4}>
              <FormLabel>Is {interactivites[type] || "this"} interactive?</FormLabel>
              <RadioGroup onChange={setIsInteractive} value={isInteractive}>
                <Stack direction="row">
                  <Radio value="Yes" required>
                    Yes
                  </Radio>
                  <Radio value="No" required>
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
        
            <FormControl id="rating" mb={4}>
              <FormLabel>Rating</FormLabel>
              <HStack spacing={{base:8, md:12}}>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <Box
                      key={i}
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(null)}
                      cursor="pointer"
                    >
                      <Tooltip label={`${ratingNames[i]}`}>
                        <Icon
                          as={StarIcon}
                          color={
                            i < (hoverRating || rating)
                              ? "yellow.400"
                              : "gray.300"
                          }
                          boxSize={10}
                        />
                      </Tooltip>
                    </Box>
                  ))}
              </HStack>
            </FormControl>
            <FormControl id="feedback" mb={4}>
              <FormLabel>Feedback</FormLabel>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={6}
                placeholder="Your Feedback"
              />
            </FormControl>
            <Button colorScheme="blue" type="submit" className="submit" mt={4}>
              Submit
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};
