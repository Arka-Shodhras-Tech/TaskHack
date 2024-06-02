import { Route, Routes } from 'react-router-dom'
import { HackStudentscore } from '../score/score'
import { LoginForm } from '../login/login'
import { Nav1 } from '../hackthonnav/hackthonnav'
import { RegistrationForm } from '../register/register'
import { Home } from '../home/home'


import { Popup } from '../popup/popup'
import { UpdateForm } from '../update/update'
import Countdown from '../countdown/countdown'
import { NewUpdateForm } from '../updates/updates'
export const HackthonRoutes = () => {
    return (
        <>
            <Nav1 />
            <Routes>
                <Route path='/register' element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/update" element={<UpdateForm />} />
                <Route path="/score" element={<HackStudentscore />} />
                <Route path="/popup" element={<Popup />} />
                <Route path="/" element={<Countdown />} />
                <Route path='/home' element={<Home />} />
                <Route path='/newupdate' element={<NewUpdateForm />} />
            </Routes>
        </>
    )
}