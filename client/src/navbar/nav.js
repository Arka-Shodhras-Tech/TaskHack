import React from "react";
import image from "../app/srkrlogo.png"
export const Nav=()=>
{
    return(
        <>
        <div className="deptname" style={{display:'flex',justifyContent:"center"}}>
            <img src={image} className="srkrlogo"/>
            <h1 className="clgdept">DEPARTMENT OF CHEMISTRY</h1>
        </div>
        </>
    )
}