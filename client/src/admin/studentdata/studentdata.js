import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavBar } from "../../navbar/navbar";

export const Studentdata = () => {
    const [data, sdata] = useState([]);
    const [rmv, srmv] = useState();
    const [load, sload] = useState();
    const [load1, sload1] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const [work, setwork] = useState();
    const [enddate, setenddate] = useState();
    const [startdate, setstartdate] = useState();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    useEffect(() => {
        setstartdate(`${year}-${month}-${day}`);
    }, [year, month, day]);

    const Remove = async () => {
        await axios.post(`${process.env.REACT_APP_Server}/remove`, { rmv })
            .then((res) => {
                if (res.data) {
                    alert("Removed Successfully");
                    window.location.reload(3);
                } else {
                    alert("Try again");
                }
            })
            .catch((e) => console.log(e));
    };

    const onClose = () => {
        setShowInput(false);
    }

    const AddWork = () => {
        setShowInput(true);
    };

    const AddTeamWork = async () => {
        await axios.post(`${process.env.REACT_APP_Server}/addteamwork/` + work + "/" + startdate + "/" + enddate + "/" + rmv.data)
            .then((res) => {
                if (res.data) {
                    setShowInput(false);
                }
                else {
                    console.log("work is not assign");
                }
            })
            .catch((e) => console.log(e))
    }

    const DropTeam = async () => {
        document.getElementById(rmv.data + rmv.index).style.display = "block";
        document.getElementById(rmv.data).style.display = "none";
        const x = setTimeout(async () => {
            await axios.post(`${process.env.REACT_APP_Server}/droptable/` + rmv.data)
                .then((res) => {
                    if (res.data) {
                        alert("Delete Team");
                        document.getElementById(rmv.data + rmv.index).style.display = "none";
                        document.getElementById(rmv.data).style.display = "block";
                        window.location.reload(3);
                    } else {
                        alert("Try again");
                    }
                })
                .catch((e) => console.log(e));
        }, 2000);
        sload(x);
    };

    const StopDropTeam = () => {
        if (load) {
            clearTimeout(load);
            document.getElementById(rmv.data + rmv.index).style.display = "none";
            document.getElementById(rmv.data).style.display = "block";
        }
    };

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_Server}/studentdata`)
            .then((res) => {
                sdata(res.data);
                sload1(false);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <>
            <NavBar />
            {showInput ? (
                <>
                    <div style={{ textAlign: "center", width: "90%", maxWidth: "500px", margin: "auto", padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "10px", position: "relative" }}>
                        <h1 style={{ margin: 0 }}>{rmv.data}</h1>
                        <button onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "transparent", border: "none", color: "red", fontSize: "1.5rem", cursor: "pointer" }}>X</button>
                    </div>
                    <div style={{ textAlign: "center", width: "90%", maxWidth: "500px", margin: "auto", padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "10px", marginTop: "10px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label style={{ textAlign: "start" }}><b>Enter the Team Work</b></label>
                            <input type="text" placeholder="Assign work to the Team" onChange={(e) => setwork(e.target.value)} style={{ width: "100%", height: "50px", marginBottom: "10px", backgroundColor: "rgba(255, 255, 255, 0.2)", border: "none", borderRadius: "5px", padding: "5px" }} />
                            <label style={{ textAlign: "start" }}><b>End Date of Work</b></label>
                            <input type="date" onChange={(e) => setenddate(e.target.value)} style={{ width: "100%", height: "50px", backgroundColor: "rgba(255, 255, 255, 0.2)", border: "none", borderRadius: "5px", padding: "5px" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                            <button style={{ backgroundColor: "rgba(0, 123, 255, 0.7)", border: "none", borderRadius: "5px", padding: "10px", color: "white", flex: 1, marginRight: "5px" }} onClick={AddTeamWork}>Submit</button>
                            <button style={{ backgroundColor: "rgba(0, 123, 255, 0.7)", border: "none", borderRadius: "5px", padding: "10px", color: "white", flex: 1, marginLeft: "5px" }} onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                </>

            ) : (
                <div>
                    <table responsive className="table2">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Register Number</th>
                                <th>Branch</th>
                                <th>Section</th>
                                <th>Phone Number</th>
                                <th colSpan={2}>Team</th>
                            </tr>
                        </thead>
                        {load1 && (
                            <thead>
                                <tr>
                                    <th colSpan={5} style={{ backgroundColor: 'white', color: 'red', textAlign: 'center' }}><h5>please wait.....</h5></th>
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {data.map((item, index) => (
                                <>
                                    <tr>
                                        <th colSpan={7} style={{ backgroundColor: 'skyblue', color: 'blue' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <label><b>{item.Teamname.toUpperCase()}</b></label>
                                                <Button id={item.Teamname} style={{ margin: '0 -40% 0 40%', backgroundColor: '#FBA834', color: 'black' }} onClick={AddWork} onClickCapture={() => { srmv({ data: (item.Teamname), index }) }}> <b>＋</b> </Button>
                                                <Button id={item.Teamname} style={{ margin: '0 -40% 0 42%', backgroundColor: '#3085C3' }} onClick={DropTeam} onClickCapture={() => { srmv({ data: (item.Teamname), index }) }}> X </Button>
                                                <Button id={item.Teamname + index} style={{ margin: '0 -40% 0 40%', backgroundColor: 'yellow', color: 'black', display: 'none' }} onClick={StopDropTeam} onClickCapture={() => { srmv({ data: (item.Teamname), index }) }}>UNDO</Button>
                                            </div>
                                        </th>
                                    </tr>
                                    <>
                                        {item.Teammembers.map((val, index) => (
                                            <tr>
                                                <td>{val.Name}</td>
                                                <td>{val.Registernumber}</td>
                                                <td>{val.Branch}</td>
                                                <td>{val.Section}</td>
                                                <td>{val.Phonenumber}</td>
                                                <td>{item.Teamname}</td>
                                                <td>
                                                    <Button style={{ backgroundColor: 'red' }} onClick={Remove} onClickCapture={() => srmv({ val, index, item })}>X</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};
