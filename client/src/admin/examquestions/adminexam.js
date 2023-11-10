import axios from "axios";
import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { NavBar } from "../../navbar/navbar";
import '../examquestions/adminexam.css';
export const Adminexam=()=>
{
    const[ques,sques]=useState()
    const[ans,sans]=useState()
    const[ans1,sans1]=useState()
    const[ans2,sans2]=useState()
    const[ans3,sans3]=useState()
    const[ans4,sans4]=useState()
    const[load,sload]=useState(false)
    console.log()
    const Questions=async()=>
    {
        sload(true)
        const theme="Question and Answer";
        if(ques && ans)
        {
            await axios.post("https://chemdept.onrender.com/questions/"+theme+"/"+ques+"/"+ans)
            .then((res)=>
            {
                if(res.data)
                {
                    alert("Question and Answer inserted")
                    sload(false)
                }
                else
                {
                    alert("Question already exist");
                }
            })
            .catch((e)=>console.log(e))
        }
        else
        {
            alert("Fill Question and Answer")
        }
    }
    const ChooseCorrect=async()=>
    {
        sload(true)
        const theme="Choose the correct answer"
        if(ques && ans)
        {
            await axios.post("https://chemdept.onrender.com/chooseanswer/"+theme+"/"+ques+"/"+ans+"/"+ans1+"/"+ans2+"/"+ans3+"/"+ans4)
            .then((res)=>
            {
                if(res.data)
                {
                    alert("Question and Answer inserted")
                    sload(false)
                }
                else
                {
                    alert("Question already exist");
                }
            })
            .catch((e)=>console.log(e))
        }
        else
        {
            alert("Fill Question and Answer")
        }
    }
    const Fillblank=async()=>
    {
        sload(true)
        const theme="fill in the blank"
        if(ques && ans)
        {
            await axios.post("https://chemdept.onrender.com/fillbank/"+theme+"/"+ques+"/"+ans)
            .then((res)=>
            {
                if(res.data)
                {
                    alert("Question and Answer inserted")
                    sload(false)
                }
                else
                {
                    alert("Question already exist");
                }
            })
            .catch((e)=>console.log(e))
        }
        else
        {
            alert("Fill Question and Answer")
        }
    }
    return(
        <>
        <NavBar/>
        <div style={{display:'flex',justifyContent:'center'}}>
            <table className="table1">
                <thead>
                    <th colSpan={2}>
                        <div style={{display:'flex',justifyContent:'center'}}>
                        <label><b>Question And Answer</b></label>
                        </div>
                    </th>
                </thead>
                <tbody>
                    <tr>
                    <td className="tdquestion"><b>Question</b></td>
                    <td><textarea type="text" onChange={(e)=>sques(e.target.value)}/></td>
                    </tr>
                    <tr>
                    <td><b>Answer</b></td>
                    <td><textarea type="text" onChange={(e)=>sans(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button id="Question" onClick={Questions}>{load?"Submitting...":"Submit"}</Button>
                                </div>
                        </td>
                    </tr>
                </tbody>
                <br/><br/><br/><br/>
                <thead>
                <th colSpan={2}><label><b>Choose The Correct Answer</b></label></th>
                </thead>
                <tbody>
                    <tr>
                    <td><b>Question</b></td>
                    <td><textarea type="text" onChange={(e)=>sques(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><label><b>Answer1</b></label></td>
                        <td><textarea type="text" onChange={(e)=>sans1(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><label><b>Answer2</b></label></td>
                        <td><textarea type="text" onChange={(e)=>sans2(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><label><b>Answer3</b></label></td>
                        <td><textarea type="text" onChange={(e)=>sans3(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td><label><b>Answer4</b></label></td>
                        <td><textarea type="text" onChange={(e)=>sans4(e.target.value)}/></td>
                    </tr>
                    <tr>
                    <td><b>Correct Answer</b></td>
                    <td>
                        <select onChange={(e)=>sans(e.target.value)}>
                            <option>Choose Answer</option>
                            <option value={ans}><p>{ans1}</p></option>
                            <option>{ans2}</option>
                            <option>{ans3}</option>
                            <option>{ans4}</option>
                        </select>
                    </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button id={"chooseanswer"} onClick={ChooseCorrect}>{load?"Submitting...":"Submit"}</Button>
                                </div>
                        </td>
                    </tr>
                </tbody>
                <br/><br/><br/><br/>

                
                <thead>
                <th colSpan={2}><label><b>Fill In The Bank</b></label></th>
                </thead>
                <tbody>
                    <tr>
                    <td><b>Question</b></td>
                    <td><textarea type="text" onChange={(e)=>sques(e.target.value)}/></td>
                    </tr>
                    <tr>
                    <td><b>Answer</b></td>
                    <td>
                        <input onChange={(e)=>sans(e.target.value)}/>
                    </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button id="Fillblank" onClick={Fillblank}>{load?"Submitting...":"Submit"}</Button>
                                </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}