import cors from "cors";
import express from 'express';
import { connectToDB, db } from './db.js';
const app=express()
let stop=false;
app.use(express.json())
app.use(cors())

app.get('/',async(req,res)=>
{
    res.send("Ok continue");
})
// **************************************Student Register****************************************//
app.post("/studentdata",async(req,res)=>
{
    await db.collection("Studentdata").find().toArray()
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})
app.post('/studentregister/:name/:mail/:number/:regi/:branch/:sec/:team',async(req,res)=>
{
    await db.collection("Studentdata").findOne({Teamname:req.params.team})
    .then(async(details)=>
    {
        if(details)
        {
            await db.collection("Studentdata").findOneAndUpdate({Teamname:req.params.team},{$push:{Teammembers:{Name:req.params.name,Gmail:req.params.mail,Phonenumber:req.params.number,Registernumber:req.params.regi,Branch:req.params.branch,Section:req.params.sec}}})
            .then((details)=>
            {
                res.json(details)
            })
            .catch((e)=>console.log(e))
        }
        else
        {
            await db.collection("Studentdata").insertOne({Teamname:req.params.team,Teammembers:[{Name:req.params.name,Gmail:req.params.mail,Phonenumber:req.params.number,Registernumber:req.params.regi,Branch:req.params.branch,Section:req.params.sec}]})
            .then((details)=>
            {
                res.json(details)
            })
            .catch((e)=>console.log(e))
        }
    })
    .catch((e)=>console.log(e))
})
app.post("/verifyregister/:regd",async(req,res)=>
{
    await db.collection("Studentdata").findOne({[`Teammembers.Registernumber`]:req.params.regd})
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})
app.post('/remove',async(req,res)=>
{
    await db.collection("Studentdata").findOneAndUpdate({Teamname:req.body.rmv.item.Teamname},{$pull:{Teammembers:{Registernumber:req.body.rmv.val.Registernumber}}})
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})



// ******************************************************Question and Answers****************************************//
app.post("/questions/",async(req,res)=>
{
    await db.collection("Exam").findOne({Theme:req.body.theme})
    .then(async(details)=>
    {
        if(details)
        {
            await db.collection("Exam").findOne({[`List.Question`]:req.body.ques})
            .then(async(details)=>
            {
                if (details) {
                    details.List.map(async(val,index) => {
                        if (val.Question === req.body.ques)
                        {
                            await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $set: { [`List.${index}.Answer`]: req.body.ans } })
                            .then((details1) => {
                                res.json(details1);
                            })
                            .catch((e) => console.log(e))
                        }
                    })
                }
                else
                {
                    await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $push: { List: { Question: req.body.ques, Answer: req.body.ans } } })
                        .then((details) => {
                            res.json(details);
                        })
                        .catch((e) => console.log(e))
                }
            })
                .catch((e) => console.log(e))
        }
        else
        {
            await db.collection("Exam").insertOne({Theme:req.body.theme,List:[{Question:req.body.ques,Answer:req.body.ans}]})
            .then((details)=>
            {
                res.json(details);
            })
            .catch((e)=>console.log(e))
        }
    })
    .catch((e)=>console.log(e))
})


// *****************************************************Choose the correct answers*****************************************//
app.post("/chooseanswer/",async(req,res)=>
{
    await db.collection("Exam").findOne({Theme:req.body.theme})
    .then(async(details)=>
    {
        if(details)
        {
            await db.collection("Exam").findOne({[`List.Question`]:req.body.ques})
            .then(async(details)=>
            {
                if (details) {
                    details.List.map(async(val,index) => {
                        if (val.Question === req.body.ques)
                        {
                            await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $set: { [`List.${index}.Answer`]: req.body.ans } })
                            .then((details1) => {
                                res.json(details1);
                            })
                            .catch((e) => console.log(e))
                        }
                    })
                }
                else
                {
                    await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $push: { List: { Question: req.body.ques,Answer1:req.body.ans1,Answer2:req.body.ans2,Answer3:req.body.ans3,Answer4:req.body.ans4,Answer: req.body.ans } } })
                        .then((details) => {
                            res.json(details);
                        })
                        .catch((e) => console.log(e))
                }
            })
                .catch((e) => console.log(e))
        }
        else
        {
            await db.collection("Exam").insertOne({Theme:req.body.theme,List:[{Question:req.body.ques,Answer1:req.body.ans1,Answer2:req.body.ans2,Answer3:req.body.ans3,Answer4:req.body.ans4,Answer:req.body.ans}]})
            .then((details)=>
            {
                res.json(details);
            })
            .catch((e)=>console.log(e))
        }
    })
    .catch((e)=>console.log(e))
})
app.post('/chooseanswer',async(req,res)=>
{
    await db.collection("Studentdata").findOne({[`Teammembers.${req.body.ans1.index}.Registernumber`]:req.body.ans1.val.Registernumber})
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})


// *************************************************Fill in the blanks********************************************//
app.post("/fillbank/",async(req,res)=>
{
    await db.collection("Exam").findOne({Theme:req.body.theme})
    .then(async(details)=>
    {
        if(details)
        {
            await db.collection("Exam").findOne({[`List.Question`]:req.body.ques})
            .then(async(details)=>
            {
                if (details) {
                    details.List.map(async(val,index) => {
                        if (val.Question === req.body.ques) {
                            await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $set: { [`List.${index}.Answer`]: req.body.ans } })
                                .then((details1) => {
                                    res.json(details1);
                                })
                                .catch((e) => console.log(e))
                        }
                    })
                }
                else
                {
                    await db.collection("Exam").findOneAndUpdate({ Theme: req.body.theme }, { $push: { List: { Question: req.body.ques, Answer: req.body.ans } } })
                        .then((details) => {
                            res.json(details);
                        })
                        .catch((e) => console.log(e))
                }
            })
                .catch((e) => console.log(e))
        }
        else
        {
            await db.collection("Exam").insertOne({Theme:req.body.theme,List:[{Question:req.body.ques,Answer:req.body.ans}]})
            .then((details)=>
            {
                res.json(details);
            })
            .catch((e)=>console.log(e))
        }
    })
    .catch((e)=>console.log(e))
})


// *************************************************Exam Data*******************************************//
app.post('/examdata',async(req,res)=>
{
    await db.collection("Exam").find().toArray()
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})


// ***************************************************After Exam Data**************************************//
app.post('/exam/',async(req,res)=>
{
    await db.collection("ExamSheet").findOne({Registernumber:req.body.student})
    .then(async(details)=>
    {
        if(details)
        {
            await db.collection("ExamSheet").findOne({Registernumber:req.body.student,[`Paper.Question`]:req.body.question})
            .then(async(details)=>
            {
                if(details)
                {
                    details.Paper.map(async(val,index)=>
                    (
                        val.Question===req.body.question&&
                        await db.collection("ExamSheet").findOneAndUpdate({ Registernumber:req.body.student }, {$set:{[`Paper.${index}.EnterAnswer`]:req.body.ans}})
                        .then((details) =>
                        {
                            res.json(details);
                        })
                        .catch((e) => console.log(e))
                    ))
                    
                }
                else
                {
                    await db.collection("ExamSheet").findOneAndUpdate({ Registernumber:req.body.student}, { $push: { Paper: { Question:req.body.question,CorrectAnswer:req.body.answer,EnterAnswer:req.body.ans } } })
                        .then((details) => {
                            res.json(details);
                        })
                        .catch((e) => console.log(e))
                }
            })
                .catch((e) => console.log(e))
        }
        else
        {
            await db.collection("ExamSheet").insertOne({Registernumber:req.body.student,Paper:[{Question:req.body.question,CorrectAnswer:req.body.answer,EnterAnswer:req.body.ans}]})
            .then((details)=>
            {
                res.json(details);
            })
            .catch((e)=>console.log(e))
        }
    })
    .catch((e)=>console.log(e))
})
app.post('/paperdata',async(req,res)=>
{
    await db.collection("ExamSheet").find().toArray()
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})




// ******************************************************Request***********************************************//
app.post('/request/:index/:regd',async(req,res)=>
{
    await db.collection("Studentdata").findOneAndUpdate({[`Teammembers.${req.params.index}.Registernumber`]:req.params.regd},{$set:{[`Teammembers.${req.params.index}.Request`]:true}})
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})
app.post('/acceptrequest/:index/:regd',async(req,res)=>
{
    await db.collection("Studentdata").findOneAndUpdate({[`Teammembers.${req.params.index}.Registernumber`]:req.params.regd},{$set:{[`Teammembers.${req.params.index}.Request`]:false,[`Teammembers.${req.params.index}.Confirm`]:true}})
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})


// *************************************Submit exam********************************************//
app.post('/sumitexam/:index/:regd/:marks',async(req,res)=>
{
    await db.collection("Studentdata").findOne({[`Teammembers.${req.params.index}.Registernumber`]:req.params.regd})
    .then((details)=>
    {
        details.Teammembers.map((val)=>
        {
            if(val.Registernumber===req.params.regd)
            {
                stop=true;
                const marks=0;
                typeof(marks)==="number" && db.collection("Studentdata").findOneAndUpdate({ [`Teammembers.${req.params.index}.Registernumber`]: req.params.regd }, { $set: { [`Teammembers.${req.params.index}.Confirm`]: false ,[`Teammembers.${req.params.index}.Marks`]:0} })
                    .then((details) =>
                    {
                        return res.json(details)
                    })
                    .catch((e) => console.log(e))
            }
            else
            {
                if(!stop)
                {
                    db.collection("Studentdata").findOneAndUpdate({ [`Teammembers.${req.params.index}.Registernumber`]: req.params.regd }, { $set: { [`Teammembers.${req.params.index}.Confirm`]: false,[`Teammembers.${req.params.index}.Marks`]:req.params.marks } })
                    .then((details) => 
                    {
                        res.json(details)
                    })
                    .catch((e) => console.log(e))
                }
            }
        })
    })
    .catch((e)=>console.log(e))
})
app.post('/correctionanswer/',async(req,res)=>
{
    await db.collection("ExamSheet").findOne({Registernumber:req.body.regd})
    .then((details)=>
    {
        details.Paper.map((val,index)=>
        {
            if(val.Question===req.body.question)
            {
                db.collection("ExamSheet").findOneAndUpdate({Registernumber:req.body.regd}, { $set: {[`Paper.${index}.Correction`]: true,[`Paper.${index}.Correct`]:true } })
                    .then((details) =>
                    {
                        if(details)
                        {
                            db.collection("Studentdata").findOne({ [`Teammembers.Registernumber`]: req.body.regd })
                            .then((details) => {
                                details.Teammembers.map((val, index) => {
                                    if (val.Registernumber === req.body.regd) {
                                        const marks = parseInt(val.Marks) + parseInt(req.body.mark)
                                        typeof(marks)==="number" && db.collection("Studentdata").findOneAndUpdate({ [`Teammembers.${index}.Registernumber`]: req.body.regd }, { $set: { [`Teammembers.${index}.Marks`]: marks } })
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
    .catch((e)=>console.log(e))
})

app.post('/wronganswer/',async(req,res)=>
{
    let i=0;
    await db.collection("ExamSheet").findOne({Registernumber:req.body.regd})
    .then((details)=>
    {
        details.Paper.map((val,index)=>
        {
            i++;
            if(val.Question===req.body.question)
            {
                db.collection("ExamSheet").findOneAndUpdate({Registernumber:req.body.regd}, { $set: {[`Paper.${index}.Correction`]: true,[`Paper.${index}.Correct`]:false } })
                    .then((details) =>
                    {
                        return res.json(details)
                    })
                    .catch((e) => console.log(e))
            }
            });
        })
        .catch((e)=>console.log(e))
    })
app.post('/droptable/:collection',async(req,res)=>
{
    await db.collection("Studentdata").deleteOne({Teamname:req.params.collection})
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})

app.post('/deleteques',async(req,res)=>
{
    await db.collection("Exam").findOneAndUpdate({Theme:req.body.ans1},{$pull:{List:{Question:req.body.ques}}})
            .then((details)=>
            {
                res.json(details);
            })
            .catch((e)=>console.log(e))
})



connectToDB(()=>{
    app.listen(9899,()=>{
        console.log('server Running at port 9899')
    })
}
)
