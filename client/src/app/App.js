import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Actions } from "../actions/actions.js";
import { BootcampRoutes } from "../bootcamp/routers/bootcamproutes.js";
import { ProblemStatements } from "../hackathon/problemstatements/problemstatements.js";
import { HackthonDayRoute } from "../hackathon/router/hackathonroutes.js";
import { socket } from "../services/socket.js";
import "./App.css";
import { LandingRoute } from "./allroutes/landingroute.js";
import EnhancedNetworkChecker from "../services/NetworkChecker.js";
import { ProblemStatementsListView } from "../hackathon/problemstatements/listps.js";
import TeamLoginform from "../hackathon/teams/teamlogin.js"
import HTRLoginForm from "../hackathon/teams/htrLogin.js";
import { HtrsContactList } from "../hackathon/teams/htrs.js";

function App() {
  const [start, setStart] = useState(false);
  const [team, setTeam] = useState(false);
  const [load, setLoad] = useState(localStorage.load || false);
  const [offline, setOffline] = useState(localStorage.load || false);
  const [ishackAuth, setAuth] = useState(false)

  const teamcode = useSelector((state) => state.user?.Teamcode);
  const teamname = useSelector((state) => state.user?.Teamname);
  const member = useSelector((state) => state.user?.TeamMember);
  const password = useSelector((state) => state.user?.TeamPassword);



  const checkTeam = async (teamcode) => {
    await Actions.CheckTeam(teamcode, teamname)
      .then((res) => {
        if (res?.data?.message === "Login successful") {
          setTeam(res?.data);
        }
      })
      .catch((e) => {});
  };



  const checkhackJoin = async () => {
    await Actions.JoinHackathon(teamcode, member,password)
      .then((res) => {
        if (res?.data?.message === "Login successful") {
          setAuth(true)
         
        }else{
          setAuth(false)
        }
      })
      .catch((e) => {});
  };

  const CheckHackathon = async () => {
    await Actions.checkHacthon()
      .then((res) => {
        console.log("Check");
        setStart(res?.data);
        setLoad(true);
      })
      .catch((e) => {});
  };

  const Refresh = () => {
    checkTeam(teamcode);
    checkhackJoin()
  };

  useEffect(() => {
    checkTeam(teamcode);
    CheckHackathon();
    checkhackJoin()
  }, []);
  useEffect(()=>{
    checkhackJoin()
  },[teamcode,member,password]);

  return (
    <>
      <EnhancedNetworkChecker />

      {load ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                start?.start ? (
                  <HackthonDayRoute socket={socket} isAuth={ishackAuth} />
                ) : (
                  <LandingRoute />
                )
              }
            />
            <Route
              path="/bootcamp/*"
              element={
                start?.start ? (
                  <HackthonDayRoute socket={socket} isAuth={ishackAuth} />
                ) : (
                  <BootcampRoutes data={start?.data} offline={offline} />
                )
              }
            />
            <Route
              path="/registerps"
              element={
                team?.message ? (
                  <ProblemStatements data={team?.data} reload={Refresh} />
                ) : (
                  <TeamLoginform  />
                )
              }
            />
             <Route
              path="/htrlogin"
              element={
                
                  <HTRLoginForm />
               
              }
            />
             <Route
              path="/htrs"
              element={
                
                  <HtrsContactList />
               
              }
            />
             <Route
              path="/problemstatements"
              element={
              
                  <ProblemStatementsListView/>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="ast">AST TEAM</div>
      )}
    </>
  );
}
export default App;
