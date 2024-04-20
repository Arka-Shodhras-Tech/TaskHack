import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavBar } from "../../navbar/navbar";
export const Studentscore = () => {
    const [data, sdata] = useState([]);
    const [load, sload] = useState(true);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_Server}/studentdata`)
            .then((res) => {
                sdata((res.data))
                sload(false)
            })
            .catch((e) => console.log(e))
    }, [])
    return (
        <>
            <NavBar />
            <div>
                <table responsive className="table2">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Register Number</th>
                            <th>Branch</th>
                            <th>Section</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    {load && <thead>
                        <tr>
                            <th colSpan={5} style={{ backgroundColor: 'white', color: 'red', textAlign: 'center' }}><h5>please wait.....</h5></th>
                        </tr>
                    </thead>}
                    <tbody>
                        {
                            data.sort((a, b) => a.Teamname.trim().slice(-1).localeCompare(b.Teamname.trim().slice(-1))).map((item) =>
                            (
                                <>
                                    <tr >
                                        <th colSpan={7} style={{ backgroundColor: 'skyblue', color: 'blue' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <label><b>{item.Teamname.toUpperCase()}</b></label>
                                            </div>
                                        </th>
                                    </tr>
                                    <>
                                        {
                                            item.Teammembers.map((val) =>
                                            (
                                                val.Name.trim().slice(-6) === "(LEAD)" && <tr style={{ color: "orangered" }}>
                                                    <td >{val.Name}</td>
                                                    <td>{val.Registernumber}</td>
                                                    <td>{val.Branch}</td>
                                                    <td>{val.Section}</td>
                                                    <td>{val.Marks}</td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            item.Teammembers.map((val) =>
                                            (
                                                val.Name.trim().slice(-6) === "(LEAD)" ||<tr>
                                                    <td>{val.Name}</td>
                                                    <td>{val.Registernumber}</td>
                                                    <td>{val.Branch}</td>
                                                    <td>{val.Section}</td>
                                                    <td>{val.Marks}</td>
                                                </tr>
                                            ))
                                        }
                                    </>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}