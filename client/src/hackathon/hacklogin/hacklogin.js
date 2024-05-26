import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import './hacklogin.css';

export const LoginForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [regd, setRegd] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // const res = await axios.post(`${process.env.REACT_APP_Server}/signin`, { regd, password });
            const res = await axios.post(`${process.env.REACT_APP_Server}/signin/${regd}/${password}`);

            if (res.status === 200) {
                toast({
                    title: 'Login successful',
                    status: 'success',
                    position: 'bottom-right',
                    isClosable: true,
                });
                // navigate('/page');
            }
        } catch (e) {
            console.error(e);
            toast({
                title: e.response?.data?.message || 'Login failed',
                status: 'error',
                position: 'bottom-left',
                isClosable: true,
            });
        }
    };

    const handlePasswordReset = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/sendPassword`, { regd });
            toast({
                title: res.data.message || 'Password sent to your email',
                status: 'success',
                position: 'bottom-right',
                isClosable: true,
            });
        } catch (e) {
            console.error(e);
            toast({
                title: e.response?.data?.message || 'Error sending password',
                status: 'error',
                position: 'bottom-left',
                isClosable: true,
            });
        }
    };

    return (
        <section className="section">
            <div className="login-container">
                <div className="card">
                    <div className="image-container">
                        <img
                            className="image"
                            loading="lazy"
                            src={process.env.PUBLIC_URL + '/hackathon (1).jpg'}
                            alt="Hackathon Logo"
                        />
                    </div>
                    <div className="form-container">
                        <div className="form-header">
                            <h2>Login</h2>
                            <h3>Enter your credentials to login</h3>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="registrationNum">
                                    Registration Number <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="registrationNum"
                                    id="registrationNum"
                                    placeholder="Registration Number"
                                    value={regd}
                                    onChange={(e) => setRegd(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    Password <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <div className="d-grid">
                                    <button onClick={handleLogin} className="btn bsb-btn-xl btn-primary" type="button">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className="hr" />
                        <p className="text-center">
                            Forgot password? <button onClick={handlePasswordReset} className="link-button">Click here</button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
