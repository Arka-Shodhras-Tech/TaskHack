import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Countdown from '../../hackathon/countdown/countdown'
import { BootcampNav } from '../bootcampnav/bootcampnav'
import { Home } from '../home/home'
import { LoginForm } from '../login/login'
import { RegistrationForm } from '../register/register'
import { HackStudentscore } from '../score/score'
import { OTPForm } from '../sendotp/sendotp'
import { Tasks } from '../tasks/tasks'
import { UpdateForm } from '../update/update'
import { PageNotFound } from '../../pagenotfound/pagenotfound'
import { useEffect, useState } from 'react'
import { Actions } from '../../actions/actions'
import { Materials } from '../materials/materials'
import {RulesAndRegulations} from '../rulesandregulations/rulesandregulations'
import { FeedbackForm } from '../feedbackform/feedbackform'
import { MostusedMaterials } from '../mostusedmaterials/mostusedmaterials'
import Performance from '../performance/performance'

export const BootcampRoutes = ({data,offline}) => {
    const auth =useSelector((state)=>state.user?.auth)
    const update=useSelector((state)=>state.user?.update)
    const [check,setCheck]=useState(false)
    const [load,setLoad]=useState(auth?false:true)
    useEffect(()=>{
        auth&&Actions.userAuth(auth)
        .then((res)=>{
            setCheck(res?.data)
            setLoad(true)
        }).catch((e)=>console.log(e))
    },[check.auth,auth])
    return (
        load|| offline ?<>
            <BootcampNav />
            <Routes>
                <Route path="/login" element={check?.auth?<Home/>:<LoginForm />} />
                <Route path="/update" element={<OTPForm />} />
                <Route path='/updateform' element={update?<UpdateForm />:<PageNotFound/>} />
                <Route path="/score" element={check?.auth ? <HackStudentscore /> : <LoginForm />} />
                <Route path="/" element={<Countdown />} />
                <Route path='/home' element={check?.auth ? <Home data={check?.data}  perfom={data} student={check?.data}/> : <LoginForm />} />
                <Route path='/*' element={<PageNotFound/>}/>
                <Route path='/register' element={<RegistrationForm/>}/>
                <Route path='/rulesandregulations' element={<RulesAndRegulations/>}/>
                <Route path='/about' element={<RulesAndRegulations/>}/>
                <Route path='/feedbackform' element={check?.auth ?<FeedbackForm/>: <LoginForm />}/>
                <Route path='/tasks' element={check?.auth?<Tasks />:<LoginForm />} />
                <Route path='/performance' element={check?.auth ? <Performance perfom={data} student={check?.data}/> : <LoginForm />} />
                <Route path='/materials' element={check?.auth ?<Materials/>: <LoginForm />}/>
                <Route path='/mostlyused' element={<MostusedMaterials/>} />

            </Routes>
        </>:<div className='ast'>AST TEAM</div>
    )
}