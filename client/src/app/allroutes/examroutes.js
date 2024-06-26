import CryptoAES from "crypto-js/aes.js";
import { Route, Routes } from 'react-router-dom';
import { Adminexam } from '../../admin/examquestions/adminexam.js';
import { Addmaterial } from "../../admin/materials/addmaterials.js";
import { Showmaterial } from "../../admin/materials/showmaterial.js";
import { PaperCorrection } from '../../admin/papercorrection/papercorrection.js';
import { AdminLogin } from '../../admin/register/adminlogin.js';
import { Register } from '../../admin/register/register.js';
import TeamWork from "../../admin/studentdata/Teamwork.js";
import { Studentdata } from '../../admin/studentdata/studentdata.js';
import { Studentscore } from '../../admin/studentdata/studentscore.js';
import { Team } from '../../admin/team/team.js';
import { id, lock, lock1, salt } from '../../api.js';
import { Nav } from "../../navbar/nav.js";
import { Exam } from '../../student/exam/exam.js';
import { Login } from '../../student/login/login.js';
export const RoutesofASTeam = () => {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) ? <Team /> : <AdminLogin />} />
                <Route path='/192.5264.47' element={<Login />} />
                <Route path='/studentregister' element={<Register />} />
                <Route path='/adminexam' element={lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) ? <Adminexam /> : <AdminLogin />} />
                <Route path='/studentdata' element={lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) ? <Studentdata /> : <AdminLogin />} />
                <Route path='/teamwork' element={<TeamWork />} />
                <Route path='/studentscore' element={<Studentscore />} />
                <Route path='/papercorrection' element={lock === CryptoAES.decrypt(lock1 ? lock1 : "1234", id).toString(salt) ? <PaperCorrection /> : <AdminLogin />} />
                <Route path='/192.5264.27' element={sessionStorage.student ? <Exam /> : <Login />} />
                <Route path="/showmaterial" element={<Showmaterial />} />
                <Route path="/addmaterial" element={<Addmaterial />} />
            </Routes>
        </>
    )
}