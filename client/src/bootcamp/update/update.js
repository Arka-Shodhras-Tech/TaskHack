import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import "../sendotp/update.css";

export const UpdateForm = () => {
    const [regd, setRegd] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    document.title = "Update Password| Bootcamp| Vedic vision  | AST TEAM";

    const getOtp = async () => {
        if (!regd) {
            toast({
                title: 'Enter Your Register number',
                status: 'error',
                position: 'bottom-left',
                isClosable: true,
            });
            return;
        }
        setLoad(true);
        try {
            const response = await axios.post(process.env.REACT_APP_Server + '/sendotp', { regd });
            const result = response.data;
            if (result.message) {
                toast({
                    title: result.message || 'OTP has sent to your Gmail successfully',
                    status: 'success',
                    position: 'top-right',
                    isClosable: true,
                });
                setOtpSent(true);
            } else {
                toast({
                    title: result.error || 'An error occurred',
                    status: 'error',
                    position: 'bottom-left',
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: error?.message?.message,
                status: 'error',
                position: 'bottom-left',
                isClosable: true,
            });
        } finally {
            setLoad(false);
        }
    };

    const updateDetails = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'error',
                position: 'bottom-left',
                isClosable: true,
            });
            return;
        }

        setLoad(true);

        try {
            const response = await axios.post(process.env.REACT_APP_Server + '/updatepassword', { regd, password });
            const result = response.data;
            if (result.message) {
                toast({
                    title: 'Password Updated successfully',
                    status: "success",
                    position: 'top-right',
                    isClosable: true,
                });
                navigate('/bootcamp/home');
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (!otpSent) {
                getOtp();
            } else {
                updateDetails(e);
            }
        }
    };

    const handleFocus = (e) => {
        console.log(`${e.target.name} is focused`);
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
                                    onKeyPress={handleKeyPress}
                                    onFocus={handleFocus}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    onFocus={handleFocus}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Enter confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    onFocus={handleFocus}
                                    required
                                />
                            </div>
                            {!otpSent ? (
                                <div className="col-12 update-form-button">
                                    <div className="d-grid">
                                        <button onClick={getOtp} className="btn bsb-btn-xl btn-primary" type="button" disabled={load || otpSent}>
                                            {load ? 'Please wait...' : (otpSent ? 'OTP Sent' : 'Get OTP')}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="otp">OTP <span style={{ color: 'red' }}>*</span></label>
                                        <input type="otp" className="form-control" name="otp" id="otp" placeholder="Enter OTP" required />
                                    </div>
                                    <div className="col-12 update-form-button">
                                        <div className="d-grid">
                                            <button onClick={updateDetails} className="btn bsb-btn-xl btn-primary" type="submit">
                                                {load ? 'Please wait...' : 'Update'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
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
