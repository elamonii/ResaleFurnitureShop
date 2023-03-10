import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useBuyer from '../hooks/useBuyer';

const BuyerRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    console.log(user)
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

    const location = useLocation();

    if(loading || isBuyerLoading){
        return <progress className="progress w-56"></progress>
    }

    if(user && isBuyer){
        console.log('Got an buyer user');
        return children;
    }else{
        console.log('something wrong');
    }

    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;