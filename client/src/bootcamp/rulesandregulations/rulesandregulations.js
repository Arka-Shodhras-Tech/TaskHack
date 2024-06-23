import React from 'react';
import './rulesandregulations.css';
import { FaClock, FaCalendarDay, FaBook ,FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaDatabase } from 'react-icons/fa';

const RulesAndRegulations = () => {
  return (
    <div className="rules-container">
      <div className="flex-container">
        <div className='timings'>
          <h2 style={{color:'ActiveBorder',color:'black'}}>12 days Bootcamp Timings</h2><br/>
          <ul>
            <li>
              <FaCalendarDay />
              <strong>Monday to Friday</strong> 
            </li>
          </ul>
          <ul>
            <li><FaClock /> 4:30 to 7:30 <FaBook /> 3hrs lesson</li>
          </ul>
          <br/>
          <ul>
            <li>
              <FaCalendarDay />
              <strong>(Saturday) 03-08-24 and 10-08-24 </strong>
            </li>
          </ul>
          <ul>
            <li><FaClock /> 1:30 to 4:30 <FaBook /> 2hrs lesson, 1hr activity</li>
          </ul>
          <br/>
          <ul>
            <li><FaCalendarDay /> <strong>(Sundays) 04-08-24 and 11-08-24 </strong></li>
          </ul>
          <ul>
            <li><FaClock /> 9:00 to 12:00 & 1:30 to 4:30 <FaBook /> Lessons</li>
          </ul>
        </div>
        
        <div className="stack">
          <h2 className='rules'>Stack</h2>
          <ul className="stack-list-icons">
            <li className="stack-item"><FaHtml5 className="icon html-icon" /> HTML</li>
            <li className="stack-item"><FaCss3Alt className="icon css-icon" /> CSS</li>
            <li className="stack-item"><FaJs className="icon js-icon" /> JS</li>
            <li className="stack-item"><FaReact className="icon react-icon" /> React</li>
            <li className="stack-item"><FaNode className="icon node-icon" /> Node</li>
            <li className="stack-item"><FaDatabase className="icon mongodb-icon" /> MongoDB</li>
          </ul>
        </div>
      </div><hr></hr>

      
      <div className="schedule-container">
        <h2 className='schedule-head'>Schedule</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Topics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2-08-24</td>
              <td>HTML</td>
            </tr>
            <tr>
              <td>3-08-24</td>
              <td>CSS, HTML</td>
            </tr>
            <tr>
              <td>4-08-24</td>
              <td>JavaScript</td>
            </tr>
            <tr>
              <td>5-08-24</td>
              <td>HTML, CSS, JavaScript</td>
            </tr>
            <tr>
              <td>6-08-24</td>
              <td>MongoDB</td>
            </tr>
            <tr>
              <td>7-08-24</td>
              <td>MongoDB</td>
            </tr>
            <tr>
              <td>8-08-24</td>
              <td>Node.js</td>
            </tr>
            <tr>
              <td>9-08-24</td>
              <td>Node.js & Express</td>
            </tr>
            <tr>
              <td>10-08-24</td>
              <td>React</td>
            </tr>
            <tr>
              <td>11-08-24</td>
              <td>React</td>
            </tr>
            <tr>
              <td>12-08-24</td>
              <td>Node.js</td>
            </tr>
            <tr>
              <td>13-08-24</td>
              <td>Revision</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RulesAndRegulations;
