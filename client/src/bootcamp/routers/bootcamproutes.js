import { Route, Routes } from 'react-router-dom'
import Countdown from '../../hackathon/countdown/countdown'
import { BootcampNav } from '../bootcampnav/bootcampnav'
import { Home } from '../home/home'
import { LoginForm } from '../login/login'
import { RegistrationForm } from '../register/register'
import { HackStudentscore } from '../score/score'
import { OTPForm } from '../sendotp/sendotp'
import { UpdateForm } from '../update/update'
import { Tasks } from '../tasks/tasks'
export const BootcampRoutes = () => {
    return (
        <>
            <BootcampNav />
            <Routes>
                <Route path='/register' element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/update" element={<OTPForm />} />
                <Route path='/updateform' element={<UpdateForm/>}/>
                <Route path='/tasks' element={<Tasks/>}/>

                <Route path="/score" element={<HackStudentscore />} />
                <Route path="/" element={<Countdown />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </>
    )
}