import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavBar } from "../../navbar/navbar";
import { Button } from "react-bootstrap";
export const Studentdata=()=>
{
    const[data,sdata]=useState([]);
    const[rmv,srmv]=useState();
    const Remove=async()=>
    {
        await axios.post("http://localhost:8000/remove",{rmv})
        .then((res)=>
        {
            if(res.data)
            {
                alert("Removed Sucessfully");
            }
            else
            {
                alert("Try again")
            }
        })
        .catch((e)=>console.log(e))
    }
    useEffect(()=>
  {
    axios.post("http://localhost:8000/studentdata")
    .then((res)=>
    {
      sdata(res.data)
      // console.log(data)
    })
    .catch((e)=>console.log(e))
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
                        <th>Phone Number</th>
                        <th colSpan={2}>Team</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            data.map((item) =>
                            (
                                    item.Teammembers.map((val,index) =>
                                    (
                                        <tr>
                                            <td>{val.Name}</td>
                                            <td>{val.Registernumber}</td>
                                            <td>{val.Branch}</td>
                                            <td>{val.Section}</td>
                                            <td>{val.Phonenumber}</td>
                                            <td>{item.Teamname}</td>
                                            <td>
                                            <Button style={{backgroundColor:'red'}} onClick={Remove} onClickCapture={()=>srmv({val,index,item})}>X</Button>
                                            </td>
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