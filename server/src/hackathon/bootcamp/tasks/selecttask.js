import {db1} from '../../../db.js'
export const SelectTask = async (regd, task,marks, desc, day, res) => {
    try {
        const updatetask = await db1.collection("Hackathondata").findOneAndUpdate({
            $expr: {
                $eq: [
                    {
                        $replaceAll: {
                            input: {
                                $toUpper: {
                                    $replaceAll: { input: "$Reg_No", find: " ", replacement: "" }
                                }
                            },
                            find: " ",
                            replacement: ""
                        }
                    },
                    regd.toUpperCase().replace(/\s+/g, '')
                ]
            }
        }, { $push: { [`Tasks.${day}`]: { Task: task, Desc: desc,Marks:marks } } })
        if (updatetask) {
            res.json({message:"Selected",data:updatetask})
        }
    } catch (error) {
        console.log(error)
    }
}

export const UnSelectTask = async (regd, task, day, res) => {
    try {
        const updatetask = await db1.collection("Hackathondata").findOneAndUpdate({
            $expr: {
                $eq: [
                    {
                        $replaceAll: {
                            input: {
                                $toUpper: {
                                    $replaceAll: { input: "$Reg_No", find: " ", replacement: "" }
                                }
                            },
                            find: " ",
                            replacement: ""
                        }
                    },
                    regd.toUpperCase().replace(/\s+/g, '')
                ]
            }
        }, { $pull: { [`Tasks.${day}`]: { Task: task } } })
        if (updatetask) {
            res.json({message:"Unselected",data:updatetask})
        }
    } catch (error) {
        console.log(error)
    }
}