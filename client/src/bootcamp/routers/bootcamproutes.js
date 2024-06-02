import { Route, Routes } from 'react-router-dom'
import Countdown from '../../hackathon/countdown/countdown'
import { Hackathonpage } from '../../hackathon/hackathonpage/hackathonpage'
import { BootcampNav } from '../bootcampnav/bootcampnav'
import { Home } from '../home/home'
import { LoginForm } from '../login/login'
import { RegistrationForm } from '../register/register'
import { HackStudentscore } from '../score/score'
import { UpdateForm } from '../update/update'
import { NewUpdateForm } from '../updates/updates'

export const BootcampRoutes = () => {
    return (
        <>
            <BootcampNav />
            <Routes>
                <Route path='/register' element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/update" element={<UpdateForm />} />
                <Route path="/score" element={<HackStudentscore />} />
                <Route path="/" element={<Countdown />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </>
    )
}