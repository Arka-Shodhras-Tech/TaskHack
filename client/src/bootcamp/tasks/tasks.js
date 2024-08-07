import { Button, useToast, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MyTasks } from './mytask';
import './tasks.css';
import { Actions } from '../../actions/actions';

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [mytasks, setMytasks] = useState(false)
    const [select, setSelect] = useState(true)
    const [student, setStudent] = useState([])
    const user = useSelector((state) => state.user?.auth)
    const toast = useToast()

    const fetchTasks = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_Server + '/bootcamptasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchStudentTasks = async () => {
        try {
            const response = await Actions.userAuth(user)
            if (response?.data) {
                setStudent(response?.data?.data)
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchStudentTasks();
    }, []);

    const TaskSelect = async (task, desc, marks, day) => {
        try {
            setSelect(false)
            const response = await axios.post(process.env.REACT_APP_Server + '/selecttask', { task, desc, marks, user, day })
            if (response.data) {
                toast({
                    title: response?.data?.message,
                    status: 'success',
                    position: 'top-right',
                    isClosable: true,
                })
                fetchTasks();
                setSelect(true)
                fetchStudentTasks();
            }
            else {
                setSelect(true)
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

    const TaskUnSelect = async (task, day) => {
        try {
            setSelect(false)
            const response = await axios.post(process.env.REACT_APP_Server + '/unselecttask', { task, user, day })
            if (response.data) {
                toast({
                    title: response?.data?.message,
                    status: 'success',
                    position: 'top-right',
                    isClosable: true,
                })
                fetchTasks();
                setSelect(true)
                fetchStudentTasks();
            }
            else {
                setSelect(true)
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

    const checkTask = (day, tasks) => {
        const result = student?.Tasks?.[day]?.some((val12) => val12?.Task === tasks)
        return result;
    }

    const checkMarks = (day, tasks) => {
        const result = student?.Tasks?.[day]?.some((val12) => val12?.Task === tasks && val12?.GetMarks)
        return result;
    }

    return (
        <div className="tasks-align">
            <div style={{ width: "100%", display: 'flex', justifyContent: 'right' }}>
                <Button style={{ backgroundColor: "black", color: 'white' }} onClick={() => setMytasks(mytasks ? false : true)}>{!mytasks ? "My Tasks" : "View All "}</Button>
            </div>
            <div className="task-list">
                {tasks?.sort((task1, task2) => task2.Day - task1.Day).map((val) => (
                    val?.Show && <div key={val?.Day}>
                        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Day {val?.Day}</h3>
                        {
                            !mytasks ? val?.Tasks?.map((task, index) => (
                               
                                task?.Show && <div key={index} className="task-item">
                                    <div style={{textAlign:"left"}}>
                                        <Text className="task-title" fontSize={['sm', 'md', 'lg']}>Task : {task?.Task}</Text>
                                        <Text className="task-description" fontSize={['sm', 'md', 'lg']}><strong>Description</strong> : {task?.Desc}</Text>
                                        <Text fontSize={['sm', 'md', 'lg']}>Marks : {task?.Marks}</Text>
                                    </div>
                                    {select && <div className='task-select'>
                                        {!checkTask(val?.Day, task?.Task) ? <Button bg={"blanchedalmond"} onClick={() => TaskSelect(task?.Task, task?.Desc, task?.Marks, val?.Day)}>Select</Button> :
                                            !checkMarks(val?.Day, task?.Task) && <Button bg={"blanchedalmond"} onClick={() => TaskUnSelect(task?.Task, val?.Day)}>UnSelect</Button>}
                                    </div>}
                                </div>
                            )) : <MyTasks tasks={student} day={val?.Day} unselect={(task, day) => TaskUnSelect(task, day)} />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};
