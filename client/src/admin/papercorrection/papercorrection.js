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
        await axios.post("http://localhost:9899/correctionanswer/"+ans1.item.Registernumber+"/"+ans1.val.Question+"/"+mark)
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
    // console.log(mark)
    const Paperdone=async()=>
    {
        // const btn=document.getElementById(ans);
        // btn.innerHTML="Please wait";
        // await axios.post("http://localhost:9899/papercorrection/"+ans.toUpperCase()+"/"+mark)
        // .then((res) =>
        // {
        //     console.log(res)
        //     if(res)
        //     {
        //         btn.innerHTML="Thank you for correction"
        //     }
        //     else
        //     {
        //         btn.innerHTML="Try again"
        //     }
        // })
        // .catch((e) => btn.innerHTML="Network error Try again")
    }
    useEffect(()=>
    {
        axios.post("http://localhost:9899/paperdata")
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
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        {/* <Button onClick={Submit} onClickCapture={()=>sans1({val,index})}>Submit</Button> */}
                                                        <Button id={item.Registernumber+index} style={{backgroundColor:'green',margin:'0 10%'}} onClick={Right} onClickCapture={()=>{sans1({val,item});sans(item.Registernumber+index)}}>{load?"Please wait":"Correct"}</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>:<b/>
                                    ))
                                }
                            </tbody>
                            {/* <tr>
                                <td colSpan={2}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button id={item.Registernumber} style={{ backgroundColor: 'yellow',color:'blue' }} onClick={Paperdone} onClickCapture={()=>sans(item.Registernumber)}>Done {item.Registernumber.toUpperCase()} Paper</Button>
                                    </div>
                                </td>
                            </tr> */}
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