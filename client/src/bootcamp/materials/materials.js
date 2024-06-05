import React from "react";
import './materials.css'

export const Materials = () =>{

    return(
        <>
        <div className="materials-container1">
            <h1>Materials and Sources</h1>
            <div className="materials-container2">
            <h2>Materials📄</h2>
            <table className="table-align">
                <thead>
                    <th>S.No</th>
                    <th>Materials📄</th>
                </thead>
                <tbody>
                <tr >
                <td> 1</td>
                <td>pdf</td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
            <div className="materials-container1">
            <h1></h1>
            <div className="materials-container2">
            <h2>Sources🔗</h2>
            <table className="table-align">
                <thead>
                    <th>S.No</th>
                    <th>Sources🔗</th>
                </thead>
                <tbody>
                <tr >
                <td> 1</td>
                <td>Link</td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
        </>
    )
}


