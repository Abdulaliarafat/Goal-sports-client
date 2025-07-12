import { Navigate, useLocation} from 'react-router';
import useAuth from '../../Hook/useAuth';
import Loading from '../../SharedPage/Loading';

const PrivateRoutes = ({ children }) => {
    const { loading, user } = useAuth()
    const location=useLocation()
    // const from=location.pathname

    if (loading) {
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate state={{from:location.pathname}} to='/login'></Navigate>
    }

    return children
};

export default PrivateRoutes;