import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Actions } from '../actions/actions.js';
import { BootcampRoutes } from "../bootcamp/routers/bootcamproutes.js";
import { ProblemStatements } from '../hackathon/problemstatements/problemstatements.js';
import { HackthonDayRoute } from '../hackathon/router/hackathonroutes.js';
import { TeamLoginForm } from '../hackathon/teams/teamlogin.js';
import { socket } from '../socket.js';
import './App.css';
import { LandingRoute } from './allroutes/landingroute.js';
import EnhancedNetworkChecker from '../NetworkChecker.js';
function App() {
  const [start, setStart] = useState(true);
  const [team, setTeam] = useState(false)
  const [load, setLoad] = useState(localStorage.load || false)
  const [offline, setOffline] = useState(localStorage.load || false)

  const teamcode = useSelector((state) => state.user?.Teamcode)
  const teamname = useSelector((state) => state.user?.Teamname)

  const checkTeam = async (teamcode) => {
    await Actions.CheckTeam(teamcode)
      .then((res) => {
        if (res?.data?.data?.Password === teamname) {
          setTeam(res?.data)
        }
      })
      .catch((e) => { })
  }

  const CheckHackathon = async () => {
    await Actions.checkHacthon()
      .then((res) => {
        setStart(res?.data)
        setLoad(true)
      })
      .catch((e) => { })
  }

  const Refresh = () => {
    checkTeam(teamcode)
  }

  useEffect(() => {
    checkTeam(teamcode)
    CheckHackathon()
  }, [])

  return (
    <>
            <EnhancedNetworkChecker/>

      {load ? <BrowserRouter>
        <Routes>
          <Route path="/*" element={start?.start ? <HackthonDayRoute socket={socket}/> : <LandingRoute />} />
          <Route path="/bootcamp/*" element={start?.start ? <HackthonDayRoute  socket={socket}/> :  <BootcampRoutes data={start?.data} offline={offline}/>} />
          <Route path='/problemstatements' element={team?.message?<ProblemStatements data={team?.data} reload={Refresh}/>:<TeamLoginForm/>} />
        </Routes>
      </BrowserRouter> :
        <div className='ast'>AST TEAM</div>}
    </>
  );
}
export default App;


