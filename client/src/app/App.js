import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Actions } from "../actions/actions.js";
import { Authentication } from "../actions/auth.js";
import { BootcampRoutes } from "../bootcamp/routers/bootcamproutes.js";
import { ShowGallery } from "../hackathon/gallery/showphotos.js";
import { ProblemStatementsListView } from "../hackathon/problemstatements/listps.js";
import { ProblemStatements } from "../hackathon/problemstatements/problemstatements.js";
import { HackthonDayRoute } from "../hackathon/router/hackathonroutes.js";
import HTRLoginForm from "../hackathon/teams/htrLogin.js";
import { HtrsContactList } from "../hackathon/teams/htrs.js";
import TeamLoginform from "../hackathon/teams/teamlogin.js";
import TechTeamLoginForm from "../hackathon/teams/techteamlogin.js";
import EnhancedNetworkChecker from "../services/NetworkChecker.js";
import { socket } from "../services/socket.js";
import "./App.css";
import { LandingRoute } from "./allroutes/landingroute.js";

function App() {
  const [start, setStart] = useState(false);
  const [team, setTeam] = useState(false);
  const [load, setLoad] = useState(localStorage.load || false);
  const [offline, setOffline] = useState(localStorage.load || false);
  const [ishackAuth, setAuth] = useState(false)
  const [routes, setRoutes] = useState({})
  const { teamcode, teamname, member, password, HtrAuth, TechTeamMemberAuth } = Authentication()
  const dispatch = useDispatch()

  const checkTeam = async (teamcode) => {
    await Actions.CheckTeam(teamcode, teamname)
      .then((res) => {
        if (res?.data?.message === "Login successful") {
          setTeam(res?.data);
        }
      })
      .catch((e) => { });
  };

  const checkhackJoin = async () => {
    await Actions.JoinHackathon(teamcode, member, password, true)
      .then((res) => {
        if (res?.data?.message === "Login successful") {
          setAuth(true)
          dispatch({
            type: "UPDATE_TEAM_DATA",
            payload: {
              TeamData: res?.data?.data,
            },
          });
        } else {
          setAuth(false)
        }
      })
      .catch((e) => { });
  };

  const CheckHackathon = async () => {
    await Actions.checkHacthon()
      .then((res) => {
        setStart(res?.data);
        setRoutes(res?.data?.Routes)
        setLoad(true);
      })
      .catch((e) => { });
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
  useEffect(() => {
    checkhackJoin()
  }, [teamcode, member, password]);

  return (
    <>
      <EnhancedNetworkChecker />
      {load ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                routes?.main ? (
                  <HackthonDayRoute socket={socket} isAuth={ishackAuth} />
                ) : (
                  <LandingRoute />
                )
              }
            />
            <Route
              path="/bootcamp/*"
              element={
                !routes?.bootcamp ? (
                  <LandingRoute />
                ) : (
                  <BootcampRoutes data={start?.data} offline={offline} routes={routes} />
                )
              }
            />
            <Route path="/problemstatement-selection" element={
              routes?.problemstatementselection ?
                team?.message ? (<ProblemStatements data={team?.data} reload={Refresh} />) : (<TeamLoginform />) : <LandingRoute />} />
            <Route
              path="/htrlogin"
              element={
                routes?.htrlogin ? (
                  <HTRLoginForm isAuth={HtrAuth} />) : <LandingRoute />}
            />
            <Route
              path="/techlogin"
              element={
                routes?.techlogin ?
                  <TechTeamLoginForm isAuth={TechTeamMemberAuth} /> :
                  <LandingRoute />
              }
            />
            <Route
              path="/htrs"
              element={routes?.htrs ? HtrAuth ? <HTRLoginForm isAuth={HtrAuth} /> : <HtrsContactList /> : <LandingRoute />}
            />
            <Route path="/gallery" element={routes?.gallery ? <ShowGallery /> : <LandingRoute />} />
            <Route path="/problemstatements" element={routes?.Problemstatements ? <ProblemStatementsListView /> : <LandingRoute />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="ast">AST TEAM</div>
      )}
    </>
  );
}
export default App;
