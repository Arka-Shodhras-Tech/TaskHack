import cors from "cors";
import express from 'express';
import { connectToDB, db } from './db.js';
const app = express()
let stop = false;
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.send("Ok continue");
})
// **************************************Student Register****************************************//
app.post("/studentdata", async (req, res) => {
    await db.collection("Studentdata").find().toArray()
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})
app.get("/viewphotos", async (req, res) => {
    try {
        const details = await db.collection("Materials").find().toArray();
        const formattedDetails = details.map((item) => ({
            id: item._id,
            Title: item.Title,
            Photo: item.Photo,
            Pdf: item.Pdf,
            Views: item.Views
        }));
        res.json(formattedDetails);
    } catch (error) {
        // Handle specific errors (e.g., database errors)
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/addphotos", async (req, res) => {
    const { title, photoUrl, pdfUrl } = req.body;
    await db.collection("Materials").insertOne({ Title: title, Photo: photoUrl, Pdf: pdfUrl, Views: 0 })
        .then(() => {
            res.json({ message: "Photos added successfully" });
        })
        .catch((error) => {
            console.error(error); // Log the error for debugging
            res.status(500).json({ error: "Internal server error" });
        });
});


app.get("/checkviews/:pdfurl", async (req, res) => {
    const { pdfurl } = req.params;

    try {
        const data = await db.collection("Materials").findOne({ Pdf: pdfurl });
        if (!data) {
            return res.status(404).json({ error: "PDF not found" }); // Specific error message
        }

        res.json(data); // Return the data if found
    } catch (error) {
        console.error("Error checking views:", error);
        res.status(500).json({ error: "Internal server error" }); // Generic error for unexpected issues
    }
});


app.put("/views/:viewers/:pdfurl", async (req, res) => {
    const { viewers, pdfurl } = req.params;
    try {
        const views = parseInt(viewers);
        if (isNaN(views)) {
            return res.status(400).json({ error: "Invalid viewers count" });
        }
        const result = await db.collection("Materials").updateOne({ Pdf: pdfurl }, { $set: { Views: views } });
        if (result.modifiedCount !== 1) {
            return res.status(404).json({ error: "PDF not found" });
        }
        res.json({ message: "Views updated successfully" });
    } catch (error) {
        console.error("Error updating views:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/teamworkdata", async (req, res) => {
    await db.collection("Studentdata").find().toArray()
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})

app.post("/addteamwork/:work/:startdate/:enddate/:teamname", async (req, res) => {
    await db.collection("Studentdata").findOne({ Teamname: req.params.teamname })
        .then(async (details) => {
            if (details) {
                await db.collection("Studentdata").findOneAndUpdate({ Teamname: req.params.teamname }, { $push: { TeamWork: { Work: req.params.work, Startdate: req.params.startdate, Enddate: req.params.enddate, Progress: "Pending", Credits: 0 } } })
                    .then((details) => {
                        res.json(details)
                    })
                    .catch((e) => console.log(e))
            }
            else {
                await db.collection("Studentdata").insertOne({ Teamname: req.params.teamname, TeamWork: [{ Work: req.params.work, Startdate: req.params.startdate, Enddate: req.params.enddate, Progress: "Pending", Credits: 0 }] })
                    .then((details) => {
                        res.json(details)
                    })
                    .catch((e) => console.log(e))
            }
        })
        .catch((e) => console.log(e))
})

app.post('/studentregister/:name/:mail/:number/:regi/:branch/:sec/:team', async (req, res) => {
    await db.collection("Studentdata").findOne({ Teamname: req.params.team })
        .then(async (details) => {
            if (details) {
                await db.collection("Studentdata").findOneAndUpdate({ Teamname: req.params.team }, { $push: { Teammembers: { Name: req.params.name, Gmail: req.params.mail, Phonenumber: req.params.number, Registernumber: req.params.regi, Branch: req.params.branch, Section: req.params.sec } } })
                    .then((details) => {
                        res.json(details)
                    })
                    .catch((e) => console.log(e))
            }
            else {
                await db.collection("Studentdata").insertOne({ Teamname: req.params.team, Teammembers: [{ Name: req.params.name, Gmail: req.params.mail, Phonenumber: req.params.number, Registernumber: req.params.regi, Branch: req.params.branch, Section: req.params.sec }] })
                    .then((details) => {
                        res.json(details)
                    })
                    .catch((e) => console.log(e))
            }
        })
        .catch((e) => console.log(e))
})

app.post("/verifyregister/:regd", async (req, res) => {
    await db.collection("Studentdata").findOne({ [`Teammembers.Registernumber`]: req.params.regd })
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})

app.post('/remove', async (req, res) => {
    await db.collection("Studentdata").findOneAndUpdate({ Teamname: req.body.rmv.item.Teamname }, { $pull: { Teammembers: { Registernumber: req.body.rmv.val.Registernumber } } })
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})



// ******************************************************Question and Answers****************************************//
app.post("/questions/", async (req, res) => {
    await db.collection("Exam").findOne({ Theme: req.body.theme })
        .then(async (details) => {
            if (details) {
                await db.collection("Exam").findOne({ [`List.Question`]: req.body.ques })
                    .then(async (details) => {
                        if (details) {
                            details.List.map(async (val, index) => {
                                if (val.Question === req.body.ques) {
                                    await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $set: { [`List.${index}.Answer`]: req.body.ans } })
                                        .then((details1) => {
                                            res.json(details1);
                                        })
                                        .catch((e) => console.log(e))
                                }
                            })
                        }
                        else {
                            await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $push: { List: { Question: req.body.ques, Answer: req.body.ans } } })
                                .then((details) => {
                                    res.json(details);
                                })
                                .catch((e) => console.log(e))
                        }
                    })
                    .catch((e) => console.log(e))
            }
            else {
                await db.collection("Exam").insertOne({ Theme: req.body.theme, List: [{ Question: req.body.ques, Answer: req.body.ans }] })
                    .then((details) => {
                        res.json(details);
                    })
                    .catch((e) => console.log(e))
            }
        })
        .catch((e) => console.log(e))
})


// *****************************************************Choose the correct answers*****************************************//
app.post("/chooseanswer/", async (req, res) => {
    await db.collection("Exam").findOne({ Theme: req.body.theme })
        .then(async (details) => {
            if (details) {
                await db.collection("Exam").findOne({ [`List.Question`]: req.body.ques })
                    .then(async (details) => {
                        if (details) {
                            details.List.map(async (val, index) => {
                                if (val.Question === req.body.ques) {
                                    await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $set: { [`List.${index}.Answer`]: req.body.ans } })
                                        .then((details1) => {
                                            res.json(details1);
                                        })
                                        .catch((e) => console.log(e))
                                }
                            })
                        }
                        else {
                            await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $push: { List: { Question: req.body.ques, Answer1: req.body.ans1, Answer2: req.body.ans2, Answer3: req.body.ans3, Answer4: req.body.ans4, Answer: req.body.ans } } })
                                .then((details) => {
                                    res.json(details);
                                })
                                .catch((e) => console.log(e))
                        }
                    })
                    .catch((e) => console.log(e))
            }
            else {
                await db.collection("Exam").insertOne({ Theme: req.body.theme, List: [{ Question: req.body.ques, Answer1: req.body.ans1, Answer2: req.body.ans2, Answer3: req.body.ans3, Answer4: req.body.ans4, Answer: req.body.ans }] })
                    .then((details) => {
                        res.json(details);
                    })
                    .catch((e) => console.log(e))
            }
        })
        .catch((e) => console.log(e))
})
app.post('/chooseanswer', async (req, res) => {
    await db.collection("Studentdata").findOne({ [`Teammembers.${req.body.ans1.index}.Registernumber`]: req.body.ans1.val.Registernumber })
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})


// *************************************************Fill in the blanks********************************************//
app.post("/fillbank/", async (req, res) => {
    await db.collection("Exam").findOne({ Theme: req.body.theme })
        .then(async (details) => {
            if (details) {
                await db.collection("Exam").findOne({ [`List.Question`]: req.body.ques })
                    .then(async (details) => {
                        if (details) {
                            details.List.map(async (val, index) => {
                                if (val.Question === req.body.ques) {
                                    await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $set: { [`List.${index}.Answer`]: req.body.ans } })
                                        .then((details1) => {
                                            res.json(details1);
                                        })
                                        .catch((e) => console.log(e))
                                }
                            })
                        }
                        else {
                            await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $push: { List: { Question: req.body.ques, Answer: req.body.ans } } })
                                .then((details) => {
                                    res.json(details);
                                })
                                .catch((e) => console.log(e))
                        }
                    })
                    .catch((e) => console.log(e))
            }
            else {
                await db.collection("Exam").insertOne({ Theme: req.body.theme, List: [{ Question: req.body.ques, Answer: req.body.ans }] })
                    .then((details) => {
                        res.json(details);
                    })
                    .catch((e) => console.log(e))
            }
        })
        .catch((e) => console.log(e))
})


// *************************************************Exam Data*******************************************//
app.post('/examdata', async (req, res) => {
    await db.collection("Exam").find().toArray()
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})


// ***************************************************After Exam Data**************************************//
app.post('/exam/', async (req, res) => {
    await db.collection("ExamSheet").findOne({ Registernumber: req.body.student })
        .then(async (details) => {
            if (details) {
                await db.collection("ExamSheet").findOne({ Registernumber: req.body.student, [`Paper.Question`]: req.body.question })
                    .then(async (details) => {
                        if (details) {
                            details.Paper.map(async (val, index) =>
                            (
                                val.Question === req.body.question &&
                                await db.collection("ExamSheet").findOneAndUpdate({ Registernumber: req.body.student }, { $set: { [`Paper.${index}.EnterAnswer`]: req.body.ans } })
                                    .then((details) => {
                                        res.json(details);
                                    })
                                    .catch((e) => console.log(e))
                            ))

                        }
                        else {
                            await db.collection("ExamSheet").findOneAndUpdate({ Registernumber: req.body.student }, { $push: { Paper: { Question: req.body.question, CorrectAnswer: req.body.answer, EnterAnswer: req.body.ans } } })
                                .then((details) => {
                                    res.json(details);
                                })
                                .catch((e) => console.log(e))
                        }
                    })
                    .catch((e) => console.log(e))
            }
            else {
                await db.collection("ExamSheet").insertOne({ Registernumber: req.body.student, Paper: [{ Question: req.body.question, CorrectAnswer: req.body.answer, EnterAnswer: req.body.ans }] })
                    .then((details) => {
                        res.json(details);
                    })
                    .catch((e) => console.log(e))
            }
        })
        .catch((e) => console.log(e))
})
app.post('/paperdata', async (req, res) => {
    await db.collection("ExamSheet").find().toArray()
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})




// ******************************************************Request***********************************************//
app.post('/request/:index/:regd', async (req, res) => {
    await db.collection("Studentdata").findOneAndUpdate({ [`Teammembers.${req.params.index}.Registernumber`]: req.params.regd }, { $set: { [`Teammembers.${req.params.index}.Request`]: true } })
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})
app.post('/acceptrequest/:index/:regd', async (req, res) => {
    await db.collection("Studentdata").findOneAndUpdate({ [`Teammembers.${req.params.index}.Registernumber`]: req.params.regd }, { $set: { [`Teammembers.${req.params.index}.Request`]: false, [`Teammembers.${req.params.index}.Confirm`]: true } })
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})


// *************************************Submit exam********************************************//
app.post('/sumitexam/:index/:regd/:marks', async (req, res) => {
    await db.collection("Studentdata").findOne({ [`Teammembers.${req.params.index}.Registernumber`]: req.params.regd })
        .then((details) => {
            details.Teammembers.map((val) => {
                if (val.Registernumber === req.params.regd) {
                    stop = true;
                    const marks = 0;
                    typeof (marks) === "number" && db.collection("Studentdata").findOneAndUpdate({ [`Teammembers.${req.params.index}.Registernumber`]: req.params.regd }, { $set: { [`Teammembers.${req.params.index}.Confirm`]: false, [`Teammembers.${req.params.index}.Marks`]: 0 } })
                        .then((details) => {
                            return res.json(details)
                        })
                        .catch((e) => console.log(e))
                }
                else {
                    if (!stop) {
                        db.collection("Studentdata").findOneAndUpdate({ [`Teammembers.${req.params.index}.Registernumber`]: req.params.regd }, { $set: { [`Teammembers.${req.params.index}.Confirm`]: false, [`Teammembers.${req.params.index}.Marks`]: req.params.marks } })
                            .then((details) => {
                                res.json(details)
                            })
                            .catch((e) => console.log(e))
                    }
                }
            })
        })
        .catch((e) => console.log(e))
})
app.post('/correctionanswer/', async (req, res) => {
    await db.collection("ExamSheet").findOne({ Registernumber: req.body.regd })
        .then((details) => {
            details.Paper.map((val, index) => {
                if (val.Question === req.body.question) {
                    db.collection("ExamSheet").findOneAndUpdate({ Registernumber: req.body.regd }, { $set: { [`Paper.${index}.Correction`]: true, [`Paper.${index}.Correct`]: true } })
                        .then((details) => {
                            if (details) {
                                db.collection("Studentdata").findOne({ [`Teammembers.Registernumber`]: req.body.regd })
                                    .then((details) => {
                                        details.Teammembers.map((val, index) => {
                                            if (val.Registernumber === req.body.regd) {
                                                const marks = parseInt(val.Marks) + parseInt(req.body.mark)
                                                typeof (marks) === "number" && db.collection("Studentdata").findOneAndUpdate({ [`Teammembers.${index}.Registernumber`]: req.body.regd }, { $set: { [`Teammembers.${index}.Marks`]: marks } })
                                                    .then((details) => {
                                                        return res.json(details)
                                                    })
                                                    .catch((e) => console.log(e))
                                            }
                                        })
                                    })
                                    .catch((e) => console.log(e))
                            }
                        })
                        .catch((e) => console.log(e))
                }
            })
        })
        .catch((e) => console.log(e))
})

app.post('/wronganswer/', async (req, res) => {
    let i = 0;
    await db.collection("ExamSheet").findOne({ Registernumber: req.body.regd })
        .then((details) => {
            details.Paper.map((val, index) => {
                i++;
                if (val.Question === req.body.question) {
                    db.collection("ExamSheet").findOneAndUpdate({ Registernumber: req.body.regd }, { $set: { [`Paper.${index}.Correction`]: true, [`Paper.${index}.Correct`]: false } })
                        .then((details) => {
                            return res.json(details)
                        })
                        .catch((e) => console.log(e))
                }
            });
        })
        .catch((e) => console.log(e))
})
app.post('/droptable/:collection', async (req, res) => {
    await db.collection("Studentdata").deleteOne({ Teamname: req.params.collection })
        .then((details) => {
            res.json(details)
        })
        .catch((e) => console.log(e))
})

app.post('/deleteques', async (req, res) => {
    await db.collection("Exam").findOneAndUpdate({ Theme: req.body.ans1 }, { $pull: { List: { Question: req.body.ques } } })
        .then((details) => {
            res.json(details);
        })
        .catch((e) => console.log(e))
})


app.post("/postwork/:team/:work/:credits/:status/:date", async (req, res) => {
    await db.collection("Studentdata").findOne({ Teamname: req.params.team })
        .then((details) => {
            details.TeamWork.map((val, index) => (
                val.Work === req.params.work &&
                db.collection("Studentdata").findOneAndUpdate({ Teamname: req.params.team }, {
                    $set: {
                        [`TeamWork.${index}.Progress`]: req.params.status,
                        [`TeamWork.${index}.Credits`]: req.params.credits,
                        [`TeamWork.${index}.Submited`]: req.params.status === "Complete" ? true : false,
                        [`TeamWork.${index}.Reject`]: req.params.status === "Reject" ? true : false,
                        [`TeamWork.${index}.Lastupdate`]: req.params.date
                    }
                })
                    .then((details1) => {
                        res.json({ message: "updated", data: details1 })
                    })
                    .catch((e) => console.log(e))
            ))
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });
});

app.post("/updatework/:team/:status/:work/:date", async (req, res) => {
    await db.collection("Studentdata").findOne({ Teamname: req.params.team })
        .then((details) => {
            details.TeamWork.map((val, index) => (
                val.Work === req.params.status &&
                db.collection("Studentdata").findOneAndUpdate({ Teamname: req.params.team }, {
                    $set: {
                        [`TeamWork.${index}.Work`]: req.params.work,
                        [`TeamWork.${index}.Enddate`]: req.params.date
                    }
                })
                    .then((details1) => {
                        res.json({ message: "updated", data: details1 })
                    })
                    .catch((e) => console.log(e))
            ))
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });
});


app.post("/deletework/:team/:work", async (req, res) => {
    await db.collection("Studentdata").findOne({ Teamname: req.params.team })
        .then((details) => {
            details.TeamWork.map(async (val, index) => (
                val.Work === req.params.work &&
                await db.collection("Studentdata").findOneAndUpdate({ Teamname: req.params.team }, { $pull: {TeamWork: {Work:req.params.work} } })
                    .then((details1) => {
                        res.json({ message: "deleted", data: details1 })
                    })
                    .catch((e) => console.log(e))
            ))
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });
});


connectToDB(() => {
    app.listen(9889, () => {
        console.log('server Running at port 9889')
    })
}
)



