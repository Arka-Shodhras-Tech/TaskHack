import { Route, Routes } from 'react-router-dom'
import { Hackathonpage } from '../hackathonpage/hackathonpage'
import { HackathonNav } from '../hackathonnav/hackathonnav'
export const HackthonDayRoute = () => {
    return (
        <>
            <HackathonNav />
            <Routes>
                <Route path='/*' element={<Hackathonpage/>} />
            </Routes>
        </>
    )
}