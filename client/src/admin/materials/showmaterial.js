import { SimpleGrid, Box, Text, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react"; // Assuming 'react' is imported
import axios from "axios";
import { FaShare, FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

export const Showmaterial = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_Server}/viewphotos`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle specific errors (e.g., network errors, status codes)
    }
  };

  const openPdf = async (pdfUrl) => {
    try {
      const checkViewResponse = await axios.get(
        `${process.env.REACT_APP_Server}/checkviews/${pdfUrl}`
      );
      const viewers = checkViewResponse.data.Views + 1;
      await axios.put(
        `${process.env.REACT_APP_Server}/views/${viewers}/${pdfUrl}`
      );
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };

  const sharePdf = async (pdfUrl, title) => {
    const shareData = {
      title: title,
      text: "Check out this PDF",
      url: pdfUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported. Please share manually.");
    }
  };

  const downloadPdf = async (pdfUrl, title) => {
    try {
      const response = await axios.get(pdfUrl, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.pdf`;
      link.click();

      URL.revokeObjectURL(url); // Revoke temporary URL after download
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "90%" }}>
      <SimpleGrid columns={[1, 1, 1, 1, 5]} maxChildWidth="250px" spacing="40px">
          {data.map((item) => (
            item?.Photo && (
              <Box
                key={item.id}
                height="250px"
                borderWidth="2px"
                borderColor="blue"
                borderRadius="md"
                position="relative"
                _hover={{
                  boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.3), 0px 8px 15px rgba(0, 0, 0, 0.2)",
                  borderColor: "blue",
                  backgroundColor: "skyblue"
                }}
                onClick={(event) => {
                  const isIconClicked = event.target.tagName.toLowerCase() === "svg";
                  if (!isIconClicked) {
                    openPdf(item.Pdf);
                  }
                }}
              >
                <img
                  src={item.Photo}
                  alt={item.Title}
                  style={{ width: "100%", height: "80%", objectFit: "cover" }}
                />
                <IconButton
                  icon={<FaShare />}
                  aria-label="Share"
                  position="absolute"
                  top="5px"
                  right="5px"
                  colorScheme="blue"
                  onClick={(event) => {
                    event.stopPropagation();
                    sharePdf(item.Pdf, item.Title);
                  }}
                />
                <IconButton
                  icon={<FaDownload />}
                  aria-label="Download"
                  position="absolute"
                  bottom="5px"
                  right="5px"
                  colorScheme="blue"
                  onClick={(event) => {
                    event.stopPropagation();
                    downloadPdf(item.Pdf, item.Title);
                  }}
                />
                <Text fontSize="md" fontWeight="bold" position="absolute" bottom="5px" left="5px">
                  {item.Title}
                </Text>
                <Text fontSize="sm" position="absolute" bottom="-15px" left="5px">
                  Views: {item.Views}
                </Text>
              </Box>
            )
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
};
