import React from "react";
import image from "../app/srkrlogo.png";
export const Nav=()=>
{
    return(
        <>
        <div className="deptname" style={{display:'flex',justifyContent:"center"}}>
            <img src={image} className="srkrlogo" alt="logo"/>
            <h1 className="clgdept">AST CLUB EXAMS</h1>
        </div>
        </>
    )
}