const initialState = {
    username: null,
    TeamCode:"",
    TeamMember:"",
    TeamPassword:""
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.username,
            };
        case 'AUTH':
            return {
                ...state,
                auth: action.payload.auth
            }
        case 'UPDATE':
            return {
                ...state,
                update: action.payload.update
            }
        case 'TEAM':
            return {
                ...state,
                Teamcode:action.payload.Teamcode,
                Teamname:action.payload.Teamname
            }
        case 'JOINHACK':
                return {
                    ...state,
                    Teamcode:action.payload.TeamCode,
                    TeamMember:action.payload.TeamMember,
                    TeamPassword:action.payload.TeamPassword
                }
        default:
            return state;
    }
};

export default userReducer;  