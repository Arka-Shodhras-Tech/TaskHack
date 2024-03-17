import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavBar } from "../../navbar/navbar";
export const PaperCorrection=()=>
{
    const [data, sdata] = useState([])
    const[load,sload]=useState(false)
    const [ans, sans] = useState()
    const [ans1, sans1] = useState()
    const [mark, smark] = useState(1)
    const Right=async()=>
    {
        const button=document.getElementById(ans);
        button.innerHTML="Correcting..."
        await axios.post(`${process.env.REACT_APP_Server}/correctionanswer/`,{regd:ans1.item.Registernumber,question:ans1.val.Question,mark})
        .then((res)=>
        {
            if(res)
            {
                button.disabled=true;
                button.innerHTML="Correction done";
            }
            else
            {
                button.innerHTML="Try again";
            }
        })
        .catch((e)=>console.log(e))
    }
    const Wrong=async()=>
    {
        const button=document.getElementById(ans);
        button.innerHTML="wrong answer..."
        await axios.post(`${process.env.REACT_APP_Server}/wronganswer/`,{regd:ans1.item.Registernumber,question:ans1.val.Question})
        .then((res)=>
        {
            if(res)
            {
                button.disabled=true;
                button.innerHTML="Wrong";
            }
            else
            {
                button.innerHTML="Try again";
            }
        })
        .catch((e)=>console.log(e))
    }
    useEffect(()=>
    {
        axios.post(`${process.env.REACT_APP_Server}/paperdata`)
            .then((res) => {
                sdata(res.data)
            })
            .catch((e) => console.log(e))
            
    },)
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
                                        <label><b>{item.Registernumber.toUpperCase()}</b></label>
                                    </div>
                                </th>
                            </thead>
                            <tbody>
                                {
                                    item.Paper.map((val,index)=>
                                    (
                                        !val.Correction?
                                        <>
                                            <tr>
                                                <td className="tdquestion"><b>Question</b></td>
                                                <td>{val.Question?val.Question:<b/>}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Correct Answer</b></td>
                                                <td><b>{val.CorrectAnswer?val.CorrectAnswer:<b/>}</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Entered Answer</b></td>
                                                <td><b>{val.EnterAnswer?val.EnterAnswer:<b/>}</b></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div style={{ display:'flex', justifyContent: 'center' }}>
                                                        <Button id={item.Registernumber+index+1} onClick={Wrong} style={{backgroundColor:'red',margin:'0 10%'}} onClickCapture={()=>{sans1({val,item});sans(item.Registernumber+index+1)}}>Wrong</Button>
                                                        <Button id={item.Registernumber+index+2} style={{backgroundColor:'green',margin:'0 10%'}} onClick={Right} onClickCapture={()=>{sans1({val,item});sans(item.Registernumber+index+2)}}>{load?"Please wait":"Correct"}</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>:<b/>
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
