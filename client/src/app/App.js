import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BootcampRoutes } from "../bootcamp/routers/bootcamproutes.js";
import { HackthonDayRoute } from '../hackathon/router/hacthonroute.js';
import './App.css';
import { RoutesofASTeam } from "./allroutes/allroutes.js";
import { ProblemStatements } from '../hackathon/problemstatements/problemstatements.js';


function App() {
  const [start, setStart] = useState(false);
  const [load, setLoad] = useState(false)
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_Server}/check-hackathon/` + "hacthon@gmail.com")
      .then((res) => {
        setStart(res?.data?.start)
        setLoad(true)
      })
      .catch((e) => console.log(e))
  }, [start])
  return (
    <>
      {load ? <BrowserRouter>
        <Routes>
          <Route path="/*" element={start ? <HackthonDayRoute /> : <RoutesofASTeam />} />
          <Route path="/bootcamp/*" element={start ? <HackthonDayRoute /> : <BootcampRoutes />} />
          <Route path='/problemstatements' element={<ProblemStatements/>}/>
        </Routes>
      </BrowserRouter> :
        <div className='ast'>AST TEAM</div>}
    </>
  );
}
export default App;
