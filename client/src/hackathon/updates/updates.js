

import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./update.css";

export const NewUpdateForm = () => {
    const navigate = useNavigate();

    const updateDetails = () => {


        navigate('');
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
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6 update-form-input">
                            <label htmlFor="password">Password <span style={{ color: 'red' }}>*</span></label>
                            <input type="password" className="form-control" name="password" id="password" placeholder="Enter your new password" required />
                        </div>
                        <div className="col-12 col-md-6 update-form-input">
                            <label htmlFor="password">Conform Password <span style={{ color: 'red' }}>*</span></label>
                            <input type="password" className="form-control" name="password" id="conpassword" placeholder="Enter conform  password" required />
                        </div>

                        <div className="col-12 update-form-button">
                            <div className="d-grid">
                                <button onClick={updateDetails} className="btn bsb-btn-xl btn-primary" type="submit">Update</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p className="update-form-footer">
                        Want to go back? <Link to="/hackathon/login">Go home</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};
