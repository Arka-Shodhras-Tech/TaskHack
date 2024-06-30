import { Button, useToast } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '../../actions/actions';
import { CreateTeam } from './create-team-model';
import './teamlogin.css';

export const TeamLoginForm = () => {
    const toast = useToast();
    const [show, setShow] = useState(false)
    const [load, setLoad] = useState(false);
    const [data, setData] = useState()
    const [regd, setRegd] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const Login = async () => {
        if (regd && password) {
            setLoad(true)
            await Actions.CheckTeam(regd)
                .then((res) => {
                    if (res?.data?.data?.TeamCode) {
                        if (res?.data?.data?.Password === password) {
                            setLoad(false)
                            dispatch({ type: 'TEAM', payload: { Teamcode: res?.data?.data?.TeamCode, Teamname: res?.data?.data?.Password } })
                            toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                        } else {
                            toast({ title: "incorrect password", status: 'error', position: 'bottom-right', isClosable: true })
                        }
                    } else {
                        toast({ title: "user not found", status: 'error', position: 'bottom-right', isClosable: true })
                    }
                }).catch((e) => { console.log(e); setLoad(false) })
        } else {
            toast({ title: "required all fields", status: 'error', position: 'bottom-right', isClosable: true })
        }
    };

    const fetchData = async () => {
        await Actions.TeamsCodes()
            .then((res) => {
                if (res?.data) {
                    setData(res?.data)
                }
            }).catch((e) => { console.log(e) })
    }

    data || fetchData()
    return (
        <section className="login-section-pss">
            <CreateTeam isOpen={show} onClose={() => { setShow(false); fetchData() }} data={data} />
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
                                    Team Code <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="registrationNum"
                                    id="registrationNum"
                                    placeholder="Enter Team Code"
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
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
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
                            <Button className="link-button-pss" onClick={() => setShow(true)}>Create Team</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


