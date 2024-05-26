

import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { useNavigate } from "react-router-dom";

export const Popup = () => {
    const nav = useNavigate();

    useEffect(() => {
        const modal = new window.bootstrap.Modal(document.getElementById('Modal'));
        modal.show();
    }, []); 

    const Pop = () => {
        nav('/hackregister');
    }

    return (
        <>
            <div className="modal" tabIndex="-1" id="Modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">VEDIC VISION HACKATHON🌟🏆</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>VEDIC VISION Hackathon Registrations are open Register now.</p>
                            Registration Fee per Head 899/-
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={Pop} type="button" className="btn btn-primary">Register/Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
