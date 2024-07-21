const initialState = {
  username: null,
  TeamCode: "",
  TeamMember: "",
  TeamPassword: "",
  HtrLoginState: false,
  TechTeamLoginState: false,
  TechTeamMemberId: null,
  TeamData: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload.username,
      };
    case "AUTH":
      return {
        ...state,
        auth: action.payload.auth,
      };
    case "UPDATE":
      return {
        ...state,
        update: action.payload.update,
      };
    case "TEAM":
      return {
        ...state,
        Teamcode: action.payload.Teamcode,
        Teamname: action.payload.Teamname,
      };
    case "JOINHACK":
      return {
        ...state,
        Teamcode: action.payload.TeamCode,
        TeamMember: action.payload.TeamMember,
        TeamPassword: action.payload.TeamPassword,
        TeamData: action.payload.TeamData,
      };
    case "HTRLOGIN":
      return {
        ...state,
        HtrLoginState: action.payload.HtrLoginState,
      };
      case "TECHTEAMLOGIN":
        return {
          ...state,
          TechTeamLoginState: action.payload.TechTeamLoginState,
          TechTeamMemberId:action.payload.TechTeamMemberId,
          Status:action.payload.Status
        };
       case "UPDATE_TEAM_DATA":
          return {
            ...state,
            TeamData: action.payload.TeamData,
          };
    default:
      return state;
  }
};

export default userReducer;
