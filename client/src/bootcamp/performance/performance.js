// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// import './performance.css';

// export const Performance = () => {
//   const [view, setView] = useState('attendance');

//   const handleViewChange = (newView) => {
//     setView(newView);
//   };

//   return (
//     <div className="performance-container">
//       <h1>Performance</h1>
//       <div className="button-group">
//         <button onClick={() => handleViewChange('attendance')}>Attendance</button>
//         <button onClick={() => handleViewChange('score')}>Score</button>
//         <button onClick={() => handleViewChange('others')}>Others</button>
//       </div>
//       <div className="content">
//         {view === 'attendance' && <Attendance />}
//         {view === 'score' && <Score />}
//         {view === 'others' && <Others />}
//       </div>
//     </div>
//   );
// };
// const data = [
//   { name: 'Present', days: 25 },
//   { name: 'Absent', days: 5 },
// ];

// const Attendance = () => (
//   <div className="attendance">
//     <h2>Attendance</h2>
//     <BarChart className='chart' width={600} height={300} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar className='bar-class'dataKey="days" fill="#8884d8" />
//     </BarChart>
//   </div>
// );
import React ,{useState}from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './performance.css';

const data = [
  { name: 'Present', days: 25 },
  { name: 'Absent', days: 5 },
];

const Attendance = () => (
  <div className="attendance">
    <h2>Attendance</h2>
    <div className="chart">
      <ResponsiveContainer className='chart-position' width="50%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="days" fill="#8884d8" barSize= {100} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const Performance = () => {
  const [view, setView] = useState('attendance');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="performance-container">
      <h1>Performance</h1>
      <div className="button-group">
        <button onClick={() => handleViewChange('attendance')}>Attendance</button>
        <button onClick={() => handleViewChange('score')}>Score</button>
        <button onClick={() => handleViewChange('others')}>Others</button>
      </div>
      <div className="content">
        {view === 'attendance' && <Attendance />}
        {view === 'score' && <Score />}
        {view === 'others' && <Others />}
      </div>
    </div>
  );
};




const Score = () => (
  <div className="score">
    <h2>Score</h2>
    <div className="score-details">
      <p className="label">Name:</p>
      <p className="value">John Doe</p>
      <p className="label">Your Score:</p>
      <p className="value">95</p>
    </div>
  </div>
);


const Others = () => {
  const otherStudents = [
    { id: 1, name: 'John Doe', attendance: '90%', score: 85 },
    { id: 2, name: 'Jane Smith', attendance: '95%', score: 90 },
    { id: 3, name: 'Alice Johnson', attendance: '85%', score: 88 },
  ];
  return (
    <div className="others">
      <h2>Others</h2>
      <div className='table-container'>
        <table className='table-align'>
          <thead>
            <tr> {/* Added <tr> tags */}
              <th>S.No</th>
              <th>Name</th>
              <th>Attendance</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {otherStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.attendance}</td>
                <td>{student.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

 
};

export default Performance;
