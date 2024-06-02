import { Route, Routes } from 'react-router-dom'
import { Hacthonpage } from '../hackathonpage/hacthonpage'
import { Nav1 } from '../../hackthonnav/hackthonnav'
export const HackthonDayRoute = () => {
    return (
        <>
            <Nav1 />
            <Routes>
                <Route path='/hackathon' element={<Hacthonpage />} />
                <Route path='/admin' element={<></>}/>
                <Route path='/login' element={<></>}/>
            </Routes>
        </>
    )
}