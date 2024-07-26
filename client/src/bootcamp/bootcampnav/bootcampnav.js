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

        if (prevURL && new URL(prevURL).hostname === currentDomain) {
            navigate(-1);
        } else {
            navigate("/bootcamp/home");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center',height:'25vh', alignItems: 'center' }}>
            {window.history.length > 2 && (
                <Button onClick={handleBackClick} variant="link" mr={2} className="navigate-back-button" size="xl">
                    <ArrowBackIcon />
                </Button>
            )}

            <div className="head-nav h1-animation">
            <p className="college-name">
                <img src={"../srkr-name-banner.png"} alt="srkr name banner"/>
            </p>
            <h1 className="h1-animation-name">VEDIC VISION BOOTCAMP</h1>
            </div>
        
        </div>
    );
};


