import { Route, Routes } from 'react-router-dom'
import { Hackathonpage } from '../hackathonpage/hackathonpage'
import { HackathonNav } from '../hackathonnav/hackathonnav'
import GameManager from '../games/GamesManager'
import GameMapper from '../games/GameMapper'
export const HackthonDayRoute = ({routes,socket,isAuth}) => {
    return (
        <>
            <HackathonNav />
            <Routes>
                <Route path='/*' element={<Hackathonpage route={routes} socket={socket} isAuth={isAuth}/>} />
                <Route path='/games' element={<GameManager socket={socket}/>} />
                <Route path='/game/:name' element={<GameMapper socket={socket}/>} />
            </Routes>
        </>
    )
}