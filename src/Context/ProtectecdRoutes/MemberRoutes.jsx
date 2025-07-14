import React from 'react';
import useAuth from '../Hook/useAuth';
import useUserRole from '../Hook/useUserRole';
import { Navigate } from 'react-router';

const MemberRoutes = ({children}) => {
     const { loading, user } = useAuth()
     const {role,roleLoading}=useUserRole()

      if (loading || roleLoading) {
        return <div className='text-center mt-40 mb-60'>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }
    if(!user || role !== "member"){
        return <Navigate state={{from:location.pathname}} to='/forbedden'></Navigate>
    }
    return children
};

export default MemberRoutes;