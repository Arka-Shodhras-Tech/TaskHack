

import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./update.css"; 

export const UpdateForm = () => {
    const navigate = useNavigate();

    const updateDetails = (e) => {
        e.preventDefault();
        // Add update logic here
        navigate('/home');
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
                        <h3>Enter your new credentials</h3><br/>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 update-form-input">
                            <label htmlFor="email">Email <span>*</span></label>
                            <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="col-12 col-md-6 update-form-input">
                            <label htmlFor="password">Password <span>*</span></label>
                            <input type="password" className="form-control" name="password" id="password" placeholder="Enter your new password" required />
                        </div>
                        <div className="col-12 update-form-button">
                            <div className="d-grid">
                                <button onClick={updateDetails} className="btn bsb-btn-xl btn-primary" type="submit">Update</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p className="update-form-footer">
                        Want to go back? <Link to="/hackregister">Go home</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};
