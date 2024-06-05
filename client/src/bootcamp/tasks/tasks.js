import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './tasks.css';
import { Button } from 'react-bootstrap';

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_Server + '/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);
    return (
        <div className="tasks-align">
            <h1 className="h1-heading">Tasks in Bootcamp</h1>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <div key={index} className="task-item">
                        <div>
                            <div className="task-title">{task.title}</div>
                            <div className="task-description">{task.description}</div>
                        </div>
                        <div className='task-select'>
                            <Button >Select</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
