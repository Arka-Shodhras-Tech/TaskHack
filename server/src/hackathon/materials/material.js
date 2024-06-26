import { db1 } from "../../db.js"
import { bucket } from "../../db.js"
import mime from 'mime';
export const Materials = async (res) => {
    try {
        const tasks = await db1.collection("Materials").find().toArray()
        if (tasks.length > 0) {
            res.json(tasks)
        }
    } catch (error) {
        console.log(error)
    }
}

export const FileByName = (filename, res) => {
    try {
        const downloadStream = bucket.openDownloadStreamByName(filename);
        downloadStream.on('error', (error) => {
            res.status(404).send('File not found');
        });
        downloadStream.on('file', (file) => {
            const mimeType = mime.getType(file.filename);
            res.set('Content-Type', mimeType);
        });
        downloadStream.pipe(res);
    } catch (error) {
        console.log(error)
    }
}