import React from 'react';
import { useLoaderData } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthProvider';
import PurchaseModal from '../PurchaseModal/PurchaseModal';

const ProductDetails = () => {
    // const {user} = useContext(AuthContext);
    const productDetails = useLoaderData();
    // console.log(productDetails.productName);
    return (
        <div className="hero min-h-screen bg-base-200 rounded-xl">
            <div className="hero-content flex-col lg:flex-row-reverse justify-between">
                <img src={productDetails.productImage} alt={productDetails.productName} className="rounded-lg shadow-2xl w-full lg:w-1/2 md:w-1/2" />
                <div>
                <h1 className="text-5xl font-bold mb-6">{productDetails.productName}</h1>
                <p className="text-2xl py-2">{productDetails.productDescription}</p>
                <p className="py-2"><span className='font-semibold'>Condition: </span>{productDetails.productCondition}</p>
                <p className="py-2"><span className='font-semibold'>Purchase Year: </span>{productDetails.yearsOfUse}</p>
                <p className="py-2"><span className='font-bold'>Original Price: </span>{productDetails.originalPrice}</p>
                <p className="py-2"><span className='font-bold'>Resale Price: </span>{productDetails.resalePrice}</p>
                <label htmlFor="purchase-modal" className="btn btn-primary my-5">Book Now</label>
                </div>
            </div>
            <PurchaseModal productDetails={productDetails}></PurchaseModal>

            {/* <div>

            <input type="checkbox" id="purchase-modal" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="purchase-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold">Buyer Info</h3>
                <p className="py-2 font-semibold">Name: {user?.displayName}</p>
                <p className="py-2 font-semibold">Email: {user?.email}</p>
                <p>
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Shipping Address</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>                    
                </p>
                <p>
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Contact Number</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>                    
                </p>
                <p><button className="btn btn-sm my-8">Submit</button></p>
            </div>
            </div>    */}


            {/* </div> */}


        </div>
    );
};

export default ProductDetails;