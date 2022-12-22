import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../shared/Loading';

const AllUsers = ({type}) => {
    // console.log(type);
    // let url = 'https://b612-used-products-resale-server-side-elamonii.vercel.app/users';
    // if(type === "seller"){
    //     console.log('type is seller');
    //     url = 'https://b612-used-products-resale-server-side-elamonii.vercel.app/usersSeller';
    // }
    // console.log(url);

    const {data: users=[], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/users');
            const data = res.json();
            return data;
        }
    })

    const handleMakeAdmin = (id) => {
        fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/users/admin/${id}`, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            toast.success('User added to admin role successfully');
            refetch();
        })
    }

    const handleMakeBuyerOrSeller = (id, role) => {
        fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/users/roleSwitch/${id}/${role}`, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            toast.success(`User added to ${role} role successfully`);
            refetch();
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='pt-6 pl-10'>
            <div className='flex justify-between'>
                <h3 className="text-3xl mb-10">All Users</h3>
                {/* <h5 className="font-bold pr-5">{format(new Date(), 'PP')}</h5> */}
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Make Admin</th>
                        {/* <th>Delete</th> */}
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => 
                                    <tr key={user._id}>
                                        <th>{i+1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <>
                                                {(user?.role === 'admin') ? 'Admin'
                                                
                                                :
                                                <>
                                                    <button onClick={()=>handleMakeAdmin(user._id)} className='btn btn-xs btn-primary mr-3'>Make Admin</button>
                                                    
                                                    {
                                                    
                                                    (user.role === 'seller') 
                                                    
                                                    ? 
                                                    
                                                    <button onClick={()=>handleMakeBuyerOrSeller(user._id, 'buyer')} className='btn btn-xs btn-primary mr-3'>Make Buyer</button>

                                                    :
                                                        
                                                    <button onClick={()=>handleMakeBuyerOrSeller(user._id, 'seller')} className='btn btn-xs btn-primary mr-3'>Make Seller</button>
                                                
                                                }
                                                    
                                                </>
                                                
                                                }
                                            </>
                                        </td>
                                        {/* <td>
                                            <button className='btn btn-xs btn-danger'>Delete</button>
                                        </td> */}
                                    </tr>                            
                                )
                        }
                    </tbody>
                </table>
            </div>            
        </div>
    );
};

export default AllUsers;