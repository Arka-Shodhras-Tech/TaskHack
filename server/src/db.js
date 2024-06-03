import dot from 'dotenv';
import { MongoClient } from "mongodb";
dot.config();
let db,db1; 

async function connectToDB(cb){
    const url = `${process.env.database}`
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("ChemistryDepartment");
    db1 = client.db("Hackathon"); 
    cb();
}
export { connectToDB, db,db1 };
