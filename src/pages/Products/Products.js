// import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
// import Loading from '../../shared/Loading';
import Product from './Product';
import WishLists from './WishLists/WishLists';

const Products = () => {
    const products = useLoaderData();
    // console.log(products);

    return (
        <>
        <div className='pb-16'>
            <div className='pb-10'>
                <h2 className='text-3xl text-center text-neutral mt-3 mb-7'>All Order Products</h2>
                <div className="divider"></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>            
        </div>
        <WishLists></WishLists>
        </>
    );
};

export default Products;