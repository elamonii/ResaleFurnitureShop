import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    console.log(user)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if(user && isAdmin){
        console.log('Got an admin user');
        return children;
    }else{
        console.log('something wrong');
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;