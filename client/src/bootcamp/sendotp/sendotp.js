import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./update.css";

export const OTPForm = () => {
    const [load, setLoad] = useState(false);
    const [regd, setRegd] = useState('');
    const dispatch = useDispatch();
    const toast = useToast();
    document.title = "Update Password | Bootcamp | Vedic Vision | Team Ast"

    const updateDetails1 = async () => {
        setLoad(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_Server}/updatepasswordlink`, { regd });
            if (!res.data?.message) {
                toast({
                    title: "try again",
                    status: 'error',
                    position: 'bottom-right',
                    isClosable: true,
                });
                alert('Invalid Registered Number');
                setLoad(false);
                return;
            }
            dispatch({ type: 'UPDATE', payload: { update: regd } });
            toast({
                title: res.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'An error occurred. Please try again',
                status: 'error',
                position: 'bottom-right',
                isClosable: true,
            });
        } finally {
            setLoad(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateDetails1();
        }
    };

    return (
        <section className="update-form-section">
            <div className="update-form-container">
                <div className="update-form-image">
                    <img
                        className="img-fluid"
                        loading="lazy"
                        src={process.env.PUBLIC_URL + '/hackathon (1).jpg'}
                        alt="BootstrapBrain Logo"
                    />
                </div>
                <div className="update-form-content">
                    <div className="update-form-heading">
                        <h2>Update Details</h2>
                        <h3>Enter your new credentials</h3><br />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="registrationNum">
                                Registered Number <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="registrationNum"
                                id="registrationNum"
                                placeholder="Registered Number"
                                value={regd}
                                onChange={(e) => setRegd(e.target.value.toUpperCase().replace(/[ ,]/g, ''))}
                                onKeyPress={handleKeyPress}
                                required
                            />
                        </div>
                        <div className="col-12 update-form-button">
                            <div className="d-grid">
                                <button onClick={updateDetails1} className="btn bsb-btn-xl btn-primary" type="button" disabled={load}>
                                    {load ? 'Please wait...' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p className="update-form-footer">
                        Want to go back? <Link to="/bootcamp/login">Go home</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};
