import React from 'react';
import useUserRole from '../../Hook/useUserRole';
import Loading from '../../SharedPage/Loading';
import Forbidden from '../../SharedPage/Forbedden';
import UserProfile from '../DashBoard/UserDashboard/UserProfile';
import MemberProfile from '../DashBoard/MemderDashboard/MemberProfile';
import AdminProfile from '../DashBoard/AdminDashboard/AdminProfile';


const DeashBoardHomeMain = () => {
    const { role, isLoading } = useUserRole()
    if (isLoading) {
        return <Loading></Loading>
    }
    if (role === 'user') {
        return <UserProfile></UserProfile>
    }
    else if (role === 'member'){
        return <MemberProfile></MemberProfile>
    }
    else if(role==='admin'){
        return <AdminProfile></AdminProfile>
    }
    else{
        return <Forbidden></Forbidden>
    }
};

export default DeashBoardHomeMain;