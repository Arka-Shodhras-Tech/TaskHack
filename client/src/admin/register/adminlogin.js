
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { NavBar } from '../../navbar/navbar';
import "./register.css";
export const AdminLogin = ()=>
{
  const[name,sname]=useState()
  const[mail,smail]=useState()
  const[number,snumber]=useState()
  const[regd,sregd]=useState()
  const[sec,ssec]=useState()
  const[branch,sbranch]=useState()
  const[data,sdata]=useState([]);
  const[teamname,steamname]=useState()
  const[load,sload]=useState(false)
  const Login=async()=>
  {
    if(process.env.REACT_APP_id===`"${name}"`)
    {
      if(process.env.REACT_APP_Lock===`"${mail}"`)
      {
        sessionStorage.lock=true;
        window.location.reload(2);
      }
      else
      {
        alert("Password incorrect")
      }
    }
    else
    {
      alert("Id incorrect")
    }
  }
    return(
        <>
        <NavBar/>
        <div className="container register-container" >
          <div className="p- p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingInput" placeholder="Enter Id"  onChange={(e)=>sname(e.target.value)}/>
              <label htmlFor="floatingInput">Enter Id</label>
            </div>
            <div className=' form-floating d-flex justify-content-between mb-3 align-items-center'>
              <div className="form-floating  w-100">
                <input type="password" className="form-control" id="floatingInput" placeholder="Password" fdprocessedid="yohq1" onChange={(e)=>smail(e.target.value)}/>
                <label htmlFor="floatingInput">Enter Password</label>
              </div>
            </div>

            
            <div className="d-flex justify-content-between">
              <button className="w-100 btn btn-lg btn-primary" fdprocessedid="ft8f" onClick={Login}>{load?"Please Wait":"Login"}</button>
            </div>
          </div>
        </div>
        </>
    );
}