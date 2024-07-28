import { Route, Routes } from 'react-router-dom';
import LandingPage from "../../landing-page/landing-page.js";
import { RoutesofASTeam } from "./examroutes.js";
import { PageNotFound } from '../../pagenotfound/pagenotfound.js';
export const LandingRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/exam/*" element={<RoutesofASTeam/>}/>
                <Route path='/*' element={<PageNotFound/>}/>
            </Routes>
        </>
    )
}