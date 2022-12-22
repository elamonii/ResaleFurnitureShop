import React from 'react';
import UserProfile from '../UserProfile/UserProfile';

const Dashboard = () => {
    return (
        <div className='p-4'>
            <h2 className='text-4xl'>Welcome to User dashboard</h2>
            <div className="divider"></div>
            <UserProfile></UserProfile>
        </div>
    );
};

export default Dashboard;