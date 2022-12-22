import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../shared/Loading';
import MostRecentProduct from './MostRecentProduct';
// import latestbg from '../../assets/latestbg.jpg';

const MostRecentProducts = () => {

    const {data: mostRecentProducts, isLoading} = useQuery({
        queryKey: ['mostRecentProducts'],
        queryFn: async () => {
            const result = await fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/mostRecentProducts');
            const data = await result.json();
            console.log(data);
            return data;
        }
    });

    if(isLoading){
        return <Loading></Loading>
    }
    
    return (
        <div className='my-20'
            // style={{ 
            //         background: `url(${latestbg})`, opacity: 20
            //     }}
        >
            <h2 className='text-3xl font-bold'>Latest Added Products</h2>
            <div className="divider"></div>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-5 sm:grid-cols-3'>
            {
                mostRecentProducts.map(mostRecentProduct => <MostRecentProduct
                    key={mostRecentProduct._id}
                    latest={mostRecentProduct}
                ></MostRecentProduct>)
            }
            </div>
        </div>
    );
};

export default MostRecentProducts;