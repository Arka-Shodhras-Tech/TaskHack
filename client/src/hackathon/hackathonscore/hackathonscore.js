// import React, { useEffect, useState } from 'react';
// import './score.css'; // Import the CSS file

// export const HackStudentscore = () => {
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         // Fetch the student data from the JSON file
//         fetch('/students.json')
//             .then(response => response.json())
//             .then(data => setStudents(data));
//     }, []);

//     return (
//         <div className="container">
//             <h1 className="title">Student Scores</h1>
//             <table className="scores-table">
//                 <thead>
//                     <tr>
//                         <th>S.No</th>
//                         <th>Registration Number</th>
//                         <th>Name</th>
//                         <th>Score</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map(student => (
//                         <tr key={student.id}>
//                             <td>{student.id}</td>
//                             <td>{student.name}</td>
//                             <td>{student.score}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

import React, { useEffect, useState } from 'react';
import './score.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export const HackStudentscore = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch the student data from the JSON file
        fetch('/students.json')
            .then(response => response.json())
            .then(data => setStudents(data));
    }, []);

    return (
        <div className="container">
            <h1 className="title">Student Scores</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>S.No</th>
                        <th>Registration Number</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
