import React from "react";
import { NavBar } from "../../navbar/navbar";
import { useState,useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
export const PaperCorrection=()=>
{
    const [data, sdata] = useState([])
    const [ans, sans] = useState()
    const [ans1, sans1] = useState()
    useEffect(()=>
    {
        axios.post("http://localhost:8000/paperdata")
            .then((res) => {
                sdata(res.data)
            })
            .catch((e) => console.log(e))
            
    })
    return(
        <>
        <NavBar/>
        <div className="container">
        <div style={{display:'flex',justifyContent:'center'}}>
            <table className="table1">
                {
                    data.map((item)=>
                    (
                        <>
                            <thead>
                                <th colSpan={2}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <label><b>{item.Registernumber}</b></label>
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                {
                                    item.Paper.map((val,index)=>
                                    (
                                        <>
                                            <tr>
                                                <td className="tdquestion"><b>Question</b></td>
                                                <td>{val.Question}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Correct Answer</b></td>
                                                <td><b>{val.CorrectAnswer}</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Entered Answer</b></td>
                                                <td><b>{val.EnterAnswer}</b></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        {/* <Button onClick={Submit} onClickCapture={()=>sans1({val,index})}>Submit</Button> */}
                                                        <Button style={{backgroundColor:'green',margin:'0 10%'}}>Correct</Button>
                                                        <Button style={{backgroundColor:'red',margin:'0 10%'}}>Wrong</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                            <br/><br/><br/><br/>
                        </>
                    ))
                }
            </table>
        </div>
        </div>
        </>
    )
}