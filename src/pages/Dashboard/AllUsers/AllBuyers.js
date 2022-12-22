import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../shared/Loading';

const AllBuyers = () => {

    const {data: users=[], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/usersBuyer');
            const data = res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='pt-6 pl-10'>
            <div className='flex justify-between'>
                <h3 className="text-3xl mb-10">All Sellers</h3>
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
                        {/* <th>Verify</th> */}
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

export default AllBuyers;