import React from 'react';
import useUserRole from '../../Hook/useUserRole';
import Loading from '../../SharedPage/Loading';
import UserDeshBoard from '../DashBoard/UserDashboard/UserDeshBoard';
import MemberDashboard from '../DashBoard/MemderDashboard/MemberDashboard';
import AdminDashboard from '../DashBoard/AdminDashboard/AdminDashboard';
import Forbidden from '../../SharedPage/Forbedden';


const DeashBoardHomeMain = () => {
    const { role, isLoading } = useUserRole()
    if (isLoading) {
        return <Loading></Loading>
    }
    if (role === 'user') {
        return <UserDeshBoard></UserDeshBoard>
    }
    else if (role === 'member'){
        return <MemberDashboard></MemberDashboard>
    }
    else if(role==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else{
        return <Forbidden></Forbidden>
    }
};

export default DeashBoardHomeMain;