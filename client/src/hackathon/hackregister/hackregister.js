

import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./hackregister.css"; 

export const RegistrationForm = () => {
    const nav = useNavigate();

    const [name, setName] = useState("");
    const [regd, setRegd] = useState("");
    const [year, setYear] = useState("");
    const [branch, setBranch] = useState("");
    const [email, setEmail] = useState("");
    const [sec, setSec] = useState("");
    const [num, setNum] = useState("");

    const Register = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_Server}/signup/${email}/${name}/${regd}/${num}/${year}/${branch}/${sec}`);
            if (res.data) {
                alert("Registered successfully");
                console.log(res);
                nav('/hacklogin');
            } else {
                alert("Try again");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <section className="registration-section">
                <div className="registration-container">
                    <div className="registration-wrapper">
                        <div className="registration-image">
                            <img
                                className="img-fluid"
                                loading="lazy"
                                src={process.env.PUBLIC_URL + '/hackathon (1).jpg'}
                                alt="Hackathon"
                            />
                        </div>
                        <div className="registration-form">
                            <div className="form-header">
                                <h2>Registration</h2>
                                <h3>Enter your details to register</h3>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="email">Email <span>*</span></label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" value={email}
                                        onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div className="col">
                                    <label htmlFor="name">Full Name <span>*</span></label>
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Full Name" value={name}
                                        onChange={(e) => setName(e.target.value.toUpperCase())} required />
                                </div>

                                <div className="col">
                                    <label htmlFor="phone">Phone Number <span>*</span></label>
                                    <input type="tel" className="form-control" name="phone" id="phone" placeholder="Phone Number" value={num}
                                        onChange={(e) => setNum(e.target.value)} required />
                                </div>

                                <div className="col">
                                    <label htmlFor="registrationNum">Registration Number <span>*</span></label>
                                    <input type="text" className="form-control" name="registrationNum" id="registrationNum" placeholder="Registration Number" value={regd}
                                        onChange={(e) => setRegd(e.target.value.toUpperCase())} required />
                                </div>

                                <div className="col">
                                    <label htmlFor="yearOfStudy">Year of Study <span>*</span></label>
                                    <select className="form-control" id="yearOfStudy" name="yearOfStudy" value={year}
                                        onChange={(e) => setYear(e.target.value)} required>
                                        <option value="" disabled>Select Year</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="branch">Branch <span>*</span></label>
                                    <input type="text" className="form-control" name="branch" id="branch" placeholder="Branch" value={branch}
                                        onChange={(e) => setBranch(e.target.value)} required />
                                </div>

                                <div className="col">
                                    <label htmlFor="section">Section <span>*</span></label>
                                    <select className="form-control" id="section" name="section" value={sec}
                                        onChange={(e) => setSec(e.target.value)} required>
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
                                        <button onClick={Register} className="btn bsb-btn-xl btn-primary" type="button">Sign up</button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <p>
                                Already have an account? <Link to="/hacklogin">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

