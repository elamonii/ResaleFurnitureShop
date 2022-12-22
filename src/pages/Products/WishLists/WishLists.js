import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../../shared/Loading';

const WishLists = () => {
    const {user} = useContext(AuthContext);
    const emailId = user.email;

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

            <div className="p-5 mx-0 bg-neutral rounded-xl">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
                    {
                    wishlists.map(wishlist => 
                        <div key={wishlist._id} className="relative flex items-end justify-start w-full text-left bg-center bg-cover h-96 dark:bg-gray-500" 
                        style={{ backgroundImage: `url(${wishlist.itemImage})` }}>
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b dark:via-transparent dark:from-gray-900 dark:to-gray-900"></div>
                            <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                                {/* <Link className="px-3 py-2 text-xs font-semibold tracking-wider uppercase dark:text-gray-100 bgundefined">Politics</Link> */}
                                <div className="flex flex-col justify-start text-center dark:text-gray-100">
                                    {/* <span className="text-3xl font-semibold leading-none tracking-wide">04</span> */}
                                    <span className="leading-none uppercase">{wishlist?.created}</span>
                                </div>
                            </div>
                            <h2 className="z-10 p-5">
                                <Link to={`/productDetails/${wishlist._id}`} className="font-medium text-md hover:underline dark:text-gray-100">{wishlist.itemName}</Link>
                            </h2>
                        </div>)
                    }
                </div>
            </div>            
        </div>
    );
};

export default WishLists;