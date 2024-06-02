
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

export const LoginForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [load, setLoad] = useState(false);
    const [regd, setRegd] = useState('');
    const [password, setPassword] = useState('');

    const Login = async () => {
        try {
            setLoad(true);
            const res = await axios.post(`${process.env.REACT_APP_Server}/signin`, { regd, password });

            if (res.data.message) {
                alert(res.data.message);
                toast({
                    title: 'Login successful',
                    status: 'success',
                    position: 'bottom-right',
                    isClosable: true,
                });
                setLoad(false);
            }
            if (res.data.passmessage) {
                console.log(res);
                navigate('/hackathon/home');
            }
            if (res.data.error) {
                console.log(res);
                navigate('/hackathon/register');
            }
            if (res.data.passerror) {
                alert(res.data.passerror);
                setLoad(false);
            }
        } catch (e) {
            console.error(e);
            toast({
                title: e.response?.data?.errmsg || 'Login failed',
                status: 'error',
                position: 'bottom-left',
                isClosable: true,
            });
            setLoad(false);
        }
    };



    
    const handlePasswordReset = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_Server}/updatepassword`, { regd });
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


    // useEffect(() => {
    //     const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    //     const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));
    //     return () => {
    //         tooltipList.forEach((tooltip) => tooltip.dispose());
    //     };
    // }, []);



// **************Password field*************
    useEffect(() => {
        const tooltip = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltip.map((tooltipTrigger) => {
            if (tooltipTrigger) {
                return new window.bootstrap.Tooltip(tooltipTrigger);
            }
            return null;
        }).filter(Boolean);  

        return () => {
            tooltipList.forEach((tooltip) => tooltip.dispose());
        };
    }, []);



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
                                    onChange={(e) => setRegd(e.target.value.toUpperCase())}
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
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-custom-class="custom-tooltip"
                                    title="Temporarily create a password then an generated password will be sent to your email"
                                />
                            </div>
                            <div className="form-actions">
                                <div className="d-grid">
                                    <button onClick={Login} className="btn bsb-btn-xl btn-primary" type="button">
                                        {load ? "Please wait.." : "Login"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className="hr" />
                        <div className="text-center">
                            <Link to="/hackathon/register">Sign up?</Link>
                            <Link to="/hackathon/update" className="link-button">Forgot password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
