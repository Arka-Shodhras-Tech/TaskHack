import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./update.css";

export const NewUpdateForm = () => {
    const [regd, setRegd] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const getOtp = async () => {
        if (!regd) {
            alert("Please enter your registration number.");
            return;
        }

        setLoad(true);

        try {
            const response = await axios.post('http://localhost:9899/sendotp', { regd });
            const result = response.data;

            if (result.message) {
                alert(result.message);
                setOtpSent(true);
                
            } else {
                alert(result.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setLoad(false);
        }
    };

    const updateDetails = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setLoad(true);

        try {
            const response = await axios.post('http://localhost:9899/updatepassword', { regd, password });
            const result = response.data;

            if (result.message) {
                alert(result.message);
                navigate('/hackathon/newlogin');
            } else {
                alert(result.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.error || 'An error occurred. Please try again.');
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
                    <form onSubmit={updateDetails}>
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
                            <div className="col-12 col-md-6 update-form-input">
                                <label htmlFor="password">Password <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-12 col-md-6 update-form-input">
                                <label htmlFor="confirmPassword">Confirm Password <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Enter confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-12 update-form-button">
                                <div className="d-grid">
                                    <button onClick={getOtp} className="btn bsb-btn-xl btn-primary" type="button" disabled={load || otpSent}>
                                        {load ? 'Please wait...' : (otpSent ? 'OTP Sent' : 'Get OTP')}
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 update-form-input">
                            <label htmlFor="otp">OTP <span style={{ color: 'red' }}>*</span></label>
                            <input type="otp" className="form-control" name="otp" id="otp" placeholder="Enter OTP" required />
                        </div>
                            
                            <div className="col-12 update-form-button">
                                <div className="d-grid">
                                    <button onclick={updateDetails}className="btn bsb-btn-xl btn-primary" type="submit" disabled={load || !otpSent}>
                                        {load ? 'Please wait...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr />
                    <p className="update-form-footer">
                        Want to go back? <Link to="/bootcamp/login">Go home</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};
