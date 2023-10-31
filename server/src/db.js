import dot from 'dotenv';
import { MongoClient } from "mongodb";
dot.config();
let db; 

async function connectToDB(cb){
    const url = `${process.env.database}`
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("ChemistryDepartment");
    cb();
}
export { connectToDB, db };
