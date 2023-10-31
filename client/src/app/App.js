import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {Login} from '../student/login/login.js'
import { Nav } from '../navbar/nav';
import { Team } from '../admin/team/team';
import { Register } from '../admin/register/register';
import { Adminexam } from '../admin/examquestions/adminexam';
import { Studentdata } from '../admin/studentdata/studentdata';
import { Studentscore } from '../admin/studentdata/studentscore';
import { Exam } from '../student/exam/exam';
import { PaperCorrection } from '../admin/papercorrection/papercorrection';
function App() {
  return (
    <>
    <Nav/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Team/>}/>
      <Route path='/192.5264.47' element={<Login/>}/>
      <Route path='/studentregister' element={<Register/>}/>
      <Route path='/adminexam' element={<Adminexam/>}/>
      <Route path='/studentdata' element={<Studentdata/>}/>
      <Route path='/studentscore' element={<Studentscore/>}/>
      <Route path='/papercorrection' element={<PaperCorrection/>}/>
      <Route path='/192.5264.27' element={sessionStorage.student?<Exam/>:<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
