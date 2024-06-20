import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './tasks.css';

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const user = useSelector((state) => state.user?.auth)
    const toast = useToast()

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.post(process.env.REACT_APP_Server + '/bootcamptasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);
    const TaskSelect = async (task, desc) => {
        try {
            const response = await axios.post(process.env.REACT_APP_Server + '/selecttask', { task, desc, user })
            if (response.data) {
                toast({
                    title: response?.data?.message,
                    status: 'success',
                    position: 'top-right',
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: 'try again',
                    status: 'error',
                    position: 'bottom-left',
                    isClosable: true,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const TaskUnSelect = async (task) => {
        try {
            const response = await axios.post(process.env.REACT_APP_Server + '/unselecttask', { task, user })
            if (response.data) {
                toast({
                    title: response?.data?.message,
                    status: 'success',
                    position: 'top-right',
                    isClosable: true,
                })
            }
            else {
                toast({
                    title: 'try again',
                    status: 'error',
                    position: 'bottom-left',
                    isClosable: true,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="tasks-align">
            <h1 className="h1-heading">Tasks in Bootcamp</h1>
            <div className="task-list">
                {tasks?.map((val) => (
                    val?.Show && <div>
                        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Day {val?.Day}</h3>
                        {
                            val?.Tasks?.map((task, index) => (
                                task?.Show && <div key={index} className="task-item">
                                    <div>
                                        <div className="task-title">{task?.Task}</div>
                                        <div className="task-description">{task?.Desc}</div>
                                    </div>
                                    <div className='task-select'>
                                        <Button bg={"blanchedalmond"} onClick={() => TaskSelect(task?.Task, task?.Desc)}>Select</Button>
                                        <Button bg={"blanchedalmond"} onClick={() => TaskUnSelect(task?.Task)}>UnSelect</Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};
