import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Countdown from '../../hackathon/countdown/countdown'
import { BootcampNav } from '../bootcampnav/bootcampnav'
import { Home } from '../home/home'
import { LoginForm } from '../login/login'
import { Performance } from '../performance/performance'
import { RegistrationForm } from '../register/register'
import { HackStudentscore } from '../score/score'
import { OTPForm } from '../sendotp/sendotp'
import { Tasks } from '../tasks/tasks'
import { UpdateForm } from '../update/update'
import { PageNotFound } from '../../pagenotfound/pagenotfound'
import { useEffect, useState } from 'react'
import { Actions } from '../../actions/actions'
import { Materials } from '../materials/materials'
export const BootcampRoutes = () => {
    const auth =useSelector((state)=>state.user?.auth)
    const update=useSelector((state)=>state.user.update)
    const [check,setCheck]=useState(false)
    const [load,setLoad]=useState(auth?false:true)
    useEffect(()=>{
        Actions.userAuth(auth)
        .then((res)=>{
            setCheck(res)
            setLoad(true)
        }).catch((e)=>console.log(e))
    },[check.auth,auth])
    return (
        load?<>
            <BootcampNav />
            <Routes>

                <Route path="/login" element={check?.auth?<Home/>:<LoginForm />} />
                <Route path="/update" element={<OTPForm />} />
                <Route path='/updateform' element={update?<UpdateForm />:<PageNotFound/>} />
                <Route path='/tasks' element={check?.auth?<Tasks />:<LoginForm />} />
                <Route path='/performance' element={check?.auth ? <Performance /> : <LoginForm />} />
                <Route path='/materials' element={<Materials/>}/>
                <Route path="/score" element={check?.auth ? <HackStudentscore /> : <LoginForm />} />
                <Route path="/" element={<Countdown />} />
                <Route path='/home' element={check?.auth ? <Home data={check?.data}/> : <LoginForm />} />
                <Route path='/*' element={<PageNotFound/>}/>
                <Route path='/register' element={<RegistrationForm/>}/>


            </Routes>
        </>:<div className='ast'>AST TEAM</div>
    )
}