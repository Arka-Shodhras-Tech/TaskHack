import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
export const Exam = () =>
{
    const [data, sdata] = useState([])
    const [data1, sdata1] = useState([]);
    const [teamname, steamname] = useState()
    const [regd, sregd] = useState()
    const [ques, sques] = useState()
    const [ans, sans] = useState()
    const [ans1, sans1] = useState()
    const [marks, smarks] = useState(0)
    const [btns, sbtns] = useState()
    const [i, si] = useState(0)
    const[load,sload]=useState(false)
    var j;
    // console.log(sessionStorage.student)
    const Request=async()=>
  {
    const btn=document.getElementById(btns);
    btn.innerHTML="Please wait...."
    await axios.post("https://chemdept.onrender.com/request/"+regd.index+"/"+regd.val.Registernumber)
    .then((res)=>
    {
      if(res.data)
      {
        btn.innerHTML="Request sent";
      }
      else
      {
        btn.innerHTML="Request failed try again";
      }
    })
    .catch((e)=>console.log(e))
  }
    const Submit=async()=>
    {
        const btn=document.getElementById(btns);
        if(ans)
        {
            btn.innerHTML="Fill another answer";
        await axios.post("https://chemdept.onrender.com/exam/"+sessionStorage.student+"/"+ans1.index+"/"+ans1.val.Question+"/"+ans1.val.Answer+"/"+ans)
        .then((res)=>
        {
            if(res.data)
            {
                btn.innerHTML="Submitted/also update"
                sload(false)
            }
            else
            {
                alert("Try again")
            }
        })
        .catch((e)=>console.log(e))
        }
        else
        {
            alert("Enter answer and submit");
        }
    }
    const Choosesubmit=async()=>
    {
        if(ans && ans1)
        {
            if (ans1.val.Answer === ans)
            {
                smarks(marks + 1);
            }
            document.getElementById(btns).style.display = "none";
            sans()
        }
        else
        {
            alert("Choose one option")
        }
    }
    // console.log(marks)
    const Submitexam=async()=>
    {
        document.getElementById(ans1.index).innerHTML="Please wait";
        await axios.post("https://chemdept.onrender.com/sumitexam/"+ans1.index+"/"+ans1.val.Registernumber+"/"+marks)
        .then((res) =>
        {
            if(res.data)
            {
                document.getElementById(ans1.index).innerHTML="Submitted exam";
                sessionStorage.removeItem("student");
                window.location.reload(5)
            }
            else
            {
                document.getElementById(ans1.index).innerHTML="please again submit";
            }
        })
        .catch((e) => document.getElementById(ans1.index).innerHTML="Network Error")
    }

    useEffect(()=>
    {
        document.addEventListener("visibilitychange", ()=> {
            if (document.hidden)
            {
                axios.post("http://localhost:9899/submitexam1/"+sessionStorage.student)
                .then((res)=>
                {
                    if(res)
                    {
                        alert("Exam Submitted Sucessfully");
                    }
                })
                .catch((e)=>console.log(e))
            }
            else
            {}
        });
    },[1])
    useEffect(()=>
    {
        axios.post("https://chemdept.onrender.com/studentdata")
            .then((res) =>
            {
                sdata1(res.data)
            })
            .catch((e) => console.log(e))
        axios.post("https://chemdept.onrender.com/examdata")
            .then((res) => {
                sdata(res.data)
            })
            .catch((e) => console.log(e))
    })
    return(
        <>
        <div className="container team-container">
            <input className="my-dropdown1" placeholder="Enter Team Name" onChange={(e) =>steamname(e.target.value.toUpperCase())}/>
            <div style={{display:'flex',justifyContent:"center"}}><h3>OR</h3></div>
            <select className="my-dropdown" onChange={(e) => steamname(e.target.value)}>
              <option>Select Your Team</option>
              {data1.map((val) =>
              (
                <option>{val.Teamname}</option>
              ))}
            </select>
        <table className="table table-striped border">
            {
              data1.map((item)=>
              (
                item.Teamname===teamname?
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
                      item.Teammembers.map((val,index)=>
                      (
                      <tr>
                      <th scope="row" className="text-center">{index+1}</th>
                      <td className="text-center">{val.Name}</td>
                      <td className="text-center">{val.Registernumber}</td>
                      <td className="text-center">
                        {
                            val.Confirm?
                            <button id={val.Registernumber} type="button" className="btn btn-success" >Accepted</button>:
                            <button id={val.Registernumber} type="button" className="btn btn-success" onClick={Request} onClickCapture={()=>{sregd({val,index});sbtns(val.Registernumber)}}>{val.Confirm?"Accepted":"Request"}</button>
                        }
                      </td>
                    </tr>
                    ))
                    }
                    </tbody>
                  </>:<b/>
                  
                ))
            }
        </table>
        </div>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
                <p><b>Note:</b>Submit your exam then your paper go to under verifaction, otherwise your lost your score</p>
            </div>
        <div className="container">
        <div style={{display:'flex',justifyContent:'center'}}>
            {
                data1.map((item)=>
                (
                    item.Teammembers.map((val,index)=>
                    (
                        val.Registernumber===sessionStorage.student && val.Confirm?
                            <table className="table1">
                                <thead >
                                    <tr >
                                            <th>{val.Registernumber}</th>
                                            <th>{val.Name}</th>
                                            <th>{val.Branch}</th>
                                            <th>{val.Section}</th>
                                            <th>
                                                <div style={{display:'flex',justifyContent:'center'}}>
                                                <Button id="myButton" style={{background:"orange"}}onClick={Submitexam} onClickCapture={()=>{sans1({val,index});sbtns(item.Theme)}}>{"Submit Exam"}</Button>
                                                </div>
                                            </th>
                                        </tr>
                                </thead>
                                {
                                    data.map((item) =>
                                    (
                                        <>
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
                                                                <td className="tdquestion"><b>Question</b></td>
                                                                <td colSpan={5}>{val.Question}</td>
                                                            </tr>
                                                            {
                                                                val.Answer1?
                                                                <>
                                                                        <tr>
                                                                            <td><input id={val.Answer1} name="same" type="radio" value={val.Answer1} onChange={(e) => sans(e.target.value)}/></td>
                                                                            <td colSpan={5}><label for={val.Answer1}>{val.Answer1}</label></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><input id={val.Answer2} name="same" type="radio" value={val.Answer2} onChange={(e) => sans(e.target.value)}/></td>
                                                                            <td colSpan={5}><label for={val.Answer2}>{val.Answer2}</label></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><input id={val.Answer3} name="same" type="radio" value={val.Answer3} onChange={(e) => sans(e.target.value)}/></td>
                                                                            <td colSpan={5}><label for={val.Answer3}>{val.Answer3}</label></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td><input id={val.Answer4} name="same" type="radio" value={val.Answer4} onChange={(e) => sans(e.target.value)}/></td>
                                                                            <td colSpan={5}><label for={val.Answer4}>{val.Answer4}</label></td>
                                                                        </tr>
                                                                </>:<tr>
                                                                <td><b>Answer</b></td>
                                                                <td colSpan={5}><textarea type="text" style={{ border: 'none', borderBottom: 'black solid 2px', background: 'none' }} onChange={(e) => sans(e.target.value)} /></td>
                                                            </tr>
                                                            }
                                                            <tr>
                                                                <td colSpan={5}>
                                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                        {
                                                                            val.Answer1?<Button id={item.Theme+index} onClick={Choosesubmit} onClickCapture={()=>{sans1({val,index});sbtns(item.Theme+index)}}>{load ? "submitting..." : "Submit"}</Button>:<Button id={item.Theme+index} onClick={Submit} onClickCapture={()=>{sans1({val,index});sbtns(item.Theme+index)}}>{load ? "submitting..." : "Submit"}</Button>
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <br /><br />
                                                        </>
                                                    ))
                                                }
                                            </tbody>
                                            <br /><br /><br /><br />
                                        </>
                                    ))
                                }
                            </table> : <b/>
                    ))
                ))
            }
        </div>
        </div>
        </>
    );
}