import {
    Button,
    SimpleGrid
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeModel } from '../../models/hacthonhomemodel/hacthonhomemodel';
import { PopOver } from '../../models/hacthonhomepopover/hacthonhomepopover';
import '../main/main.css';

export const Home = ({ data }) => {
    // document.title = "Home| Bootcamp | Vedic Vision | Team Ast"

    const nav = useNavigate()
    const handleTaskClick = () => {
        nav('/bootcamp/tasks')
    }
    const handlePerformanceClick = () => {
        nav('/bootcamp/performance')
    }
    const handleMaterialsClick = () => {
        nav('/bootcamp/materials')
    }
    const MostusedMaterials = () => {
        nav('/bootcamp/mostlyused')
    }
    const FeedbackForm = () => {
        nav('/bootcamp/feedbackform')
    }
    const [openModel, setOpenModel] = useState(true)


    return (
        <>
            <div className='main'>
                {!data?.Gender && <HomeModel open={openModel} close={() => setOpenModel(false)} data={data} />}
                <div className='profile'>
                    <PopOver data={data} />
                </div>
                <h2 className='person-name'>Hello {data?.Name}....😊😊😊</h2>
                <div className='hacthongrid-home'>
                    <div className='hacthonlist'>
                        <div className='buttonsgrid'>

                    
                        <SimpleGrid minChildWidth='220px' spacing='40px'>
                            <Button onClick={handleTaskClick} >Tasks</Button>
                            <Button onClick={handlePerformanceClick}>Perfomance</Button>
                            <Button onClick={handleMaterialsClick}>Materials</Button>
                            {/* <Button onClick={MostusedMaterials}>Most Used Materials</Button>
                            <Button onClick={FeedbackForm}>FeedbackForm</Button> */}
                        </SimpleGrid>
                        </div>
                        <div className='aboutgrid'>
                            <SimpleGrid minChildWidth='220px' spacing='40px'>
                                <Button onClick={() => window.location.href = 'about'}>About</Button>
                            </SimpleGrid>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}