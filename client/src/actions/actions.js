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

    CheckTeam: async (code,password) => {
        return await axios.post(process.env.REACT_APP_Server + "/checkteam", { code,password })
    },
    CheckHTR: async (code,password) => {
       
        return await axios.post(process.env.REACT_APP_Server + "/checkhtr", { code ,password})
    },

    checkHacthon: async () => {
        return await axios.post(process.env.REACT_APP_Server + "/check-hackathon")
    },

    CreateTeam: async (team, gmail, phone, code, members, password) => {
        return await axios.post(process.env.REACT_APP_Server + "/createteam/" + team + "/" + gmail + "/" + phone + "/" + code + "/" + members + "/" + password)
    },
    JoinHackathon: async (teamCode,registrationNumber,password,isCheck) => {
        return await axios.post(process.env.REACT_APP_Server + `/joinhackathon?ischeck=${isCheck}`,{teamCode,registrationNumber,password})
    },
    AllTeamRegistrers: async ()=>{
        return await axios.post(process.env.REACT_APP_Server + "/teamregistrers")

    },

    TeamsCodes: async () => {
        return await axios.post(process.env.REACT_APP_Server + "/teamscodes")
    },

    SelectPS: async (code, number, stmt, desc) => {
        return await axios.post(process.env.REACT_APP_Server + "/selectps", { code, number, stmt, desc })
    },

    UnSelectPS: async (code, number) => {
        return await axios.post(process.env.REACT_APP_Server + "/unselectps", { code, number })
    },

    FeedBack: async (user, techfeed, sitefeed) => {
        return await axios.post(process.env.REACT_APP_Server + "/internalmarks", { user, techfeed, sitefeed })
    },
    AddFeedBack: async ({ user, isInteractive, rating, feedbackmessage, date, type }) => {
        return await axios.post(process.env.REACT_APP_Server + "/addfeedback", { user, isInteractive, rating, feedbackmessage, date, type });
      },

}