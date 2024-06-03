import { Button, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import '../main/main.css';
export const Home = () => {
    return (
        <>
            <div className='main'>
            <h2 style={{display:'flex',justifyContent:"center",alignItems:"center",height:"30vh"}}>Hello {sessionStorage.student}....😊😊😊</h2>
                <div className='hacthongrid-home'>
                    <div className='hacthonlist'>
                        <SimpleGrid minChildWidth='220px' spacing='40px'>
                            <Button>Task's</Button>
                            <Button>Perfomance</Button>
                            <Button>Materials</Button>
                        </SimpleGrid>
                    </div>
                </div>
            </div>
        </>
    );
}