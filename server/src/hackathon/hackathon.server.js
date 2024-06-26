import cors from "cors";
import express from 'express';
import session from 'express-session';
import { Resend } from 'resend';
import { AllTeamCodes, checkTeam } from "./Teams/checkteam.js";
import { CreateTeam } from "./Teams/createteams.js";
import { SelectTask, UnSelectTask } from "./bootcamp/tasks/selecttask.js";
import { StudentTasks, Tasks } from "./bootcamp/tasks/tasks.js";
import { CheckHackathon } from "./hacthonday/checkhackathon.js";
import { EndHackathon } from "./hacthonday/hackathonend.js";
import { StartHackathon } from "./hacthonday/hackathonstart.js";
import { FileByName, Materials } from "./materials/material.js";
import { LikeMati, ViewMati } from "./materials/updatematerials.js";
import { PSS } from "./problemstatements/pss.js";
import { SendOtp } from "./updateuser/senotp.js";
import { UpdatePasswordLink } from "./updateuser/updatelink.js";
import { UpdatePassword } from "./updateuser/updatepassword.js";
import { checkUser } from "./user/checkuser.js";
import { SignIn } from "./user/sigin.js";
import { SignUp } from "./user/signup.js";
import { UpdateGender } from "./user/updategender.js";

const resend = new Resend(process.env.Resend_Key);
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.get('/hackathon', async (req, res) => {
    res.send("Ok hacthon");
})

app.use(session({
    secret: 'ast-team',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


app.post('/start-hackathon', async (req, res) => {
    await StartHackathon(req.body, res);
})

app.post('/end-hackathon', async (req, res) => {
    await EndHackathon(req.body, res);
})

app.post('/check-hackathon/:mail', async (req, res) => {
    await CheckHackathon(req.params.mail, res);
})

app.post('/updategender/:regd/:gender', async (req, res) => {
    await UpdateGender(req.params.regd, req.params.gender, res);
})

app.post('/statements', async (req, res) => {
    await PSS(res);
})

app.post('/signup/:email/:name/:regd/:num/:year/:branch/:section', async (req, res) => {
    await SignUp(req,res)
})

app.post('/signin', async (req, res) => {
    await SignIn(req,resend,res)
});

app.post('/authuser/:regd', async (req, res) => {
    await checkUser(req.params.regd, res)
})

app.post('/updatepasswordlink', async (req, res) => {
    await UpdatePasswordLink(req,resend,res)
});

app.post('/sendotp', async (req, res) => {
    await SendOtp(req,resend,res);
});

app.post('/updatepassword', async (req, res) => {
    await UpdatePassword(req,res)
});

app.post('/selecttask', async (req, res) => {
    await SelectTask(req.body.user,req.body.task,req.body.marks,req.body.desc,req.body.day,res);
})

app.post('/unselecttask', async (req, res) => {
    await UnSelectTask(req.body.user,req.body.task,req.body.day,res);
})

app.post('/bootcamptasks', async (req, res) => {
    await Tasks(res)
});

app.post('/Students', async (req, res) => {
    await StudentTasks(res)
});

app.post('/files', async (req, res) => {
    await Materials(res)
});

app.get('/file/:filename', async (req, res) => {
    const { filename } = req.params;
    await FileByName(filename, res)
});

app.post('/likes', async (req, res) => {
    await LikeMati(req.body.theme,req.body.user,req.body.index,res)
});

app.post('/views', async (req, res) => {
    await ViewMati(req.body.theme,req.body.index,res)
});

// ***************************************** Hacthon *********************************************** //
app.post('/createteam/:team/:gmail/:phone/:code/:members/:password', async (req, res) => {
    await CreateTeam(req,res);
})

app.post('/checkteam', async (req, res) => {
    await checkTeam(req.body.code,res)
});

app.post('/teamscodes', async (req, res) => {
    await AllTeamCodes(res)
})
export default app