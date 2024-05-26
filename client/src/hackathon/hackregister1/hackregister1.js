import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
// import { Register } from "../../admin/register/register";
export const RegistrationForm = () => {
    const nav = useNavigate();

    // const [check, SetCheck] = useState("");
    const [name, SetName] = useState("");
    const [regd, SetRegd] = useState("");
    const [year, SetYear] = useState("");
    const [branch, Setbranch] = useState("");
    const [email, SetEmail] = useState("");
    const [sec,SetSec]=useState("")
    const [num, snum] = useState();

    const Register=async()=>
        {
            try
            {
                const res=await axios.post(process.env.REACT_APP_Server + "/signup/" +email+"/"+name+"/"+regd+"/"+num+"/"+year+"/"+branch+"/"+sec)
                {
                    if(res.data)
                    {
                        alert("Registered succesfully");
                        console.log(res)
                        nav('/hacklogin')
    
                    }
                    else
                    {
                        alert("try again");
                    }
                }
            }
            catch(e)
            {
                console.log(e)
            }
        }
        return (
            <>
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
                                    <h2 style={{ fontSize: '2rem', color: '#343a40' }}>Registration</h2>
                                    <h3 style={{ fontSize: '1rem', color: '#6c757d', margin: '0' }}>Enter your details to register</h3>
                                </div>
                                {/* <form onSubmit={RegistrationForm}> */}
    
    
    
    
    
                                
                                    <div className="row" style={{ gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                                        <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                            <label htmlFor="email" style={{ fontWeight: '600' }}>Email <span style={{ color: 'red' }}>*</span></label>
                                            <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" value={email}
                                            onChange={(e) => SetEmail(e.target.value)} required
                                                style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
                                        </div>
                                    
    
                                        <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                            <label htmlFor="name" style={{ fontWeight: '600' }}>FullName <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" className="form-control" name="name" id="name" placeholder="FullName" value={name}
                                            onChange={(e) => SetName(e.target.value.toUpperCase())} required
                                                style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
                                        </div>
    
    
                                        <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                            <label htmlFor="phone" style={{ fontWeight: '600' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                                            <input type="tel" className="form-control" name="phone" id="phone" placeholder="Phone Number" value={num}
                                            onChange={(e) => snum(e.target.value)} required
                                                style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
                                        </div>
    
    
                                        <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                            <label htmlFor="registrationNum" style={{ fontWeight: '600' }}>Registration Number <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" className="form-control" name="registrationNum" id="registrationNum" placeholder="Registration Number"  value={regd}
                                            onChange={(e) => SetRegd(e.target.value.toUpperCase())} required
                                                style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
                                        </div>
    
    
                                        <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                            <label htmlFor="yearOfStudy" style={{ fontWeight: '600' }}>Year of Study <span style={{ color: 'red' }}>*</span></label>
                                            <select className="form-control" id="yearOfStudy" name="yearOfStudy" value={year}
                                            onChange={(e) => SetYear(e.target.value)} required
                                                style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }}>
                                                <option value="" disabled selected>Select Year</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
    
    
                                        <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                            <label htmlFor="branch" style={{ fontWeight: '600' }}>Branch <span style={{ color: 'red' }}>*</span></label>
                                            <input type="text" className="form-control" name="branch" id="branch" placeholder="Branch" value={branch}
                                            onChange={(e) => Setbranch(e.target.value)} required
                                                style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
                                        </div>
    
    
                                        <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
                                            <label htmlFor="section" style={{ fontWeight: '600' }}>Section <span style={{ color: 'red' }}>*</span></label>
                                            <select className="form-control" id="section" name="section"  value={sec}
                                            onChange={(e) => SetSec(e.target.value)} required
                                                style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }}>
                                                <option value="" disabled selected>Select Section</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                            </select>
                                        </div>
    
    
                                        <div className="col-12" style={{ flex: '1 1 100%' }}>
                                            <div className="d-grid">
                                                <button onClick={Register}className="btn bsb-btn-xl btn-primary" type="submit" style={{
                                                    backgroundColor: '#007bff',
                                                    borderColor: '#007bff',
                                                    padding: '10px 15px',
                                                    fontSize: '1rem',
                                                    borderRadius: '5px',
                                                    transition: 'background-color 0.3s, border-color 0.3s'
                                                }}>Sign up</button>
                                            </div>
                                        </div>
                                    </div>
    
    
                                {/* </form> */}
                                <hr style={{ marginTop: '2rem', marginBottom: '1.5rem', borderColor: '#dee2e6' }} />
                                <p style={{ margin: '0', color: '#6c757d', textAlign: 'center' }}>
                                    Already have an account? <Link to="/hacklogin" style={{
                                        color: '#007bff',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s'
                                    }}>Sign in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
    
                </section>
            </>
        );
    };
    
    
    
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// export const RegistrationForm = () => {
//     const nav = useNavigate();

//     const Register = () => {
//         nav('/login');
//     };

//     return (
//         <>
//             <section style={{ padding: '3rem 0' }}>
//                 <div style={{ maxWidth: '900px', margin: 'auto' }}>
//                     <div style={{ border: '1px solid #dee2e6', borderRadius: '10px', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', display: 'flex', flexDirection: 'row' }}>
//                         <div style={{ flex: '1', padding: '0' }}>
//                             <img
//                                 style={{
//                                     borderTopLeftRadius: '10px',
//                                     borderBottomLeftRadius: '10px',
//                                     width: '100%',
//                                     height: '100%',
//                                     objectFit: 'cover'
//                                 }}
//                                 className="img-fluid"
//                                 loading="lazy"
//                                 src={process.env.PUBLIC_URL + '/hackathon (1).jpg'}
//                                 alt="BootstrapBrain Logo"
//                             />
//                         </div>
//                         <div style={{ flex: '1', padding: '2rem' }}>
//                             <div style={{ marginBottom: '2rem' }}>
//                                 <h2 style={{ fontSize: '2rem', color: '#343a40' }}>Registration</h2>
//                                 <h3 style={{ fontSize: '1rem', color: '#6c757d', margin: '0' }}>Enter your details to register</h3>
//                             </div>
//                             {/* <form onSubmit={Register}> */}
//                                 <div className="row" style={{ gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="email" style={{ fontWeight: '600' }}>Email <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>
                                

//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="name" style={{ fontWeight: '600' }}>FullName <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="text" className="form-control" name="name" id="name" placeholder="FullName" required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="phone" style={{ fontWeight: '600' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="tel" className="form-control" name="phone" id="phone" placeholder="Phone Number" required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="registrationNum" style={{ fontWeight: '600' }}>Registration Number <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="text" className="form-control" name="registrationNum" id="registrationNum" placeholder="Registration Number" required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="yearOfStudy" style={{ fontWeight: '600' }}>Year of Study <span style={{ color: 'red' }}>*</span></label>
//                                         <select className="form-control" id="yearOfStudy" name="yearOfStudy" required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }}>
//                                             <option value="" disabled selected>Select Year</option>
//                                             <option value="1">1</option>
//                                             <option value="2">2</option>
//                                             <option value="3">3</option>
//                                             <option value="4">4</option>
//                                         </select>
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="branch" style={{ fontWeight: '600' }}>Branch <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="text" className="form-control" name="branch" id="branch" placeholder="Branch" required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="section" style={{ fontWeight: '600' }}>Section <span style={{ color: 'red' }}>*</span></label>
//                                         <select className="form-control" id="section" name="section" required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }}>
//                                             <option value="" disabled selected>Select Section</option>
//                                             <option value="A">A</option>
//                                             <option value="B">B</option>
//                                             <option value="C">C</option>
//                                             <option value="D">D</option>
//                                             <option value="E">E</option>
//                                         </select>
//                                     </div>


//                                     <div className="col-12" style={{ flex: '1 1 100%' }}>
//                                         <div className="d-grid">
//                                             <button onClick={Register}className="btn bsb-btn-xl btn-primary" type="submit" style={{
//                                                 backgroundColor: '#007bff',
//                                                 borderColor: '#007bff',
//                                                 padding: '10px 15px',
//                                                 fontSize: '1rem',
//                                                 borderRadius: '5px',
//                                                 transition: 'background-color 0.3s, border-color 0.3s'
//                                             }}>Sign up</button>
//                                         </div>
//                                     </div>
//                                 </div>


//                             {/* </form> */}
//                             <hr style={{ marginTop: '2rem', marginBottom: '1.5rem', borderColor: '#dee2e6' }} />
//                             <p style={{ margin: '0', color: '#6c757d', textAlign: 'center' }}>
//                                 Already have an account? <Link to="/hacklogin" style={{
//                                     color: '#007bff',
//                                     textDecoration: 'none',
//                                     transition: 'color 0.3s'
//                                 }}>Sign in</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//             </section>
//         </>
//     );
// };





// import React from "react";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
// import { Register } from "../../admin/register/register";
// export const RegistrationForm = () => {
//     const nav = useNavigate();

//     const [check, SetCheck] = useState("");
//     const [name, SetName] = useState("");
//     const [regd, SetRegd] = useState("");
//     const [year, SetYear] = useState("");
//     const [branch, Setbranch] = useState("");
//     const [email, SetEmail] = useState("");
//     const [sec,SetSec]=useState("")
//     const [num, snum] = useState(0);
//     const toast=useToast();
//     const Handleclick = async () => {
//       const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//       try {
//         if (emailRegex.test(email)) {
//           const res = await axios.post(process.env.REACT_APP_database + "/student/" + email)
//           {
//             if (res.data) {
//               SetCheck("E-mail or Register Number is already exists");
//             }
//             else {
//               const res = await axios.post(process.env.REACT_APP_database + "/signup/" + email + "/" + name + "/" + num + "/" + regd + "/" + year + "/" + branch + "/" +sec )
//               {
//                 if (res) {
//                   toast({title:"Register Successfully",status:'success',position:"bottom-right", isClosable:true})
//                   setTimeout(() => {
//                     window.location = '/login'
//                   }, 1000);
//                 }
//                 else {
//                   toast({title:"Try again",status:"error",position:"bottom-left", isClosable:true})
//                 }
//               }
//             }
//           }
  
//         }
//         else {
//           SetCheck("Invalid Email");
//         }
//       }
//       catch (err) {
//         console.log(err);
//       }
//     }

//     return (
//         <>
//             <section style={{ padding: '3rem 0' }}>
//                 <div style={{ maxWidth: '900px', margin: 'auto' }}>
//                     <div style={{ border: '1px solid #dee2e6', borderRadius: '10px', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', display: 'flex', flexDirection: 'row' }}>
//                         <div style={{ flex: '1', padding: '0' }}>
//                             <img
//                                 style={{
//                                     borderTopLeftRadius: '10px',
//                                     borderBottomLeftRadius: '10px',
//                                     width: '100%',
//                                     height: '100%',
//                                     objectFit: 'cover'
//                                 }}
//                                 className="img-fluid"
//                                 loading="lazy"
//                                 src={process.env.PUBLIC_URL + '/hackathon (1).jpg'}
//                                 alt="BootstrapBrain Logo"
//                             />
//                         </div>
//                         <div style={{ flex: '1', padding: '2rem' }}>
//                             <div style={{ marginBottom: '2rem' }}>
//                                 <h2 style={{ fontSize: '2rem', color: '#343a40' }}>Registration</h2>
//                                 <h3 style={{ fontSize: '1rem', color: '#6c757d', margin: '0' }}>Enter your details to register</h3>
//                             </div>
//                             {/* <form onSubmit={RegistrationForm}> */}





                            
//                                 <div className="row" style={{ gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="email" style={{ fontWeight: '600' }}>Email <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" value={email}
//                                         onChange={(e) => SetEmail(e.target.value)} required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>
                                

//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="name" style={{ fontWeight: '600' }}>FullName <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="text" className="form-control" name="name" id="name" placeholder="FullName" value={name}
//                                         onChange={(e) => SetName(e.target.value.toUpperCase())} required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="phone" style={{ fontWeight: '600' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="tel" className="form-control" name="phone" id="phone" placeholder="Phone Number" value={num}
//                                         onChange={(e) => snum(e.target.value)} required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="registrationNum" style={{ fontWeight: '600' }}>Registration Number <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="text" className="form-control" name="registrationNum" id="registrationNum" placeholder="Registration Number"  value={regd}
//                                         onChange={(e) => SetRegd(e.target.value.toUpperCase())} required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="yearOfStudy" style={{ fontWeight: '600' }}>Year of Study <span style={{ color: 'red' }}>*</span></label>
//                                         <select className="form-control" id="yearOfStudy" name="yearOfStudy" value={year}
//                                         onChange={(e) => SetYear(e.target.value)} required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }}>
//                                             <option value="" disabled selected>Select Year</option>
//                                             <option value="1">1</option>
//                                             <option value="2">2</option>
//                                             <option value="3">3</option>
//                                             <option value="4">4</option>
//                                         </select>
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="branch" style={{ fontWeight: '600' }}>Branch <span style={{ color: 'red' }}>*</span></label>
//                                         <input type="text" className="form-control" name="branch" id="branch" placeholder="Branch" value={branch}
//                                         onChange={(e) => Setbranch(e.target.value)} required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }} />
//                                     </div>


//                                     <div className="col-12 col-md-6" style={{ flex: '1 1 45%' }}>
//                                         <label htmlFor="section" style={{ fontWeight: '600' }}>Section <span style={{ color: 'red' }}>*</span></label>
//                                         <select className="form-control" id="section" name="section"  value={sec}
//                                         onChange={(e) => SetSec(e.target.value)} required
//                                             style={{ padding: '10px', fontSize: '0.9rem', borderRadius: '5px', border: '1px solid #ced4da' }}>
//                                             <option value="" disabled selected>Select Section</option>
//                                             <option value="A">A</option>
//                                             <option value="B">B</option>
//                                             <option value="C">C</option>
//                                             <option value="D">D</option>
//                                             <option value="E">E</option>
//                                         </select>
//                                     </div>


//                                     <div className="col-12" style={{ flex: '1 1 100%' }}>
//                                         <div className="d-grid">
//                                             <button onClick={Register}className="btn bsb-btn-xl btn-primary" type="submit" style={{
//                                                 backgroundColor: '#007bff',
//                                                 borderColor: '#007bff',
//                                                 padding: '10px 15px',
//                                                 fontSize: '1rem',
//                                                 borderRadius: '5px',
//                                                 transition: 'background-color 0.3s, border-color 0.3s'
//                                             }}>Sign up</button>
//                                         </div>
//                                     </div>
//                                 </div>


//                             {/* </form> */}
//                             <hr style={{ marginTop: '2rem', marginBottom: '1.5rem', borderColor: '#dee2e6' }} />
//                             <p style={{ margin: '0', color: '#6c757d', textAlign: 'center' }}>
//                                 Already have an account? <Link to="/hacklogin" style={{
//                                     color: '#007bff',
//                                     textDecoration: 'none',
//                                     transition: 'color 0.3s'
//                                 }}>Sign in</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//             </section>
//         </>
//     );
// };
