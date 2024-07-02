import React from "react";
import { useNavigate } from "react-router-dom";
import "./bootcampnav.css";
import { Button } from "@chakra-ui/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const BootcampNav = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        const prevURL = document.referrer;
        const currentDomain = window.location.hostname;
 console.log(currentDomain)
        // Check if the previous URL is within the same domain
        if (prevURL && new URL(prevURL).hostname === currentDomain) {
            navigate(-1);
        } else {
            navigate("/bootcamp/home"); // or some other safe fallback route within the app
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {window.history.length > 2 && (
                <Button onClick={handleBackClick} variant="link" mr={2} className="navigate-back-button" size="xl">
                    <ArrowBackIcon />
                </Button>
            )}
            <h1 className="h1-animation">VEDIC VISION BOOTCAMP</h1>
        </div>
    );
};
