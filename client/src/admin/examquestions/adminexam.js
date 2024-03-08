import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { NavBar } from "../../navbar/navbar";
import '../examquestions/adminexam.css';
import { Link } from "react-router-dom";
export const Adminexam = () => {
    const [ques, sques] = useState()
    const [data,sdata]=useState([])
    const [all,sall]=useState(true)
    const [ans, sans] = useState()
    const [ans1, sans1] = useState()
    const [ans2, sans2] = useState()
    const [ans3, sans3] = useState()
    const [ans4, sans4] = useState()
    const [load, sload] = useState(false)
    console.log()
    const Questions = async () => {
        sload(true)
        const theme = "Question and Answer";
        if (ques && ans) {
            await axios.post(`${process.env.REACT_APP_Server}/questions/`, { theme, ques, ans })
                .then((res) => {
                    if (res.data) {
                        alert("Question and Answer inserted")
                        sload(false)
                        window.location.reload(2)
                    }
                    else {
                        alert("Question already exist");
                    }
                })
                .catch((e) => console.log(e))
        }
        else {
            alert("Fill Question and Answer")
        }
    }
    const ChooseCorrect = async () => {
        sload(true)
        const theme = "Choose the correct answer"
        if (ques && ans) {
            await axios.post(`${process.env.REACT_APP_Server}/chooseanswer/`, { theme, ques, ans, ans1, ans2, ans3, ans4 })
                .then((res) => {
                    if (res.data) {
                        alert("Question and Answer inserted")
                        sload(false)
                        window.location.reload(2);
                    }
                    else {
                        alert("Question already exist");
                    }
                })
                .catch((e) => console.log(e))
        }
        else {
            alert("Fill Question and Answer")
        }
    }
    const Fillblank = async () => {
        sload(true)
        const theme = "fill in the blank"
        if (ques && ans) {
            await axios.post(`${process.env.REACT_APP_Server}/fillbank/`, { theme, ques, ans })
                .then((res) => {
                    if (res.data) {
                        alert("Question and Answer inserted")
                        sload(false)
                        window.location.reload(2)
                    }
                    else {
                        alert("Question already exist");
                    }
                })
                .catch((e) => console.log(e))
        }
        else {
            alert("Fill Question and Answer")
        }
    }
    const DeleteQues=async()=>
    {
        console.log(ans1,ques,ans)
        await axios.post(`${process.env.REACT_APP_Server}/deleteques/`, {ans1, ques, ans})
        .then((res)=>
        {
            if(res)
            {
                alert("Questions deleted");
                window.location.reload(3);
            }
        })
        .catch((e)=>console.log(e))
    }
    useEffect(()=>
    {
        axios.post(`${process.env.REACT_APP_Server}/examdata`)
            .then((res) => {
                sdata(res.data)
            })
            .catch((e) => console.log(e))
    },[])
    return (
        <>
            <NavBar />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table1">
                <thead>
                        <th colSpan={2}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Link onClick={()=>{sall(false)}} onDoubleClick={()=>sall(true)} style={{backgroundColor:'green',color:'white',padding:'0.5% 2%',textDecoration:'none',borderRadius:'4px'}}><b>All Questions</b></Link>
                            </div>
                        </th>
                    </thead>


                    {
                        data.map((item) =>
                        (
                            all && <>
                                <thead>
                                    <th colSpan={5}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <label><b>{item.Theme}</b></label>
                                        </div>
                                    </th>
                                </thead>
                                <tbody>
                                    {
                                        item.List.map((val, index) =>
                                        (
                                            <>
                                                <tr>
                                                    <td className="tdquestion"><b>Question {index + 1}</b></td>
                                                    <td colSpan={5}>{val.Question}<Button onClick={DeleteQues} onClickCapture={()=>{sans1(item.Theme);sques(val.Question);sans(index)}} style={{backgroundColor:'red'}}>X</Button></td>
                                                </tr>
                                                {
                                                    val.Answer1 &&
                                                    <>
                                                        <tr>
                                                            <td><input id={val.Answer1} name="same" type="radio" value={val.Answer1} onChange={(e) => sans(e.target.value)} /></td>
                                                            <td colSpan={5}><label for={val.Answer1}>{val.Answer1}</label></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input id={val.Answer2} name="same" type="radio" value={val.Answer2} onChange={(e) => sans(e.target.value)} /></td>
                                                            <td colSpan={5}><label for={val.Answer2}>{val.Answer2}</label></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input id={val.Answer3} name="same" type="radio" value={val.Answer3} onChange={(e) => sans(e.target.value)} /></td>
                                                            <td colSpan={5}><label for={val.Answer3}>{val.Answer3}</label></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input id={val.Answer4} name="same" type="radio" value={val.Answer4} onChange={(e) => sans(e.target.value)} /></td>
                                                            <td colSpan={5}><label for={val.Answer4}>{val.Answer4}</label></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Correct Answer</td>
                                                            <td>{val.Answer}</td>
                                                        </tr>
                                                    </>
                                                }
                                            </>
                                        ))
                                    }
                                </tbody>
                                
                            </>
                        ))
                    }

                    <br/><br/>
                    <thead>
                        <th colSpan={2}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <label><b>Question And Answer</b></label>
                            </div>
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tdquestion"><b>Question</b></td>
                            <td><textarea type="text" onChange={(e) => sques(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><b>Answer</b></td>
                            <td><textarea type="text" onChange={(e) => sans(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button id="Question" onClick={Questions}>{load ? "Submitting..." : "Submit"}</Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <br /><br /><br /><br />
                    <thead>
                        <th colSpan={2}><label><b>Choose The Correct Answer</b></label></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Question</b></td>
                            <td><textarea type="text" onChange={(e) => sques(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label><b>Answer1</b></label></td>
                            <td><textarea type="text" onChange={(e) => sans1(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label><b>Answer2</b></label></td>
                            <td><textarea type="text" onChange={(e) => sans2(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label><b>Answer3</b></label></td>
                            <td><textarea type="text" onChange={(e) => sans3(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label><b>Answer4</b></label></td>
                            <td><textarea type="text" onChange={(e) => sans4(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><b>Correct Answer</b></td>
                            <td>
                                <select onChange={(e) => sans(e.target.value)}>
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
                                    <Button id={"chooseanswer"} onClick={ChooseCorrect}>{load ? "Submitting..." : "Submit"}</Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <br /><br /><br /><br />


                    <thead>
                        <th colSpan={2}><label><b>Fill In The Bank</b></label></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Question</b></td>
                            <td><textarea type="text" onChange={(e) => sques(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><b>Answer</b></td>
                            <td>
                                <input onChange={(e) => sans(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button id="Fillblank" onClick={Fillblank}>{load ? "Submitting..." : "Submit"}</Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
