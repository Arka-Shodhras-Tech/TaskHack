
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// export const UpdateForm = () => {
//     const Update = () => {

//         const nav=useNavigate()
//         nav('/hackregister')
//     };

//     return (
//         <>
//             <section className="p-3 p-md-4 p-xl-5">
//                 <div className="container">
//                     <div className="card border-light-subtle shadow-sm">
//                         <div className="row g-0">
//                             <div className="col-12 col-md-6">
//                                 <img style={{ marginBottom: '20%' }} className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src={process.env.PUBLIC_URL + '/hackathon (1).jpg'} alt="BootstrapBrain Logo" />
//                             </div>
//                             <div className="col-12 col-md-6">
//                                 <div className="card-body p-3 p-md-4 p-xl-5">
//                                     <div className="mb-5">
//                                         <h2 className="h3">Update Details</h2>
//                                         <h3 className="fs-6 fw-normal text-secondary m-0">Enter your new credentials</h3>
//                                     </div>
//                                     <form action="#!">
//                                         <div className="row gy-3 gy-md-4 overflow-hidden">
//                                             <div className="col-md-12">
//                                                 <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
//                                                 <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email" required />
//                                             </div>
//                                             <div className="col-md-12">
//                                                 <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
//                                                 <input type="password" className="form-control" name="password" id="password" placeholder="Enter your new password" required />
//                                             </div>
//                                             <div className="col-12">
//                                                 <div className="d-grid">
//                                                     <button onClick={Update} className="btn bsb-btn-xl btn-primary" type="submit">Update</button>
//                                                 </div><br/>
//                                                 <p className="m-0 text-secondary text-center">
//                                         want to go back? <Link to="/hackregister" className="link-primary text-decoration-none">Go home</Link>
//                                     </p>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// };

import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const UpdateForm = () => {
    const navigate = useNavigate();

    const updateDetails = (e) => {
        e.preventDefault();
        // Add update logic here
        navigate('/home');
    };

    return (
        <section style={{ padding: '3rem 0' }}>
            <div style={{ maxWidth: '900px', margin: 'auto' }}>
                <div style={{ border: '1px solid #dee2e6', borderRadius: '10px', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: '1', padding: '0' }}>
                        <img
                            style={{
                                borderTopLeftRadius: '10px',
                                borderBottomLeftRadius: '10px',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            className="img-fluid"
                            loading="lazy"
                            src={process.env.PUBLIC_URL + '/hackathon (1).jpg'}
                            alt="BootstrapBrain Logo"
                        />
                    </div>
                    <div style={{ flex: '1', padding: '2rem' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem', color: '#343a40' }}>Update Details</h2>
                            <h3 style={{ fontSize: '1rem', color: '#6c757d', margin: '0' }}>Enter your new credentials</h3>
                        </div>
                        <form onSubmit={updateDetails}>
                            <div className="row" style={{ gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                                <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                    <label htmlFor="email" style={{ fontWeight: '600' }}>Email <span style={{ color: 'red' }}>*</span></label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email" required
                                        style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
                                </div>
                                <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                    <label htmlFor="password" style={{ fontWeight: '600' }}>Password <span style={{ color: 'red' }}>*</span></label>
                                    <input type="password" className="form-control" name="password" id="password" placeholder="Enter your new password" required
                                        style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
                                </div>
                                <div className="col-12" style={{ flex: '1 1 100%' }}>
                                    <div className="d-grid">
                                        <button className="btn bsb-btn-xl btn-primary" type="submit" style={{
                                            backgroundColor: '#007bff',
                                            borderColor: '#007bff',
                                            padding: '10px 15px',
                                            fontSize: '1rem',
                                            borderRadius: '5px',
                                            transition: 'background-color 0.3s, border-color 0.3s'
                                        }}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <hr style={{ marginTop: '2rem', marginBottom: '1.5rem', borderColor: '#dee2e6' }} />
                        <p style={{ margin: '0', color: '#6c757d', textAlign: 'center' }}>
                            Want to go back? <Link to="/hackregister" style={{
                                color: '#007bff',
                                textDecoration: 'none',
                                transition: 'color 0.3s'
                            }}>Go home</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

