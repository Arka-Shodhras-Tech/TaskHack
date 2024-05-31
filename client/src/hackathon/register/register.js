
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import './register.css'; 

export const RegistrationForm = () => {
    const nav = useNavigate();
    const [name, SetName] = useState("");
    const [regd, SetRegd] = useState("");
    const [year, SetYear] = useState("");
    const [branch, SetBranch] = useState("");
    const [email, SetEmail] = useState("");
    const [sec, SetSec] = useState("");
    const [num, SetNum] = useState("");
    const [load, setLoad] = useState(false);

    const Register = async () => {
        try {
            setLoad(true);
            const res = await axios.post(process.env.REACT_APP_Server + "/signup/" + email + "/" + name + "/" + num + "/" + regd + "/" + year + "/" + branch + "/" + sec)
            if (res.data.message) {
                alert("Registered successfully");
                setLoad(false);
                nav('/hackathon/login');
            } else {
                setLoad(false);
                console.log(res)
                alert("Try again");

            }
        } catch (e) {
            setLoad(false);
            alert("Please Fill the details")
            console.log(e);
        }
    };

    return (
        <section className="registration-section">
            <div className="registration-container">
                <div className="registration-image">
                    <img
                        className="img-fluid"
                        loading="lazy"
                        src={process.env.PUBLIC_URL + '/hackathon (1).jpg'}
                        alt="Hackathon Logo"
                    />
                </div>
                <div className="registration-form-container">
                    <div className="registration-header">
                        <h2>Registration</h2>
                        <h3>Enter your details to register</h3>
                    </div>
                    <div className="row registration-form-group">
                        <div className="col-12 col-md-6">
                            <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => SetEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="name">Full Name <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => SetName(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="phone">Phone Number <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                id="phone"
                                placeholder="Phone Number"
                                value={num}
                                onChange={(e) => SetNum(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="registrationNum">Registration Number <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="registrationNum"
                                id="registrationNum"
                                placeholder="Registration Number"
                                value={regd}
                                onChange={(e) => SetRegd(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="yearOfStudy">Year of Study <span style={{ color: 'red' }}>*</span></label>
                            <select
                                className="form-control"
                                id="yearOfStudy"
                                name="yearOfStudy"
                                value={year}
                                onChange={(e) => SetYear(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Year</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="branch">Branch <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                name="branch"
                                id="branch"
                                placeholder="Branch"
                                value={branch}
                                onChange={(e) => SetBranch(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-12 col-md-12 select-long">
                            <label htmlFor="section">Section <span style={{ color: 'red' }}>*</span></label>
                            <select
                                className="form-control"
                                id="section"
                                name="section"
                                value={sec}
                                onChange={(e) => SetSec(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <div className="d-grid">
                                <button
                                    onClick={Register}
                                    className="btn bsb-btn-xl btn-primary"
                                    type="button"
                                >
                                    {load ? "Please wait..." : "Sign up"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr className="registration-divider" />
                    <p className="registration-footer-text">
                        Already have an account? <Link to="/hackathon/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};


