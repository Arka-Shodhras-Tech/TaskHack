import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavBar } from "../../navbar/navbar";
export const Studentscore=()=>
{
    const [data, sdata] = useState([]);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_Server}/studentdata`)
            .then((res) => {
                sdata(res.data)
                // console.log(data)
            })
            .catch((e) => console.log(e))
    })
    return(
        <>
        <NavBar/>
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
                <tbody>
                        {
                            data.map((item) =>
                            (
                                    item.Teammembers.map((val) =>
                                    (
                                        <tr>
                                            <td>{val.Name}</td>
                                            <td>{val.Registernumber}</td>
                                            <td>{val.Branch}</td>
                                            <td>{val.Section}</td>
                                            <td>{val.Marks}</td>
                                        </tr>
                                    ))
                            ))
                        }
                </tbody>
            </table>
        </div>
        </>
    )
}