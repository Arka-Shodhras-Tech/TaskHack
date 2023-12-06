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
        await axios.post("https://chemdept.onrender.com/correctionanswer/"+ans1.item.Registernumber+"/"+ans1.val.Question+"/"+mark)
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
        await axios.post("https://chemdept.onrender.com/wronganswer/"+ans1.item.Registernumber+"/"+ans1.val.Question+"/"+mark)
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
        axios.post("https://chemdept.onrender.com/paperdata")
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
                                                    <div style={{ display:'flex', justifyContent: 'center' }}>
                                                        <Button id={item.Registernumber+index} onClick={Wrong} style={{backgroundColor:'red',margin:'0 10%'}} onClickCapture={()=>{sans1({val,item});sans(item.Registernumber+index)}}>Wrong</Button>
                                                        <Button id={item.Registernumber+index} style={{backgroundColor:'green',margin:'0 10%'}} onClick={Right} onClickCapture={()=>{sans1({val,item});sans(item.Registernumber+index)}}>{load?"Please wait":"Correct"}</Button>
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