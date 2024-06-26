import axios from "axios";
import React, { useState } from "react";
import '../login/login.css';
export const Login =()=>
{
  const[regd,sregd]=useState()
  const[load,sload]=useState(false)
  const Login=async()=>
  {
    sload(true)
    await axios.post(`${process.env.REACT_APP_Server}/verifyregister/`+regd)
    .then((res)=>
    {
      if(res.data)
      {
        sessionStorage.student=regd;
        sload(false)
        window.location='192.5264.27';
      }
      else
      {
        alert("No data found")
      }
    })
    .catch((e)=>console.log(e))
  }
    return(
    <>
    <div className=" login-container" style={{display:'flex',justifyContent:'center '}}>
    <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" placeholder="Enter register number" fdprocessedid="yohq1" onChange={(e)=>{sregd(e.target.value.toUpperCase())}}/>
          <label htmlFor="floatingInput">Enter register number</label>
        </div>
        <hr className="my-2" />
        <div className="btndiv">
        <button className=" btn btn-lg btn-success " fdprocessedid="ft8f" onClick={Login}>{!load?"Login":"Loading..."}</button>
        </div>
      </div>
      </div>
    </>
    );
}