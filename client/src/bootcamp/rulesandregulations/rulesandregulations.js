import React from 'react';
import { Helmet } from 'react-helmet';
import './rulesandregulations.css';
import { FaClock, FaCalendarDay, FaBook, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaDatabase } from 'react-icons/fa';

export const RulesAndRegulations = () => {
  return (
    <div className="rules-container">
      <Helmet>
        <title>12 Days Bootcamp - Rules and Regulations</title>
        <meta name="description" content="Join our 12 days bootcamp to learn HTML, CSS, JavaScript, React, Node, and MongoDB. Find the complete schedule and timings here." />
        <meta name="keywords" content="Bootcamp, HTML, CSS, JavaScript, React, Node, MongoDB, Coding, Programming, AST Team, Vedic Vision" />
        <meta property="og:title" content="12 Days Bootcamp - Rules and Regulations" />
        <meta property="og:description" content="Join our 12 days bootcamp to learn HTML, CSS, JavaScript, React, Node, and MongoDB. Find the complete schedule and timings here." />
        <meta property="og:type" content="website" />
       
      </Helmet>
      <div className="flex-container">
        <div className='timings'>
          <h2 style={{ color: 'ActiveBorder', color: 'black' }}>12 days Bootcamp Timings</h2><br />
          <ul>
            <li>
              <FaCalendarDay />
              <strong>Monday to Friday</strong>
            </li>
            <li><FaClock /> 4:30PM to 7:30 PM <FaBook /> 3hrs lesson</li>
          </ul>
          <ul>
            <li>
              <FaCalendarDay />
              <strong>(Saturday) 03-08-24 and 10-08-24 </strong>
            </li>
            <li><FaClock /> 1:30PM to 4:30 PM<FaBook /> 2hrs lesson, 1hr activity</li>
          </ul>
          <ul>
            <li><FaCalendarDay /> <strong>(Sundays) 04-08-24 and 11-08-24 </strong></li>
            <li><FaClock /> 9:00AM to 12:00PM & 1:30PM to 4:30PM <FaBook /> Lessons</li>
          </ul>
        </div>

        <div className="stack">
          <h2 className='rules'>Tech Stack</h2>
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
