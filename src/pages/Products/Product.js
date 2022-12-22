import React from 'react';
// import { Link } from 'react-router-dom';
import { FaRegCheckSquare } from 'react-icons/fa';
import PurchaseModal from '../PurchaseModal/PurchaseModal';

const Product = (product) => {
    // console.log(product.product);

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure className='max-h-60'><img src={product.product.productImage} alt={product.productName} /></figure>
            {/*  className='max-h-80' */}
            <div className="card-body">
                <h2 className="card-title text-3xl font-semibold my-10 pb-5">{product.product.productName}</h2>
                
                <p className='font-semibold text-xl'>Original Price: {product.product.originalPrice}</p>
                <p className='font-semibold text-xl'>Resale Price: {product.product.resalePrice}</p>
                <p className='font-semibold text-xl'>Years of Use: {product.product.yearsOfUse}</p>
                <p className='font-semibold text-xl'>Posted By: {product.product.userName} </p>
                <p className='font-semibold text-xl'>Posted Time: {product.product.created}</p>
                <div className="card-actions justify-center my-8">
                {/* <button htmlFor="purchase-modal" className="btn btn-primary text-xl">Book Now</button> */}
                <label htmlFor="purchase-modal" className="btn btn-primary text-xl" >Book Now</label>
                {
                    product.product.sellerVerified? <span className='text-primary'><FaRegCheckSquare /></span> : ''
                }
                </div>
            </div>
            <PurchaseModal productDetails={product.product}></PurchaseModal>
        </div>
    );
};

export default Product;