import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Text, Button } from '@chakra-ui/react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import './performance.css';
import { Actions } from '../../actions/actions';

const Performance = ({ perfom, student }) => {
  const [view, setView] = useState(sessionStorage.view || 'score');
  const [sdata, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'AttendDays', direction: 'descending' });

  sessionStorage.student = student?.AttendDays;
  sessionStorage.admin = perfom?.Count;

  const CalMarks = (student) => {
    let marks = 0;
    student?.Tasks && Object.values(student?.Tasks)?.map((val) => (
      val && Object.values(val)?.map((val1) => (
        marks = marks + parseInt(val1?.GetMarks || 0)
      ))
    ));
    return marks;
  };

  const handleViewChange = (newView) => {
    setView(newView);
    sessionStorage.view = newView;
  };

  useEffect(() => {
    Actions.Students()
      .then((res) => {
        const filteredData = res?.data?.filter(student => student?.AttendDays !== undefined);
        const sortedData = filteredData.sort((a, b) => b.AttendDays - a.AttendDays);
        setData(sortedData);
      }).catch((e) => console.log(e));
  }, []);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...sdata].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const Others = () => {
    return (
      <div className="others">
        <h2>Others</h2>
        <div className='table-container'>
          <table className='table-align'>
            <thead>
              <tr>
                <th onClick={() => sortData('_id')}>
                  S.No
                 {sortConfig.key === '_id' && (sortConfig.direction === 'ascending' ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />)}
                </th>
                <th onClick={() => sortData('Name')}>
                  Name {sortConfig.key === 'Name' && (sortConfig.direction === 'ascending' ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />)}
                </th>
                <th onClick={() => sortData('AttendDays')}>
                  Attendance {sortConfig.key === 'AttendDays' && (sortConfig.direction === 'ascending' ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />)}
                </th>
                <th onClick={() => sortData('Tasks')}>
                  Score 
                </th>
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
        <Text className="label" fontSize={['sm', 'md', 'lg']}>Name:</Text>
        <Text className="value" fontSize={['sm', 'md', 'lg']}>{student?.Name}</Text>
        <Text className="label" fontSize={['sm', 'md', 'lg']}>Your Score:</Text>
        <Text className="value" fontSize={['sm', 'md', 'lg']}>{CalMarks(student)}</Text>
      </div>
    </div>
  );

  const data = [
    { name: 'Present', days: sessionStorage.student },
    { name: 'Absent', days: parseInt(sessionStorage.admin) - parseInt(sessionStorage.student) },
  ];

  const Attendance = () => (
    <div className="attendance">
      <div className="chart">
        <h2>Attendance</h2>
        <ResponsiveContainer className='chart-position' height={300}>
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
      <div className="button-group">
        <Button onClick={() => handleViewChange('attendance')}>Attendance</Button>
        <Button onClick={() => handleViewChange('score')}>Score</Button>
        <Button onClick={() => handleViewChange('others')}>Others</Button>
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
