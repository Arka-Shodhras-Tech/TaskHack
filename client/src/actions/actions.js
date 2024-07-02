import axios from "axios"

export const Actions = {
    userAuth: async (auth) => {
        return await axios.post(process.env.REACT_APP_Server + "/authuser/" + auth)
    },

    Students: async () => {
        return await axios.post(process.env.REACT_APP_Server + "/Students")
    },

    updateGender: async (id, gender) => {
        return await axios.post(process.env.REACT_APP_Server + "/updategender/" + id + "/" + gender)
            .then((res) => {
                return res.data
            })
            .catch((e) => console.log(e))
    },

    AllMaterials: async () => {
        return await axios.post(process.env.REACT_APP_Server + "/files")
    },

    Likes: async (theme, user, index) => {
        return await axios.post(process.env.REACT_APP_Server + "/likes", { theme, user, index })
    },

    Views: async (theme, index) => {
        return await axios.post(process.env.REACT_APP_Server + "/views", { theme, index })
    },

    CheckTeam: async (code) => {
        return await axios.post(process.env.REACT_APP_Server + "/checkteam", { code })
    },

    checkHacthon: async (name) => {
        return await axios.post(process.env.REACT_APP_Server + "/check-hackathon/" + name)
    },

    CreateTeam: async (team, gmail, phone, code, members, password) => {
        return await axios.post(process.env.REACT_APP_Server + "/createteam/" + team + "/" + gmail + "/" + phone + "/" + code + "/" + members + "/" + password)
    },

    TeamsCodes: async () => {
        return await axios.post(process.env.REACT_APP_Server + "/teamscodes")
    },

    SelectPS: async (code, number, stmt, desc) => {
        return await axios.post(process.env.REACT_APP_Server + "/selectps", { code, number, stmt, desc })
    },

    UnSelectPS: async (code, number) => {
        return await axios.post(process.env.REACT_APP_Server + "/unselectps", { code, number })
    }

}