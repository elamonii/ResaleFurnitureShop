import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../../shared/Loading';

const MyWishList = () => {
    const {user} = useContext(AuthContext);
    const emailId = user?.email;

    console.log(user);
    console.log(emailId);
    console.log('get into wishlist');

    const {data: wishlists=[], isLoading} = useQuery({
        queryKey: ['wishlists'],
        queryFn: async () => {
            const result = await fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/wishlists/:${emailId}`);
            const data = await result.json();
            console.log(data);
            return data;
        }
    });

    if(isLoading){
        return <Loading></Loading>
    }


    return (
        <div className='my-20'>
            <div>
                <h2 className='text-3xl font-bold'>My Wish Lists</h2>
                <div className="divider"></div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Original Price</th>
                        <th>Resale Price</th>
                        <th>Years of use</th>
                        <th>Advertised?</th>
                        <th>Status</th>
                        <th>Post Date</th>
                        {/* <th>Action</th> */}
                        {/* <th>Delete</th> */}
                    </tr>
                    </thead>
                    <tbody>
                        {
                            wishlists.map((wishlist, i) => 
                                    <tr key={wishlist._id}>
                                        <td>{i+1}</td>
                                        <td>
                                            <img src={wishlist.itemImage} alt={wishlist?.itemName} className="h-8" />
                                        </td>
                                        <td>{wishlist?.itemName}</td>
                                        <td className='text-center'>{wishlist.itemOriginalPrice}</td>
                                        <td className='text-center'>{wishlist.itemResalePrice}</td>
                                        <td>{wishlist.itemStatus}</td>
                                        <td>{wishlist.itemCreated}</td>
                                        {/* <td>
                                            <>
                                                {(user?.role === 'admin') ? 'Admin'
                                                
                                                :
                                                <>
                                                    <button onClick={()=>handleMakeAdmin(user._id)} className='btn btn-xs btn-primary mr-3'>Make Admin</button>
                                                </>
                                                
                                                }
                                            </>
                                        </td> */}
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

export default MyWishList;