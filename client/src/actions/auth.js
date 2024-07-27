import axios from 'axios';
import { useSelector } from 'react-redux';

export const Authentication = () => {

    const teamcode = useSelector((state) => state.user?.Teamcode);
    const teamname = useSelector((state) => state.user?.Teamname);
    const member = useSelector((state) => state.user?.TeamMember);
    const password = useSelector((state) => state.user?.TeamPassword);
    const HtrAuth = useSelector((state) => state.user?.HtrLoginState);
    const Htr = useSelector((state) => state.user?.Htr);
    const Htrpass = useSelector((state) => state.user?.Htrpass);
    const TechTeamMemberAuth = useSelector((state) => state.user?.TechTeamLoginState);

    axios.defaults.headers.common['code'] = Htr
    axios.defaults.headers.common['password'] = Htrpass

    return { teamcode, teamname, member, password, HtrAuth, TechTeamMemberAuth, Htr, Htrpass };
};