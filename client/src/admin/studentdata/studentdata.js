import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavBar } from "../../navbar/navbar";
export const Studentdata=()=>
{
    const[data,sdata]=useState([]);
    const[rmv,srmv]=useState();
    const[load,sload]=useState();
    const Remove=async()=>
    {
        await axios.post(`${process.env.REACT_APP_Server}/remove`,{rmv})
        .then((res)=>
        {
            if(res.data)
            {
                alert("Removed Sucessfully");
                window.location.reload(3);
            }
            else
            {
                alert("Try again")
            }
        })
        .catch((e)=>console.log(e))
    }
    const DropTeam=async()=>
    {
            document.getElementById(rmv.data+rmv.index).style.display="block";
            document.getElementById(rmv.data).style.display="none"; 
        const x=setTimeout(async()=>
        {
            await axios.post(`${process.env.REACT_APP_Server}/droptable/`+rmv.data)
                .then((res) => {
                    if (res.data)
                    {
                        alert("Delete Team");
                        document.getElementById(rmv.data+rmv.index).style.display="none";
                        document.getElementById(rmv.data).style.display="block";
                        window.location.reload(3);
                    }
                    else {
                        alert("Try again")
                    }
                })
                .catch((e) => console.log(e))
        },2000)
        sload(x)
    }
    const StopDropTeam=()=>
    {
        if (load)
        {
            clearTimeout(load)
            document.getElementById(rmv.data+rmv.index).style.display="none";
            document.getElementById(rmv.data).style.display="block"; 
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
  },[])
    return(
        <>
        <NavBar/>
        <div>
            <table responsive className="table2">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Register Number</th>
                        <th>Branch</th>
                        <th>Section</th>
                        <th>Phone Number</th>
                        <th colSpan={2}>Team</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            data.map((item,index) =>
                            (
                                <>
                                <tr >
                                    <th colSpan={7} style={{backgroundColor:'skyblue',color:'blue'}}>
                                        <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
                                            <label><b>{item.Teamname.toUpperCase()}</b></label>
                                            <Button id={item.Teamname} style={{margin:'0 -40% 0 40%',backgroundColor:'orange'}} onClick={DropTeam} onClickCapture={()=>{srmv({data:(item.Teamname),index})}}>X</Button>
                                            <Button id={item.Teamname+index} style={{margin:'0 -40% 0 40%',backgroundColor:'yellow',color:'black',display:'none'}} onClick={StopDropTeam} onClickCapture={()=>{srmv({data:(item.Teamname),index})}}>UNDO</Button>
                                        </div>
                                    </th>
                                </tr>
                                <>
                                {
                                     item.Teammembers.map((val,index) =>
                                     (
                                         <tr>
                                             <td>{val.Name}</td>
                                             <td>{val.Registernumber}</td>
                                             <td>{val.Branch}</td>
                                             <td>{val.Section}</td>
                                             <td>{val.Phonenumber}</td>
                                             <td>{item.Teamname}</td>
                                             <td>
                                             <Button style={{backgroundColor:'red'}} onClick={Remove} onClickCapture={()=>srmv({val,index,item})}>X</Button>
                                             </td>
                                         </tr>
                                     ))
                                }
                                </>
                                </>
                            ))
                        }
                </tbody>
            </table>
        </div>
        </>
    )
}