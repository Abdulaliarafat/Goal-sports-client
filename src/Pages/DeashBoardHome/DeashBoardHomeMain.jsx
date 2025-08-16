import React from 'react';
import useUserRole from '../../Hook/useUserRole';
import Loading from '../../SharedPage/Loading';
import UserProfile from '../DashBoard/UserDashboard/UserProfile';
import AdminOverview from './AdminOverview';
import MemberOverview from './MemberOverview';



const DeashBoardHomeMain = () => {
    const { role, isLoading } = useUserRole()
    if (isLoading) {
        return <Loading></Loading>
    }
    if (role === 'user') {
        return <UserProfile></UserProfile>
    }
    else if (role === 'member') {
        return <MemberOverview></MemberOverview>
    }
    else if (role === 'admin') {
        return <AdminOverview></AdminOverview>
    }
};

export default DeashBoardHomeMain;