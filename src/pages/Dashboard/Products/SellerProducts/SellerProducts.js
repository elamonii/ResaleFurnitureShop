import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loading from '../../../../shared/Loading';

const SellerProducts = () => {

    const {user} = useContext(AuthContext);
    const sellerId = user?.uid;

    const {data: products=[], isLoading } = useQuery({
        queryKey: ['sellerProducts'],
        queryFn: async () => {
            const res = await fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/sellerProducts/${sellerId}`);
            const data = res.json();
            return data;
        }
    });
    
    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='pt-6 pl-10'>
            <div className='flex justify-between'>
                <h3 className="text-3xl mb-10">My Resale Products</h3>
                {/* <h5 className="font-bold pr-5">{format(new Date(), 'PP')}</h5> */}
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
                            products.map((product, i) => 
                                    <tr key={product._id}>
                                        <td>{i+1}</td>
                                        <td>
                                            <img src={product.productImage} alt={product.productName} className="h-8" />
                                        </td>
                                        <td>{product.productName}</td>
                                        <td className='text-center'>{product.originalPrice}</td>
                                        <td className='text-center'>{product.resalePrice}</td>
                                        <td className='text-center'>{product.yearsOfUse}</td>
                                        <td>
                                            {
                                                product.sponsored? 'Show in Advertise' : 'Regular Post'
                                            }
                                        </td>
                                        <td>{product.status}</td>
                                        <td>{product.created}</td>
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

export default SellerProducts;