import { db1 } from "../../db.js"

export const LikeMati = async (theme, user, index, res) => {
    try {
        const file = await db1.collection("Materials").findOne({ Theme: theme })
        if (file?.Links[index]?.Likes?.includes(user)) {
            const updatefile = await db1.collection("Materials").findOneAndUpdate({ Theme: theme }, { $pull: { [`Links.${index}.Likes`]: user } })
            if (updatefile?.value) {
                res.json({ message: "updated" })
            } else {
                res.json({ error: 'try again' })
            }
        } else {
            const updatefile = await db1.collection("Materials").findOneAndUpdate({ Theme: theme }, { $push: { [`Links.${index}.Likes`]: user } })
            if (updatefile?.value) {
                res.json({ message: updatefile?.value?.Show ? "show" : "hide" })
            } else {
                res.json({ error: 'try again' })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const ViewMati = async (theme, index, res) => {
    try {
        const file = await db1.collection("Materials").findOne({ Theme: theme })
        if (file?._id) {
            let count;
            if (file?.Links[index]?.Views>=0) {
                count = parseInt(file?.Links[index]?.Views) + 1;
            }
            else {
                count = 1;
            }
            const updatefile = await db1.collection("Materials").findOneAndUpdate({ Theme: theme }, { $set: { [`Links.${index}.Views`]: count } })
            if (updatefile?.value) {
                res.json({ message: "updated" })
            } else {
                res.json({ error: 'try again' })
            }
        } else {
            res.json({ error: 'theme not found' })
        }
    } catch (error) {
        console.log(error)
    }
}

export const DownloadMati = async (day, task, desc, mark, index, res) => {
    try {
        const file = await db1.collection("Materials").findOne({ Theme: theme })
        if (file?._id) {
            const updatefile = await db1.collection("Materials").findOneAndUpdate({ Theme: theme }, { $set: { Show: file?.Show ? false : true } })
            if (updatefile?.value) {
                res.json({ message: updatefile?.value?.Show ? "show" : "hide" })
            } else {
                res.json({ error: 'try again' })
            }
        } else {
            res.json({ error: 'theme not found' })
        }
    } catch (error) {
        console.log(error)
    } sole.log(error)
}