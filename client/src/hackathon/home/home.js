import { Button, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import '../main/main.css';
export const Home = () => {
    return (
        <div className='main'>
            <div className='hacthongrid-home'>
                <div className='hacthonlist'>
                    <SimpleGrid minChildWidth='220px' spacing='40px'>
                        <Button>Task</Button>
                        <Button>Score</Button>
                        <Button disabled>Teams</Button>
                    </SimpleGrid>
                </div>
            </div>
        </div>
    );
}