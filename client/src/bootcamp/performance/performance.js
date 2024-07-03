import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './performance.css';
import { Actions } from '../../actions/actions';

export const Performance = ({ perfom, student }) => {
  const [view, setView] = useState(sessionStorage.view || 'score');
  const [sdata, setData] = useState([])
  sessionStorage.student = student?.AttendDays
  sessionStorage.admin = perfom?.Count

  console.log(perfom)

  const CalMarks = (student) => {
    let marks = 0;
    student?.Tasks && Object.values(student?.Tasks)?.map((val) => (
      val&&Object.values(val)?.map((val1) => (
        marks = marks + parseInt(val1?.GetMarks || 0)
      ))
    ))
    return marks
  }

  const handleViewChange = (newView) => {
    setView(newView);
    sessionStorage.view = newView
  };

  useEffect(() => {
    Actions.Students()
      .then((res) => {
        const filteredData = res?.data?.filter(student => student?.AttendDays !== undefined);
        const sortedData = filteredData.sort((a, b) => b.AttendDays - a.AttendDays);
        setData(sortedData);
      }).catch((e) => console.log(e))
  }, [])


  const Others = () => {
    return (
      <div className="others">
        <h2>Others</h2>
        <div className='table-container'>
          <table className='table-align'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Attendance</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sdata?.map((student, index) => (
                <tr key={student?._id}>
                  <td>{index + 1}</td>
                  <td>{student?.Name}</td>
                  <td>{((student?.AttendDays || 0) / (perfom?.Count) * 100).toFixed(0)}%</td>
                  <td>{CalMarks(student?.Tasks ? student : 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Score = () => (
    <div className="score">
      <h2>Score</h2>
      <div className="score-details">
        <p className="label">Name:</p>
        <p className="value">{student?.Name}</p>
        <p className="label">Your Score:</p>
        <p className="value">{CalMarks(student)}</p>
      </div>
    </div>
  );

  const data = [
    { name: 'Present', days: sessionStorage.student },
    { name: 'Absent', days: parseInt(sessionStorage.admin) - parseInt(sessionStorage.student) },
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
            <Bar dataKey="days" fill="#8884d8" barSize={100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

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
export default Performance;