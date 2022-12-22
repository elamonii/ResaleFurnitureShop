import React from 'react';
import { Link } from 'react-router-dom';

const Category = (category) => {
    // console.log(category.category.categoryName);
    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure><img src={category.category.categoryImageUrl} alt={category.category.categoryName} /></figure>
            <div className="card-body">
                <h2 className="card-title">{category.category.categoryName}</h2>
                <p>{category.category.categoryDescription}</p>
                <div className="card-actions justify-end">
                    <Link to={`/products/${category.category._id}`}><button className="btn btn-primary">View Products</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Category;