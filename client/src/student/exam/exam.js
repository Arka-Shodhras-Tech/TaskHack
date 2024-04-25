import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export const Exam = () => {
  const pageparam = new URLSearchParams(window.location.search);
  const page1 = pageparam.get("questions");
  const page2 = pageparam.get("choose answer");
  const page3 = pageparam.get("fill in the blank");
  const [data, sdata] = useState([]);
  const [data1, sdata1] = useState([]);
  const [teamname, steamname] = useState();
  const [regd, sregd] = useState();
  const [ques, sques] = useState(page1);
  const [blank, sblank] = useState(page3);
  const [choose, schoose] = useState(page2);
  const [ans, sans] = useState();
  const [ans1, sans1] = useState();
  const [marks, smarks] = useState(0);
  const [btns, sbtns] = useState();
  const [i, si] = useState(0);
  const [j, sj] = useState(0);
  const [load, sload] = useState(false);
  const [all, sall] = useState(!page1 && !page2 && !page3);
  const [btnlen, sbtnlen] = useState([]);

  const buttonref = useRef(null);

  const Request = async () => {
    const btn = document.getElementById(btns);
    btn.innerHTML = "Please wait....";
    await axios
      .post(
        `${process.env.REACT_APP_Server}/request/` +
          regd.index +
          "/" +
          regd.val.Registernumber
      )
      .then((res) => {
        if (res.data) {
          btn.innerHTML = "Request sent";
        } else {
          btn.innerHTML = "Request failed try again";
        }
      })
      .catch((e) => console.log(e));
  };
  const Submit = async () => {
    sload(true);
    if (
      JSON.parse(sessionStorage.getItem(`${ans1.val.Question}`))?.question ===
      ans1.val.Question
        ? JSON.parse(sessionStorage.getItem(`${ans1.val.Question}`)).answer
        : ans
    ) {
      let student = sessionStorage.student;
      let index = i;
      let question = ans1.val.Question;
      let answer = ans1.val.Answer;
      await axios
        .post(`${process.env.REACT_APP_Server}/exam/`, {
          student,
          index,
          question,
          answer,
          ans:
            JSON.parse(sessionStorage.getItem(`${ans1.val.Question}`))
              ?.question === ans1.val.Question
              ? JSON.parse(sessionStorage.getItem(`${ans1.val.Question}`))
                  .answer
              : ans,
        })
        .then((res) => {
          if (res.data) {
            if (ans1.len === i) {
              document.getElementById("blank").click();
            } else {
              si(i + 1);
            }
            sans("");
            sload(false);
          } else {
            alert("Try again");
            sload(false);
          }
        })
        .catch((e) => console.log(e));
    } else {
      alert("Enter answer and submit");
      sload(false);
    }
  };
  const Choosesubmit = async () => {
    if (ans && ans1) {
      if (ans1.val.Answer === ans) {
        smarks(marks + 1);
      }
      si(i + 1);
      sj(j + 1);
      sans("");
    } else {
      alert("Choose one option");
    }
  };
  const Submitexam = async () => {
    document.getElementById(ans1.index).innerHTML = "Please wait";
    await axios
      .post(
        `${process.env.REACT_APP_Server}/sumitexam/` +
          ans1.index +
          "/" +
          ans1.val.Registernumber +
          "/" +
          marks
      )
      .then((res) => {
        if (res.data) {
          document.getElementById(ans1.index).innerHTML = "Submitted exam";
          sessionStorage.removeItem("student");
          window.location.reload(5);
        } else {
          document.getElementById(ans1.index).innerHTML = "please again submit";
        }
      })
      .catch(
        (e) => (document.getElementById(ans1.index).innerHTML = "Network Error")
      );
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        try {
          // buttonref.current.click();
          // alert("Exam Submitted Sucessfully");
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    });
  }, []);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_Server}/studentdata`)
      .then((res) => {
        sdata1(res.data);
      })
      .catch((e) => console.log(e));
    axios
      .post(`${process.env.REACT_APP_Server}/examdata`)
      .then((res) => {
        sdata(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    data.map(
      (val) => (
        val.Theme === "fill in the blank" && page3 && sbtnlen(val),
        val.Theme === "Choose the correct answer" && page2 && sbtnlen(val),
        val.Theme === "Question and Answer" && page1 && sbtnlen(val)
      )
    );
  });
  // console.log(btnlen)
  return (
    <>
      <div className="container team-container">
        <input
          className="my-dropdown1"
          placeholder="Enter Team Name"
          onChange={(e) => steamname(e.target.value.toUpperCase())}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>OR</h3>
        </div>
        <select
          className="my-dropdown"
          onChange={(e) => steamname(e.target.value)}
        >
          <option>Select Your Team</option>
          {data1.map((val) => (
            <option>{val.Teamname}</option>
          ))}
        </select>
        <table className="table table-striped border">
          {data1.map((item) =>
            item.Teamname === teamname ? (
              <>
                <thead>
                  <tr>
                    <th colSpan="4" className="text-center">
                      Team Name:{item.Teamname}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="text-center">
                      S.NO
                    </th>
                    <th scope="col" className="text-center">
                      Students
                    </th>
                    <th scope="col" className="text-center">
                      Confirm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.Teammembers.map((val, index) => (
                    <tr>
                      <th scope="row" className="text-center">
                        {index + 1}
                      </th>
                      <td className="text-center">{val.Name}</td>
                      <td className="text-center">{val.Registernumber}</td>
                      <td className="text-center">
                        {val.Confirm ? (
                          <button
                            id={val.Registernumber}
                            type="button"
                            className="btn btn-success"
                          >
                            Accepted
                          </button>
                        ) : (
                          <button
                            id={val.Registernumber}
                            type="button"
                            className="btn btn-success"
                            onClick={Request}
                            onClickCapture={() => {
                              sregd({ val, index });
                              sbtns(val.Registernumber);
                            }}
                          >
                            {val.Confirm ? "Accepted" : "Request"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <b />
            )
          )}
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "center", color: "red" }}>
        <p>
          <b>Note:</b>Submit your exam then your paper go to under verifaction,
          otherwise your lost your score
        </p>
      </div>
      <div className="container">
        <div className="container team-container">
          <table className="table table-striped border">
            <thead>
              <tr>
                <td className="text-center">
                  <Link
                    to="/192.5264.27?questions=true"
                    className="qtn-btns"
                    id="ques"
                    onClick={() => {
                      sques(true);
                      schoose(false);
                      sblank(false);
                      si(0);
                      sall(false);
                    }}
                  >
                    Questions
                  </Link>
                </td>
                <td className="text-center">
                  <Link
                    to="/192.5264.27?choose answer=true"
                    className="qtn-btns2"
                    id="choose"
                    onClick={() => {
                      sques(false);
                      schoose(true);
                      sblank(false);
                      si(0);
                      sall(false);
                    }}
                  >
                    Choose the correct Answers
                  </Link>
                </td>
                <td className="text-center">
                  <Link
                    to="/192.5264.27?fill in the blank=true"
                    className="qtn-btns1"
                    id="blank"
                    onClick={() => {
                      sques(false);
                      schoose(false);
                      sblank(true);
                      si(0);
                      sall(false);
                    }}
                  >
                    Fill in the blanks
                  </Link>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <div className="question-buttons ">
            {/* {Array.from({ length: btnlen }, (_, index) => (
                            <div key={index}>
                                <Button
                                    className={`question-button ${isActive[index] ? "active" : ""
                                        } ${isSubmitted[index] ? "submitted" : ""}`}
                                    onClick={() => handleButtonClick(index)}
                                >
                                    {index + 1}
                                </Button>
                            </div>
                        ))} */}
            {btnlen?.List?.map((val, index) => (
              <div key={val}>
                <Button
                  className={`question-button`}
                  onClick={() => si(index)}
                  style={{
                    backgroundColor: JSON.parse(
                      sessionStorage.getItem(`${val?.Question + index}`)
                    )?.submit
                      ? "green":JSON.parse(
                        sessionStorage.getItem(`${val?.Question + "next"}`)
                      )?.next?"orange":"blue",
                  }}
                >
                  {index + 1}
                </Button>
                {console.log(
                  JSON.parse(sessionStorage.getItem(`${val?.Question + index}`))
                    ?.submit
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data1.map((item) =>
            item.Teammembers.map((val, index) =>
              val.Registernumber === sessionStorage.student && val.Confirm ? (
                <table className="table1  w-75">
                  <thead>
                    <tr>
                      <th>{val.Registernumber}</th>
                      <th>{val.Name}</th>
                      <th>{val.Branch}</th>
                      <th>{val.Section}</th>
                      <th>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            id={index}
                            ref={buttonref}
                            style={{ background: "orange" }}
                            onClick={Submitexam}
                            onClickCapture={() => {
                              sans1({ val, index });
                              sbtns(item.Theme);
                            }}
                          >
                            {" Submit Exam"}
                          </Button>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {/* Fill in the blanks */}
                  {data.map((item) => {
                    return (
                      item.Theme === "fill in the blank" &&
                      blank &&
                      item.List[i] && (
                        <>
                          <thead>
                            <th colSpan={5}>
                              {() =>
                                item.Theme === "fill in the blank" && blank
                              }
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <label>
                                  <b>{item.Theme}</b>
                                </label>
                              </div>
                            </th>
                          </thead>
                          <tbody>
                            {item.Theme === "fill in the blank" &&
                              item.List[i] && (
                                <>
                                  <tr>
                                    <td className="tdquestion">
                                      <b>Question {i + 1}</b>
                                    </td>
                                    <td colSpan={5}>
                                      {item.List[i]?.Question}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Answer</b>
                                    </td>
                                    <td colSpan={5}>
                                      <textarea
                                        type="text"
                                        value={
                                          JSON.parse(
                                            sessionStorage.getItem(
                                              `${item.List[i]?.Question}`
                                            )
                                          )?.question === item.List[i]?.Question
                                            ? JSON.parse(
                                                sessionStorage.getItem(
                                                  `${item.List[i]?.Question}`
                                                )
                                              )?.answer
                                            : ans
                                        }
                                        style={{
                                          border: "none",
                                          borderBottom: "black solid 2px",
                                          background: "none",
                                        }}
                                        onChange={(e) => {
                                          sans(e.target.value);
                                          sessionStorage[
                                            `${item.List[i]?.Question}`
                                          ] = JSON.stringify({
                                            question: item.List[i].Question,
                                            answer: e.target.value,
                                          });
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={5}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                        }}
                                      >
                                        <Button
                                          onClick={() => {
                                            si(i - 1);
                                            i === -0
                                              ? document
                                                  .getElementById("ques")
                                                  .click()
                                              : sblank(true);
                                          }}
                                        >
                                          Previous
                                        </Button>
                                        <Button
                                          id={item.Theme}
                                          onClick={Submit}
                                          onClickCapture={() => {
                                            sans1({
                                              val: item.List[i],
                                              index: i,
                                            });
                                            sbtns(item.Theme);
                                            sessionStorage[
                                                `${item.List[i]?.Question + i}`
                                              ] = JSON.stringify({
                                                submit: true,
                                              });
                                          }}
                                        >
                                          {load ? "submitting..." : "Submit"}
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            si(i + 1);
                                            i === item.List.length - 1
                                              ? document
                                                  .getElementById("choose")
                                                  .click()
                                              : sblank(true);
                                              sessionStorage[
                                                `${item.List[i]?.Question+"next"}`
                                              ] = JSON.stringify({
                                                next: true,
                                              });
                                          }}
                                        >
                                          Next
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                  <br />
                                  <br />
                                </>
                              )}
                          </tbody>
                        </>
                      )
                    );
                  })}

                  {/* choose the correct answers */}
                  {data.map(
                    (item) =>
                      item.Theme === "Choose the correct answer" &&
                      choose &&
                      item.List[i] && (
                        <>
                          <thead>
                            <th colSpan={5}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <label>
                                  <b>{item.Theme}</b>
                                </label>
                              </div>
                            </th>
                          </thead>
                          <tr>
                            <td className="tdquestion">
                              <b>Question {i + 1}</b>
                            </td>
                            <td colSpan={5}>{item.List[i]?.Question}</td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                id={item.List[i]?.Answer1}
                                name={item.List[i]?.Question}
                                type="radio"
                                value={
                                  JSON.parse(
                                    sessionStorage.getItem(
                                      `${item.List[i]?.Question}`
                                    )
                                  )?.question === item.List[i]?.Question
                                    ? JSON.parse(
                                        sessionStorage.getItem(
                                          `${item.List[i]?.Question}`
                                        )
                                      )?.answer === item.List[i]?.Answer1
                                      ? item.List[i]?.Answer1
                                      : ans
                                    : ans
                                }
                                onClick={(e) => {
                                  sans(item.List[i]?.Answer1);
                                  sessionStorage[`${item.List[i]?.Question}`] =
                                    JSON.stringify({
                                      question: item.List[i].Question,
                                      answer: item.List[i]?.Answer1,
                                    });
                                }}
                              />
                            </td>
                            <td colSpan={5}>
                              <label for={item.List[i]?.Answer1}>
                                {item.List[i]?.Answer1}
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                id={item.List[i]?.Answer2}
                                name={item.List[i]?.Question}
                                type="radio"
                                value={
                                  JSON.parse(
                                    sessionStorage.getItem(
                                      `${item.List[i]?.Question}`
                                    )
                                  )?.question === item.List[i]?.Question
                                    ? JSON.parse(
                                        sessionStorage.getItem(
                                          `${item.List[i]?.Question}`
                                        )
                                      )?.answer === item.List[i]?.Answer1
                                    : ans
                                }
                                onClick={(e) => {
                                  sans(item.List[i]?.Answer2);
                                  sessionStorage[`${item.List[i]?.Question}`] =
                                    JSON.stringify({
                                      question: item.List[i].Question,
                                      answer: item.List[i]?.Answer2,
                                    });
                                }}
                              />
                            </td>
                            <td colSpan={5}>
                              <label for={item.List[i]?.Answer2}>
                                {item.List[i]?.Answer2}
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                id={item.List[i]?.Answer3}
                                name={item.List[i]?.Question}
                                type="radio"
                                value={
                                  JSON.parse(
                                    sessionStorage.getItem(
                                      `${item.List[i]?.Question}`
                                    )
                                  )?.question === item.List[i]?.Question
                                    ? JSON.parse(
                                        sessionStorage.getItem(
                                          `${item.List[i]?.Question}`
                                        )
                                      )?.answer === item.List[i]?.Answer1
                                    : ans
                                }
                                onClick={(e) => {
                                  sans(item.List[i]?.Answer3);
                                  sessionStorage[`${item.List[i]?.Question}`] =
                                    JSON.stringify({
                                      question: item.List[i].Question,
                                      answer: item.List[i]?.Answer3,
                                    });
                                }}
                              />
                            </td>
                            <td colSpan={5}>
                              <label for={item.List[i]?.Answer3}>
                                {item.List[i]?.Answer3}
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                id={item.List[i]?.Answer4}
                                name={item.List[i]?.Question}
                                type="radio"
                                value={
                                  JSON.parse(
                                    sessionStorage.getItem(
                                      `${item.List[i]?.Question}`
                                    )
                                  )?.question === item.List[i]?.Question
                                    ? JSON.parse(
                                        sessionStorage.getItem(
                                          `${item.List[i]?.Question}`
                                        )
                                      )?.answer === item.List[i]?.Answer1
                                    : ans
                                }
                                onClick={(e) => {
                                  sans(item.List[i]?.Answer4);
                                  sessionStorage[`${item.List[i]?.Question}`] =
                                    JSON.stringify({
                                      question: item.List[i].Question,
                                      answer: item.List[i]?.Answer4,
                                    });
                                }}
                              />
                            </td>
                            <td colSpan={5}>
                              <label for={item.List[i]?.Answer4}>
                                {item.List[i]?.Answer4}
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={5}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    si(i - 1);
                                    sans("");
                                    i === -0
                                      ? document.getElementById("blank").click()
                                      : schoose(true);
                                  }}
                                >
                                  Previous
                                </Button>
                                <Button
                                  id={item.Theme + i}
                                  onClick={Choosesubmit}
                                  onClickCapture={() => {
                                    sans1({ val: item.List[i], index: i });
                                    sbtns(item.Theme + i);
                                    sessionStorage[
                                        `${item.List[i]?.Question + i}`
                                      ] = JSON.stringify({
                                        submit: true,
                                      });
                                  }}
                                >
                                  {load ? "submitting..." : "Submit"}
                                </Button>
                                <Button
                                  onClick={() => {
                                    si(i + 1);
                                    sans("");
                                    i === item.List.length - 1
                                      ? document.getElementById("ques").click()
                                      : schoose(true);
                                      sessionStorage[
                                        `${item.List[i]?.Question+"next"}`
                                      ] = JSON.stringify({
                                        next: true,
                                      });
                                  }}
                                >
                                  Next
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <br />
                          <br />
                        </>
                      )
                  )}

                  {/* Questionn and answers */}
                  {data.map(
                    (item) =>
                      item.Theme === "Question and Answer" &&
                      ques && (
                        <>
                          <thead>
                            <th colSpan={5}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <label>
                                  <b>{item.Theme}</b>
                                </label>
                              </div>
                            </th>
                          </thead>
                          <tbody>
                            {item.Theme === "Question and Answer" &&
                              item.List[i] && (
                                <>
                                  <tr>
                                    <td className="tdquestion">
                                      <b>Question {i + 1} </b>
                                    </td>
                                    <td colSpan={5}>
                                      {item.List[i]?.Question}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <b>Answer</b>
                                    </td>
                                    <td colSpan={5}>
                                      <textarea
                                        type="text"
                                        value={
                                          JSON.parse(
                                            sessionStorage.getItem(
                                              `${item.List[i]?.Question}`
                                            )
                                          )?.question === item.List[i]?.Question
                                            ? JSON.parse(
                                                sessionStorage.getItem(
                                                  `${item.List[i]?.Question}`
                                                )
                                              ).answer
                                            : ans
                                        }
                                        style={{
                                          border: "none",
                                          borderBottom: "black solid 2px",
                                          background: "none",
                                        }}
                                        onChange={(e) => {
                                          sans(e.target.value);
                                          sessionStorage[
                                            `${item.List[i]?.Question}`
                                          ] = JSON.stringify({
                                            question: item.List[i].Question,
                                            answer: e.target.value,
                                          });
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={5}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                        }}
                                      >
                                        <Button
                                          onClick={() => {
                                            si(i - 1);
                                            i === -0
                                              ? document
                                                  .getElementById("choose")
                                                  .click()
                                              : sques(true);
                                          }}
                                        >
                                          Previous
                                        </Button>
                                        <Button
                                          id={item.List[i]}
                                          onClick={Submit}
                                          onClickCapture={() => {
                                            sans1({
                                              val: item.List[i],
                                              index: i,
                                              len: item.List.length - 1,
                                            });
                                            sbtns(item.List[i]);
                                            sessionStorage[
                                              `${item.List[i]?.Question + i}`
                                            ] = JSON.stringify({
                                              submit: true,
                                            });
                                          }}
                                        >
                                          {load ? "submitting..." : "Submit"}
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            si(i + 1);
                                            i === item.List.length - 1
                                              ? document
                                                  .getElementById("blank")
                                                  .click()
                                              : sques(true);
                                            sans("");
                                            sessionStorage[
                                              `${item.List[i]?.Question+"next"}`
                                            ] = JSON.stringify({
                                              next: true,
                                            });
                                          }}
                                        >
                                          Next
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                  <br />
                                  <br />
                                </>
                              )}
                          </tbody>
                        </>
                      )
                  )}

                  {data.map(
                    (item) =>
                      all &&
                      item.Theme && (
                        <>
                          <thead>
                            <th colSpan={5}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <label>
                                  <b>{item.List[i] ? item.Theme : <b />}</b>
                                </label>
                              </div>
                            </th>
                          </thead>
                          <tbody>
                            {item.List.map((val, index) => (
                              <>
                                <tr>
                                  <td className="tdquestion">
                                    <b>Question {index + 1}</b>
                                  </td>
                                  <td colSpan={5}>{val.Question}</td>
                                </tr>
                                {val.Answer1 && (
                                  <>
                                    <tr>
                                      <td>
                                        <input
                                          id={val.Answer1}
                                          name="same"
                                          type="radio"
                                          value={val.Answer1}
                                          onChange={(e) => sans(e.target.value)}
                                        />
                                      </td>
                                      <td colSpan={5}>
                                        <label for={val.Answer1}>
                                          {val.Answer1}
                                        </label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <input
                                          id={val.Answer2}
                                          name="same"
                                          type="radio"
                                          value={val.Answer2}
                                          onChange={(e) => sans(e.target.value)}
                                        />
                                      </td>
                                      <td colSpan={5}>
                                        <label for={val.Answer2}>
                                          {val.Answer2}
                                        </label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <input
                                          id={val.Answer3}
                                          name="same"
                                          type="radio"
                                          value={val.Answer3}
                                          onChange={(e) => sans(e.target.value)}
                                        />
                                      </td>
                                      <td colSpan={5}>
                                        <label for={val.Answer3}>
                                          {val.Answer3}
                                        </label>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <input
                                          id={val.Answer4}
                                          name="same"
                                          type="radio"
                                          value={val.Answer4}
                                          onChange={(e) => sans(e.target.value)}
                                        />
                                      </td>
                                      <td colSpan={5}>
                                        <label for={val.Answer4}>
                                          {val.Answer4}
                                        </label>
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </>
                            ))}
                          </tbody>
                        </>
                      )
                  )}
                </table>
              ) : (
                <b />
              )
            )
          )}
        </div>
      </div>
    </>
  );
};
