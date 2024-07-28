import dot from 'dotenv';
import { MongoClient, GridFSBucket } from "mongodb";
dot.config();
let db, db1, bucket;

async function connectToDB(cb) {
    try {
        const url = `${process.env.database}`
        const client = new MongoClient(url);
        await client.connect();
        db = client.db("ChemistryDepartment");
        db1 = client.db("VedicVision");
  

        bucket = new GridFSBucket(db1, { bucketName: 'uploads' });
        cb();
    } catch (error) {
        console.log("db error")
    }
}
export { bucket, connectToDB, db, db1 };

