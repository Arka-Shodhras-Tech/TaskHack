import axios from "axios"

export const Actions = {
    userAuth: async (auth) => {
        return await axios.post(process.env.REACT_APP_Server + "/authuser/" + auth)
            .then((res) => {
                return res.data
            })
            .catch((e) => console.log(e))
    },

    updateGender: async (id,gender) => {
        return await axios.post(process.env.REACT_APP_Server + "/updategender/" + id+"/"+gender)
            .then((res) => {
                return res.data
            })
            .catch((e) => console.log(e))
    },

    AllMaterials:async()=>{
        return await axios.post(process.env.REACT_APP_Server + "/files")
    },

    Likes:async(theme,user,index)=>{
        return await axios.post(process.env.REACT_APP_Server + "/likes",{theme,user,index})
    },

    Views:async(theme,index)=>{
        return await axios.post(process.env.REACT_APP_Server + "/views",{theme,index})
    }

}