import { Button, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../main/main.css';
export const Home = () => {
    const nav = useNavigate()

    const handleTaskClick = () => {
        nav('/bootcamp/tasks')
    }
    const handlePerformanceClick =()=>{
        nav('/bootcamp/performance')
    }
    const handleMaterialsClick =()=>{
        nav('/bootcamp/materials')
    }


    return (
        <>
            <div className='main'>
            <h2 style={{display:'flex',justifyContent:"center",alignItems:"center",height:"30vh",fontFamily:'serif'}}>Hello {sessionStorage.student}....😊😊😊</h2>
                <div className='hacthongrid-home'>
                    <div className='hacthonlist'>
                        <SimpleGrid minChildWidth='220px' spacing='40px'>
                            <Button onClick={handleTaskClick} >Tasks</Button>
                            <Button onClick={handlePerformanceClick}>Perfomance</Button>
                            <Button onClick={handleMaterialsClick}>Materials</Button>
                        </SimpleGrid>
                    </div>
                </div>
            </div>
        </>
    );
}