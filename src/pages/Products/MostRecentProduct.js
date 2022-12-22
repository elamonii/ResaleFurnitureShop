import React from 'react';
import { Link } from 'react-router-dom';

const MostRecentProduct = ({latest}) => {
    return (
        <div className="card bg-base-100 shadow-xl">
        <figure className='max-h-40'><img src={latest.productImage} alt={latest.productName} /></figure>
        <div className="card-body">
            <h2 className="card-title">
            {latest.productName}
            <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>Condition: {latest.productCondition}</p>
            <p>Price: {latest.productPrice}</p>
            <p>Location: {latest.productLocation}</p>
            <div className="card-actions justify-end">
                {/* <div className="badge badge-outline"></div>  */}
                <div className="badge badge-outline"><Link to={`/productDetails/${latest._id}`}>See Details</Link></div>
            </div>
        </div>
        </div>
    );
};

export default MostRecentProduct;