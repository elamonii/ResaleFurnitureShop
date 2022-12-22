import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    console.log(user)
    const [isSeller, isSellerLoading] = useSeller(user?.email);

    const location = useLocation();

    if(loading || isSellerLoading){
        return <progress className="progress w-56"></progress>
    }

    if(user && isSeller){
        // console.log('Got an Seller user');
        return children;
    }else{
        console.log('something wrong');
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;