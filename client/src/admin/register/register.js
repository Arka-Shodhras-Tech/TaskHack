import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { NavBar } from '../../navbar/navbar';
import "./register.css";
export const Register = ()=>
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
  const Registers=async()=>
  {
    if(name && mail && number && regd && branch && sec && teamname)
    {
      sload(true)
      await axios.post(`${process.env.REACT_APP_Server}/verifyregister/`+regd)
      .then(async(res)=>
      {
        console.log(res)
        if(res.data)
        {
          alert("Already register")
          sload(false)
          window.location.reload(5);
        }
        else
        {
          await axios.post(`${process.env.REACT_APP_Server}/studentregister/` + name + "/" + mail + "/" + number + "/" + regd + "/" + branch + "/" + sec + "/" + teamname)
            .then((res) => {
              if (res.data) {
                alert("Register Sucessfully");
                window.location.reload(5);
              }
              else {
                alert("Try again");
              }
            })
          console.log(name, mail, number, regd, branch, sec, teamname)
        }
      })
    }
    else
    {
      alert("Fill all details")
    }
  }
  useEffect(()=>
  {
    axios.post(`${process.env.REACT_APP_Server}/studentdata`)
    .then((res)=>
    {
      sdata(res.data)
      // console.log(data)
    })
    .catch((e)=>console.log(e))
  })
    return(
        <>
        <NavBar/>
        <div className="container register-container">
          <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="Enter your first name"  onChange={(e)=>sname(e.target.value.toUpperCase())}/>
              <label htmlFor="floatingInput">Full Name</label>
            </div>
            <div className=' form-floating d-flex justify-content-between mb-3 align-items-center'>
              <div className="form-floating  w-100">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" fdprocessedid="yohq1" onChange={(e)=>smail(e.target.value)}/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              {/* <div className='w-25 text-center'>
                <button type="button" class="btn btn-primary  verify-button" >Verfiy</button>
              </div> */}
            </div>

            <div className=' form-floating mb-3'>
              <input type="text" className="form-control" id="floatingInput" placeholder="Enter your phone number" fdprocessedid="yohq1" onChange={(e)=>snumber(e.target.value.toUpperCase())}/>
              <label htmlFor="floatingInput">Phone Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="Enter your registration number" fdprocessedid="fname1" onChange={(e)=>sregd(e.target.value.toUpperCase())}/>
              <label htmlFor="floatingInput">Registration number</label>
            </div>
            <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingPassword" placeholder="Branch" onChange={(e)=>sbranch(e.target.value.toUpperCase())} />
          <label htmlFor="floatingPassword">Branch</label>
        </div>
            <div className="form-floating mb-3">
              <select className="form-control " id="inputGroupSelect01" onChange={(e)=>ssec(e.target.value)}>
                <option >Select your section...</option>
                <option value={"A"}>A</option>
                <option value={"B"}>B</option>
                <option value={"C"}>C</option>
                <option value={"D"}>D</option>
                <option value={"E"}>E</option>
              </select>
              <label htmlFor="floatingInput">Section</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingPassword" placeholder="Team Name" onChange={(e)=>steamname(e.target.value.toUpperCase())}/>
              <label htmlFor="floatingPassword">Team Name</label>
            </div>
            <h6 style={{display:'flex',justifyContent:'center'}}>OR</h6>
            <div className="form-floating mb-3">
              <select type="text" className="form-control" id="floatingPassword" placeholder="Team Name" onChange={(e)=>steamname(e.target.value.toUpperCase())}>
                <option>Select Your Team</option>
                {
                  data.map((val)=>
                  (
                    <option val={val.Teamname}>{val.Teamname}</option>
                  ))
                }
              </select>
              <label htmlFor="floatingPassword">Team Name</label>
            </div>
            <hr className="my-2" />
            <div className="d-flex justify-content-between">
              <button className="w-100 btn btn-lg btn-primary" fdprocessedid="ft8f" onClick={Registers}>{load?"Please Wait":"Register"}</button>
            </div>
          </div>
        </div>
        </>
    );
}