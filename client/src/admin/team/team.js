import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { NavBar } from "../../navbar/navbar";
import "../team/team.css";
export const Team = () =>
{
  const[data,sdata]=useState([]);
  const [regd, sregd] = useState()
  const[teamname,steamname]=useState()
  const[btns,sbtns]=useState()
  const Accept=async()=>
  {
    const btn=document.getElementById(btns);
    btn.innerHTML="Accepting...."
    await axios.post("http://localhost:9899/acceptrequest/"+regd.index+"/"+regd.val.Registernumber)
    .then((res)=>
    {
      if(res.data)
      {
        btn.innerHTML="Accepted";
      }
      else
      {
        btn.innerHTML="Try again"
      }
    })
    .catch((e)=>console.log(e))
  }
  useEffect(()=>
  {
    axios.post("http://localhost:9899/studentdata")
    .then((res)=>
    {
      sdata(res.data)
    })
    .catch((e)=>console.log(e))
  })
  return (
    <>
    <NavBar/>
    <div className="container team-container">
            <input className="my-dropdown1" placeholder="Enter Team Name" onChange={(e) =>steamname(e.target.value.toUpperCase())}/>
            <div style={{display:'flex',justifyContent:"center"}}><h3>OR</h3></div>
            <select className="my-dropdown" onChange={(e) => steamname(e.target.value)}>
              <option>Select Your Team</option>
              {data.map((val) =>
              (
                <option>{val.Teamname}</option>
              ))}
            </select>
        <table className="table table-striped border">
            {
              data.map((item)=>
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
                        {val.Request?
                          <button id={val.Registernumber} type="button" className="btn btn-success" onClick={Accept} onClickCapture={()=>{sregd({val,index});sbtns(val.Registernumber)}}>{val.Confirm?"Permission Given":"Accept"}</button>:<b/>
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
    </>
  );
}
