import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
export const Exam = () => {
    const [data, sdata] = useState([])
    const [data1, sdata1] = useState([]);
    const [data2, sdata2] = useState([]);
    const [data3, sdata3] = useState([]);
    const [teamname, steamname] = useState()
    const [regd, sregd] = useState()
    const [ques, sques] = useState(false)
    const [blank, sblank] = useState(false)
    const [choose, schoose] = useState(false)
    const [ans, sans] = useState()
    const [ans1, sans1] = useState()
    const [marks, smarks] = useState(0)
    const [btns, sbtns] = useState()
    const [i, si] = useState(0)
    const [j, sj] = useState(0);
    const [load, sload] = useState(false)
    const [all, sall] = useState(true)
    const [nques, snques] = useState()
    const buttonref = useRef(null);
    const Request = async () => {
        const btn = document.getElementById(btns);
        btn.innerHTML = "Please wait...."
        await axios.post(`${process.env.REACT_APP_Server}/request/` + regd.index + "/" + regd.val.Registernumber)
            .then((res) => {
                if (res.data) {
                    btn.innerHTML = "Request sent";
                }
                else {
                    btn.innerHTML = "Request failed try again";
                }
            })
            .catch((e) => console.log(e))
    }
    const Submit = async () => {
        sload(true)
        if (ans) {
            let student = sessionStorage.student;
            let index = i;
            let question = ans1.val.Question;
            let answer = ans1.val.Answer;
            await axios.post(`${process.env.REACT_APP_Server}/exam/`, { student, index, question, answer, ans })
                .then((res) => {
                    if (res.data) {
                        si(i + 1)
                        sans('')
                        sload(false)
                    }
                    else {
                        alert("Try again")
                    }
                })
                .catch((e) => console.log(e))
        }
        else {
            alert("Enter answer and submit");
        }
    }
    const Choosesubmit = async () => {
        if (ans && ans1) {
            if (ans1.val.Answer === ans) {
                smarks(marks + 1);
            }
            si(i + 1)
            sj(j + 1);
            sans('')
        }
        else {
            alert("Choose one option")
        }
    }
    const Submitexam = async () => {
        document.getElementById(ans1.index).innerHTML = "Please wait";
        await axios.post(`${process.env.REACT_APP_Server}/sumitexam/` + ans1.index + "/" + ans1.val.Registernumber + "/" + marks)
            .then((res) => {
                if (res.data) {
                    document.getElementById(ans1.index).innerHTML = "Submitted exam";
                    sessionStorage.removeItem("student");
                    window.location.reload(5)
                }
                else {
                    document.getElementById(ans1.index).innerHTML = "please again submit";
                }
            })
            .catch((e) => document.getElementById(ans1.index).innerHTML = "Network Error")
    }

    useEffect(() => {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                try {
                    buttonref.current.click();
                    alert("Exam Submitted Sucessfully");
                }
                catch (e) {
                    console.log(e)
                }
            }
            else { }
        });
        axios.post(`${process.env.REACT_APP_Server}/paperdata`)
            .then((res) => {
                sdata2(res.data)
                data2.map((item) => item.Registernumber === sessionStorage.student ? snques(item.Paper.length) : snques(0))
                data2.map((item) => item.Registernumber === sessionStorage.student ? sdata3(item.Paper) : sdata3(0))
            })
            .catch((e) => console.log(e))
    })
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_Server}/studentdata`)
            .then((res) => {
                sdata1(res.data)
            })
            .catch((e) => console.log(e))
        axios.post(`${process.env.REACT_APP_Server}/examdata`)
            .then((res) => {
                sdata(res.data)
            })
            .catch((e) => console.log(e))
    }, [])
    return (
        <>
            <div className="container team-container">
                <input className="my-dropdown1" placeholder="Enter Team Name" onChange={(e) => steamname(e.target.value.toUpperCase())} />
                <div style={{ display: 'flex', justifyContent: "center" }}><h3>OR</h3></div>
                <select className="my-dropdown" onChange={(e) => steamname(e.target.value)}>
                    <option>Select Your Team</option>
                    {data1.map((val) =>
                    (
                        <option>{val.Teamname}</option>
                    ))}
                </select>
                <table className="table table-striped border">
                    {
                        data1.map((item) =>
                        (
                            item.Teamname === teamname ?
                                <>
                                    <thead>
                                        <tr>
                                            <th colSpan="4" className="text-center">Team Name:{item.Teamname}</th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-center">S.NO</th>
                                            <th scope="col" className="text-center">Students</th>
                                            <th scope="col" className="text-center">Confirm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.Teammembers.map((val, index) =>
                                            (
                                                <tr>
                                                    <th scope="row" className="text-center">{index + 1}</th>
                                                    <td className="text-center">{val.Name}</td>
                                                    <td className="text-center">{val.Registernumber}</td>
                                                    <td className="text-center">
                                                        {
                                                            val.Confirm ?
                                                                <button id={val.Registernumber} type="button" className="btn btn-success" >Accepted</button> :
                                                                <button id={val.Registernumber} type="button" className="btn btn-success" onClick={Request} onClickCapture={() => { sregd({ val, index }); sbtns(val.Registernumber) }}>{val.Confirm ? "Accepted" : "Request"}</button>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </> : <b />

                        ))
                    }
                </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
                <p><b>Note:</b>Submit your exam then your paper go to under verifaction, otherwise your lost your score</p>
            </div>
            <div className="container">
                <div className="container team-container">
                    <table className="table table-striped border">
                        <thead>
                            <tr>
                                <td className="text-center">
                                    <Link className="qtn-btns" id="ques" onClick={() => { sques(true); schoose(false); sblank(false); si(0); sall(false) }}>Questions</Link>
                                </td>
                                <td className="text-center">
                                    <Link className="qtn-btns2" id="choose" onClick={() => { sques(false); schoose(true); sblank(false); si(0); sall(false) }}>Choose the correct Answers</Link>
                                </td>
                                <td className="text-center">
                                    <Link className="qtn-btns1" id="blank" onClick={() => { sques(false); schoose(false); sblank(true); si(0); sall(false) }}>Fill in the blanks</Link>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        data1.map((item) =>
                        (
                            item.Teammembers.map((val, index) =>
                            (
                                val.Registernumber === sessionStorage.student && val.Confirm ?
                                    <table className="table1">

                                        <thead >
                                            <tr >
                                                <th>{val.Registernumber}</th>
                                                <th>{val.Name}</th>
                                                <th>{val.Branch}</th>
                                                <th>{val.Section}</th>
                                                <th>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Button id={index} ref={buttonref} style={{ background: "orange" }} onClick={Submitexam} onClickCapture={() => { sans1({ val, index }); sbtns(item.Theme) }}>{nques + j + " Questions Submit"}</Button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>


                                        {/* Fill in the blanks */}
                                        {
                                            data.map((item) =>
                                            (
                                                item.Theme === "fill in the blank" && blank && <>
                                                    <thead>
                                                        <th colSpan={5}>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <label><b>{item.Theme}</b></label>
                                                            </div>
                                                        </th>
                                                    </thead>
                                                    <tbody>
                                                        {item.Theme === "fill in the blank" &&
                                                            <>
                                                                <tr>
                                                                    <td className="tdquestion"><b>Question {i+1}</b></td>
                                                                    <td colSpan={5}>{item.List[i]?.Question}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Answer</b></td>
                                                                    <td colSpan={5}><textarea type="text" value={ans || data3.filter(val=>val.Question.includes(item.List[i].Question)).map((val1)=>val1.EnterAnswer)} style={{ border: 'none', borderBottom: 'black solid 2px', background: 'none' }} onChange={(e) => sans(e.target.value)} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={5}>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                            <Button onClick={() => { si(i - 1); i === -0 ? document.getElementById("ques").click() : sblank(true) }}>Previous</Button>
                                                                            <Button id={item.Theme} onClick={Submit} onClickCapture={() => { sans1({ val: item.List[i], index: i }); sbtns(item.Theme);item.List.length - 1 ? document.getElementById("choose").click() : sblank(true) }}>{load ? "submitting..." : "Submit"}</Button>
                                                                            <Button onClick={() => { si(i + 1); i === item.List.length - 1 ? document.getElementById("choose").click() : sblank(true) }}>Next</Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <br />
                                                                <br />
                                                            </>
                                                        }
                                                    </tbody>

                                                </>
                                            ))
                                        }



                                        {/* choose the correct answers */}
                                        {
                                            data.map((item) =>
                                            (
                                                item.Theme === "Choose the correct answer" && choose &&
                                                <>
                                                    <thead>
                                                        <th colSpan={5}>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <label><b>{item.Theme}</b></label>
                                                            </div>
                                                        </th>
                                                    </thead>
                                                    <tr>
                                                        <td className="tdquestion"><b>Question {i+1}</b></td>
                                                        <td colSpan={5}>{item.List[i]?.Question}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><input id={item.List[i]?.Answer1} name={item.List[i]?.Question} type="radio" value={item.List[i]?.Answer1} onClick={(e) => sans(e.target.value)} /></td>
                                                        <td colSpan={5}><label for={item.List[i]?.Answer1}>{item.List[i]?.Answer1}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input id={item.List[i]?.Answer2} name={item.List[i]?.Question} type="radio" value={item.List[i]?.Answer2} onClick={(e) => sans(e.target.value)} /></td>
                                                        <td colSpan={5}><label for={item.List[i]?.Answer2}>{item.List[i]?.Answer2}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input id={item.List[i]?.Answer3} name={item.List[i]?.Question} type="radio" value={item.List[i]?.Answer3} onClick={(e) => sans(e.target.value)} /></td>
                                                        <td colSpan={5}><label for={item.List[i]?.Answer3}>{item.List[i]?.Answer3}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input id={item.List[i]?.Answer4} name={item.List[i]?.Question} type="radio" value={item.List[i]?.Answer4} onClick={(e) => sans(e.target.value)} /></td>
                                                        <td colSpan={5}><label for={item.List[i]?.Answer4}>{item.List[i]?.Answer4}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={5}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                <Button onClick={() => { si(i - 1); i === -0 ? document.getElementById("blank").click() : schoose(true) }}>Previous</Button>
                                                                <Button id={item.Theme + i} onClick={Choosesubmit} onClickCapture={() => { sans1({ val: item.List[i], index: i }); sbtns(item.Theme + i);i === item.List.length - 1 ? document.getElementById("ques").click() : schoose(true) }}>{load ? "submitting..." : "Submit"}</Button>
                                                                <Button onClick={() => { si(i + 1); i === item.List.length - 1 ? document.getElementById("ques").click() : schoose(true) }}>Next</Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <br /><br />
                                                </>
                                            ))
                                        }


                                        {/* Questionn and answers */}
                                        {
                                            data.map((item) =>
                                            (
                                                item.Theme === "Question and Answer" && ques && <>
                                                    <thead>
                                                        <th colSpan={5}>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <label><b>{item.Theme}</b></label>
                                                            </div>
                                                        </th>
                                                    </thead>
                                                    <tbody>
                                                        {item.Theme === "Question and Answer" &&
                                                            <>
                                                            <tr>
                                                                <td className="tdquestion"><b>Question {i + 1} </b></td>
                                                                <td colSpan={5}>{item.List[i]?.Question}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Answer</b></td>
                                                                <td colSpan={5}><textarea type="text" value={ans || data3.filter(val=>val.Question.includes(item.List[i].Question)).map((val1)=>val1.EnterAnswer)} style={{ border: 'none', borderBottom: 'black solid 2px', background: 'none' }} onChange={(e) => sans(e.target.value)} /></td>
                                                            </tr>
                                                                <tr>
                                                                    <td colSpan={5}>
                                                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                            <Button onClick={() => { si(i - 1); i === -0 ? document.getElementById("choose").click() : sques(true) }}>Previous</Button>
                                                                            <Button id={item.List[i]} onClick={Submit} onClickCapture={() => { sans1({ val: item.List[i], index: i }); sbtns(item.List[i]);i === item.List.length - 1 ? document.getElementById("blank").click() : sques(true) }}>{load ? "submitting..." : "Submit"}</Button>
                                                                            <Button onClick={() => { si(i + 1); i === item.List.length - 1 ? document.getElementById("blank").click() : sques(true) }}>Next</Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <br />
                                                                <br />
                                                            </>
                                                        }
                                                    </tbody>
                                                </>
                                            ))
                                        }

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
                                                                        <td colSpan={5}>{val.Question}</td>
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
                                                                        </>
                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                    </tbody>
                                                </>
                                            ))
                                        }
                                    </table> : <b />
                            ))
                        ))
                    }
                </div>
            </div>
        </>
    );
}
