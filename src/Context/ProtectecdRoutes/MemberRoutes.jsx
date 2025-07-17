import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import useUserRole from '../../Hook/useUserRole';
import Loading from '../../SharedPage/Loading';

const MemberRoutes = ({children}) => {
     const { loading, user } = useAuth()
     const {role,roleLoading}=useUserRole()

      if (loading || roleLoading) {
        return <Loading></Loading>
    }
    if(!user || role !== "member"){
        return <Navigate state={{from:location.pathname}} to='/forbedden'></Navigate>
    }
    return children
};

export default MemberRoutes;