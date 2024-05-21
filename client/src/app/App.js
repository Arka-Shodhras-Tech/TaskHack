import CryptoAES from "crypto-js/aes.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Adminexam } from '../admin/examquestions/adminexam';
import { PaperCorrection } from '../admin/papercorrection/papercorrection';
import { AdminLogin } from '../admin/register/adminlogin.js';
import { Register } from '../admin/register/register';
import { Studentdata } from '../admin/studentdata/studentdata';
import { Studentscore } from '../admin/studentdata/studentscore';
import { Team } from '../admin/team/team';
import { id, lock, lock1, salt } from '../api.js';
import { Nav } from '../navbar/nav';
import { Exam } from '../student/exam/exam';
import { Login } from '../student/login/login.js';
import TeamWork from "../admin/studentdata/Teamwork.js";
import './App.css';
import { Showmaterial } from "../admin/materials/showmaterial.js";
import { Addmaterial } from "../admin/materials/addmaterials.js";
function App()
{
  return (
    <>
    <Nav/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={lock===CryptoAES.decrypt(lock1?lock1:"1234", id).toString(salt)?<Team/>:<AdminLogin/>}/>
      <Route path='/192.5264.47' element={<Login/>}/>
      <Route path='/studentregister' element={<Register/>}/>
      <Route path='/adminexam' element={lock===CryptoAES.decrypt(lock1?lock1:"1234", id).toString(salt)?<Adminexam/>:<AdminLogin/>}/>
      <Route path='/studentdata' element={lock===CryptoAES.decrypt(lock1?lock1:"1234", id).toString(salt)?<Studentdata/>:<AdminLogin/>}/>
      <Route path='/teamworkdata' element={<TeamWork/>}/>
      <Route path='/studentscore' element={<Studentscore/>}/>
      <Route path='/papercorrection' element={lock===CryptoAES.decrypt(lock1?lock1:"1234", id).toString(salt)?<PaperCorrection/>:<AdminLogin/>}/>
      <Route path='/192.5264.27' element={sessionStorage.student?<Exam/>:<Login/>}/>
      <Route path="/showmaterial" element={<Showmaterial/>}/>
      <Route path="/addmaterial" element={<Addmaterial/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
