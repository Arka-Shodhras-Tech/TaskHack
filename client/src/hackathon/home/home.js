import { Button, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import '../main/main.css';
export const Home = () => {
    return (
        <>
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
            
            {/* <div>
                <p ><h2 style="text-align: center;">This <b>OTP</b> came from AST</h2></p>
                <p style="text-align: center;">
                    <b>Name::</b> ${"atnd.Name"}<br />
                    <b>Gmail::</b> ${"atnd.Gmail"}<br />
                </p>
                <p >
                    <h1 style="text-align: center;">Code:: ${"OTP"}</h1>
                </p>
                <br />
                <p >
                    <h2 style="color:green;">Welcome to ${parseInt("atnd.Num") + 1}th day</h2>
                </p>
                <p style="color:blue;">
                    Check Your attendance and submission of your work<br />
                    <h3>https://asteam-attendance.vercel.app/scrummaster</h3>
                </p>
            </div> */}
        </>
    );
}