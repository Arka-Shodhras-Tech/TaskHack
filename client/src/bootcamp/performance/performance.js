import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Text, Button, Spinner } from '@chakra-ui/react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import './performance.css';
import { Actions } from '../../actions/actions';

const Performance = ({ perfom, student }) => {
  const [view, setView] = useState(sessionStorage.getItem('view') || 'score');
  const [sdata, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'AttendDays', direction: 'descending' });

  sessionStorage.setItem('student', student?.AttendDays);
  sessionStorage.setItem('admin', perfom);

  const calculateMarks = (student) => {
    let marks = 0;
    student?.Tasks && Object.values(student?.Tasks).forEach(val =>
      val && Object.values(val).forEach(val1 => {
        marks += parseInt(val1.GetMarks || 0);
      })
    );
    return marks;
  };

  const handleViewChange = (newView) => {
    setView(newView);
    sessionStorage.setItem('view', newView);
  };

  const handleStudents = async (data) => {
    const filteredData = data?.filter(student => student?.Tasks);
    const marks = filteredData?.map(student => {
      let totalMarks = 0;
      Object.values(student?.Tasks)?.forEach(tasks => {
        Object.values(tasks)?.forEach(task => {
          totalMarks += parseInt(task?.GetMarks || 0);
        });
      });
      return {
        Name: student?.Name, Marks: totalMarks, Attendance: ((student?.AttendDays || 0) / (perfom) * 100).toFixed(0), Total: (parseInt(student?.AttendDays || 0) + parseInt(totalMarks || 0)
          + parseInt(student?.ActivityMarks || 0) + parseInt(student?.InternalMarks || 0)) / 4
      };
    });
    return marks.sort((a, b) => b.Total - a.Total);
  }

  useEffect(() => {
    Actions.Students()
      .then(res => {
        // console.log(res?.data)
        // const filteredData = res?.data?.filter(student => student.AttendDays !== undefined);
        // console.log(filteredData)
        // const sortedData = filteredData.sort((a, b) => b.AttendDays - a.AttendDays);
        // console.log(sortedData)

        handleStudents(res?.data)
          .then((res) => {
            setData(res);
          })
          .catch((e) => console.log(e))
      })
      .catch(e => console.log(e));
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
      sdata?.length>0?<div className="others">
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.Name}</td>
                  <td>{student?.Attendance}%</td>
                  <td>{student?.Marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>:<Spinner size="xl" />
    );
  };

  const Score = () => (
    <div className="score">
      <h2>Score</h2>
      <div className="score-details">
        <Text className="label" fontSize={['sm', 'md', 'lg']}>Name:</Text>
        <Text className="value" fontSize={['sm', 'md', 'lg']}>{student?.Name}</Text>
        <Text className="label" fontSize={['sm', 'md', 'lg']}>Your Score:</Text>
        <Text className="value" fontSize={['sm', 'md', 'lg']}>{calculateMarks(student)}</Text>
      </div>
    </div>
  );

  const data = [
    { name: 'Present', days: sessionStorage.getItem('student') },
    { name: 'Absent', days: parseInt(sessionStorage.getItem('admin')) - parseInt(sessionStorage.getItem('student')) },
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
