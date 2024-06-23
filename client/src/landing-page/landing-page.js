import React from "react";
import "./landingpage.css";
const LandingPage = () => {
    return (
        <main>
            <section className="section" id="page-1">
                <div className=" text-center com-head">
                    <h1 className="">
                        ARKHA <br />
                        SODHARA <br />
                        TECH
                    </h1>
                </div>
            </section>

            <section className="section" id="page-2">
                <div class="com-info">
                    <div class="com-info-block-1">
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
                    </div>
                    <div class="com-info-block-2">
                        <video autoplay loop>
                            <source src="../block-2-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>

            <section className="section" id="page-3">
                <div className="why-choose-us">
                    <img src="../aboutast.png" />
                </div>
                <div className="com-features">
                    <div onClick={() => window.location.href = "/bootcamp"} className="feature-card">
                        <div className="feature-img">
                            <img src="../botcamp.jpg" />
                        </div>
                        <div>
                            <hr />
                            <h1>BOOTCAMP</h1>
                            <p>
                                Our bootcamps at Team AST, led by students, ​offer intensive training sessions covering ​topics from coding to entrepreneurship. ​These bootcamps provide hands-on learning,

                                practical skills, and valuable networking ​opportunities. Join us to advance your career ​and connect with like-minded peers.
                            </p>
                        </div>
                    </div>
                    <div onClick={() => window.location.href = "/problemstatements"} className="feature-card">
                        <div className="feature-img">
                            <img src="../hackthone.jpg" />
                        </div>
                        <div>
                            <hr />
                            <h1>HACKATHON</h1>
                            <p>
                                Team AST's hackathons, led by students, offer ​dynamic events to innovate and solve real-​world problems. These hackathons provide ​hands-on experience, practical skills, and ​valuable networking opportunities.
                                Join us to ​challenge yourself, showcase your talents, ​and connect with industry experts and peers.
                            </p>
                        </div>
                    </div>
                    <div onClick={() => window.location.href = "/exam"} className="feature-card">
                        <div className="feature-img">
                            <img src="../exam.webp" />
                        </div>
                        <div>
                            <hr />
                            <h1>Exam</h1>

                            <p>
                                Team AST's exams assess student learning and ​progress, offering valuable feedback to students and ​instructors. We maintain rigorous standards to ​ensure fair evaluations and support academic ​growth,
                                helping students effectively track their ​progress and set educational goals for future ​success..
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;
