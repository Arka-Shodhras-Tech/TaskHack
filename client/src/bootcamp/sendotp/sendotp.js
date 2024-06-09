import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./update.css";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
export const OTPForm = () => {
    const [load, setLoad] = useState(false);
    const [regd, setRegd] = useState('');
    const dispatch=useDispatch()
    const toast = useToast();

    const updateDetails1 = async () => {
        setLoad(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_Server}/updatepasswordlink`, { regd });
            console.log(res.data)
            if (!res.data?.message) {
                alert('Invalid Registered Number');
                setLoad(false);
                return;
            }
            // dispatch({type:'UPDATE',update:regd})
            
            toast({
                title: 'Update Password link sended successfully',
                status: 'success',
                position: 'bottom-right',
                isClosable: true,
            });



            setRegd('');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoad(false);
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
                                onChange={(e) => setRegd(e.target.value.toUpperCase())}
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
