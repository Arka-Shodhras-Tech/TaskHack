import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HackthonDayRoute } from '../hackathon/hacthonday/router/hacthondayroute.js';
import { HackthonRoutes } from "../hackathon/routers/hackthonroutes.js";
import './App.css';
import { RoutesofASTeam } from "./allroutes/allroutes.js";

function App() {
  const [start,setStart]=useState(false);
  useEffect(()=>{
    axios.post(`${process.env.REACT_APP_Server}/check-hackathon/`+"hacthon@gmail.com")
    .then((res)=>{
      setStart(res?.data?.start)
    })
    .catch((e)=>console.log(e))
  },[start])
  return (
    <>
      <BrowserRouter>
        <Routes>
          {start?<Route path='/*' element={<HackthonDayRoute />} />
            :<>
              <Route path="/*" element={<RoutesofASTeam />} />
              <Route path="/hackathon/*" element={<HackthonRoutes />} />
            </>
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
