import React from "react";
import { motion } from "framer-motion";
import "./landingpage.css";

const LandingPage = () => {
  // document.title = "Vedic Vision | Team Ast"
  return (
    <main>
         <section className="section" id="page-1">
        <video autoPlay muted loop className="background-video">
          <source src="./back-ground-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <motion.div
          className="logo-image"
          initial={{ scale: 4, translateX: "-50%", translateY: "-1%" }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div class="logo-container">
  <img src="./logo-gif.gif" alt="AST Logo" class="logo-rotate" />
</div>

          <span>
            <h4>AST</h4> <p>TEAM INC .</p>
          </span>
        </motion.div>

        <div className="text-center com-head">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            ARKHA <br />
            SODHARA <br />
            TECH
          </motion.h1>
        </div>
      </section>
      <section className="section" id="page-2">
        <div className="com-info">
          <motion.div
            className="com-info-block-1"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <h1>WE STARTED SMALL.</h1>
            <div className="d-flex gap-3 info-boxes">
              <span>A</span>
              <span>S</span>
              <span>T</span>
            </div>
            <p>
              Welcome to Team AST, where we are committed to the welfare and
              development of students. Our mission is to provide comprehensive
              support through various initiatives such as bootcamps, hackathons,
              exams, and more. Join us and be part of a community dedicated to
              your success and growth!
            </p>
          </motion.div>
          <motion.div
            className="com-info-block-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <video autoPlay muted loop>
              <source src="../block-2-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      <section className="section" id="page-3">
        <motion.div
          className="why-choose-us"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src="../aboutast.png" alt="about task" />
        </motion.div>
        <div className="com-features">
          <motion.div
            onClick={() => (window.location.href = "/bootcamp")}
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="feature-img">
              <img src="../botcamp.jpg" alt="bootcamp" />
            </div>
            <div>
              <hr />
              <h1>BOOTCAMP</h1>
              <p>
                Our bootcamps at Team AST, led by students, offer intensive
                training sessions covering topics from coding to
                entrepreneurship. These bootcamps provide hands-on learning,
                practical skills, and valuable networking opportunities. Join us
                to advance your career and connect with like-minded peers.
              </p>
            </div>
          </motion.div>
          <motion.div
            onClick={() => (window.location.href = "/problemstatements")}
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div className="feature-img">
              <img src="../hackathon.jpg" alt="hackathon" />
            </div>
            <div>
              <hr />
              <h1>HACKATHON</h1>
              <p>
                Team AST's hackathons, led by students, offer dynamic events to
                innovate and solve real-world problems. These hackathons provide
                hands-on experience, practical skills, and valuable networking
                opportunities. Join us to challenge yourself, showcase your
                talents, and connect with industry experts and peers.
              </p>
            </div>
          </motion.div>
          <motion.div
            onClick={() => (window.location.href = "/exam")}
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            <div className="feature-img">
              <img src="../exam.png" alt="ast exams" />
            </div>
            <div>
              <hr />
              <h1>Exam</h1>
              <p>
                Team AST's exams assess student learning and progress, offering
                valuable feedback to students and instructors. We maintain
                rigorous standards to ensure fair evaluations and support
                academic growth, helping students effectively track their
                progress and set educational goals for future success.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
