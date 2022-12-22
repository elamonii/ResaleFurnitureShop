import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../shared/Loading';
// import { format } from 'date-fns/fp';
// import Advertisement from '../Advertisement/Advertisement';

const Advertisements = () => {

    const {data: advertisements, isLoading} = useQuery({
        queryKey: ['productSponsored'],
        queryFn: async () => {
            const result = await fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/productSponsored');
            const data = await result.json();
            console.log(data);
            return data;
        }
    });

    if(isLoading){
        return <Loading></Loading>
    }    
    // console.log(advertisements[0]);


    // const [advertisementData, setAdvertisementData] = useState(false);

    // const [isAdvertiseLoading, setIsAdvertiseLoading] = useState(true);
    
    // useEffect(() => {
    //     fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/products/sponsored')
    //     .then(res => res.json())
    //     .then(data => {
    //         setAdvertisementData(data);
    //         setIsAdvertiseLoading(false);

    //     })
    // }, []);
    // return [isAdmin, isAdminLoading];


    
    return (
        <div className='my-20'>
            <div>
                <h2 className='text-3xl font-bold'>Advertised Product</h2>
                <div className="divider"></div>
            </div>


            <div className="p-5 mx-0 bg-neutral rounded-xl">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
                    {
                    advertisements.map(advertisement => 
                        <div key={advertisement._id} className="relative flex items-end justify-start w-full text-left bg-center bg-cover h-96 dark:bg-gray-500" 
                        style={{ backgroundImage: `url(${advertisement.productImage})` }}>
                            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b dark:via-transparent dark:from-gray-900 dark:to-gray-900"></div>
                            <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                                {/* <Link className="px-3 py-2 text-xs font-semibold tracking-wider uppercase dark:text-gray-100 bgundefined">Politics</Link> */}
                                <div className="flex flex-col justify-start text-center dark:text-gray-100">
                                    {/* <span className="text-3xl font-semibold leading-none tracking-wide">04</span> */}
                                    <span className="leading-none uppercase">{advertisement?.created}</span>
                                </div>
                            </div>
                            <h2 className="z-10 p-5">
                                <Link to={`/productDetails/${advertisement._id}`} className="font-medium text-md hover:underline dark:text-gray-100">{advertisement.productName}</Link>
                            </h2>
                        </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Advertisements;