import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../../shared/Loading';
import Category from '../Categories/Category';
// import Advertisements from '../Home/Advertisement/Advertisements';

const Categories = () => {
    const {data: category_data, isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const result = await fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/categories');
            const data = await result.json();
            return data;
        }
    });

    if(isLoading){
        return <Loading></Loading>
    }    
    // console.log(category_data);

    return (
        <div className='my-32'>
            <Helmet><title>Recycle It - Categories</title></Helmet>
            <h2 className='text-3xl mb-5 font-bold'>All Category</h2>
            <div className="divider"></div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                {
                    category_data.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>

            {/* <Advertisements></Advertisements> */}
        </div>
    );
};

export default Categories;