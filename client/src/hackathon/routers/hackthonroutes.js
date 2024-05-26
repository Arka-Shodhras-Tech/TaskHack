import { Route, Routes } from 'react-router-dom'
import { HackStudentscore } from '../hackathonscore/hackathonscore'
import { LoginForm } from '../hacklogin/hacklogin'
import { Nav1 } from '../hackthonnav/hackthonnav'
import { RegistrationForm } from '../hackthonregister/hackregister'
import { Home } from '../home/home'
import Hackathon from '../main/main'
import { Popup } from '../popup/popup'
import { UpdateForm } from '../update/update'

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
                <Route path="/" element={<Hackathon />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </>
    )
}