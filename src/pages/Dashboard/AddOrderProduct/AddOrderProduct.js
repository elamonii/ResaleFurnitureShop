import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../../shared/Loading';
import {format} from 'date-fns';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const {user} = useContext(AuthContext);
    // console.log(user);
    
    // =============================Private route Navigation to desired destination
    const navigate = useNavigate();

    const {register, handleSubmit, formState:{errors}} = useForm();
    const [addOrderProductError, setAddOrderProductError] = useState('');

    const {data: categories, isLoading} = useQuery({
        queryKey: ['productCategory'],
        queryFn: async () => {
            const result = await fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/selectCategory');
            const data = await result.json();
            return data;
        }
    });

    const handleAddOrderProduct = (data) => {
        console.log(data);
        const userId = user.uid;
        const userName = user.displayName;
        const userEmail = user.email;
        const sellerVerified = user.sellerVerified;
        const productCategory = data.productCategory;
        // const categoryName = categories[data.productCategory].categoryName;
        const productName = data.productName;
        const productCondition = data.productCondition;
        const productDescription = data.productDescription;
        const productLocation = data.productLocation;
        const originalPrice = data.originalPrice;
        const resalePrice = data.resalePrice;
        const yearsOfUse = data.yearsOfUse;
        const sponsored = (data.sponsored === 'Yes') ? true : false;
        const status = data.status;
        const created = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
        // const created = format(new Date(), 'dd-MM-yyyy');

        const productImage = data.productImage[0];
        setAddOrderProductError('');


        // =========================UPLOAD IMAGE START========================
        const formData = new FormData();
        formData.append('image', productImage);
        const url = `https://api.imgbb.com/1/upload?key=7cd5b5a3570f24b33fb4dc2959ef30e2`;

        // ===============================ADD IMG TO IMGBB   
        fetch(url, {
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(imgData=> {
            console.log(imgData)
            if(imgData.success){
                console.log('image uploaded');
                console.log(imgData);
                const photoUrl = imgData?.data?.url;
                const productData = {
                    userId,
                    userName,
                    userEmail,
                    sellerVerified,
                    productCategory,
                    productCondition,
                    // categoryName,
                    productName,
                    productDescription,
                    productLocation,
                    originalPrice,
                    resalePrice,
                    yearsOfUse,
                    sponsored,
                    status,
                    created,
                    productImage:photoUrl
                }
                addToMongoDb(productData);
            }else{
                console.log('wrong upload')
            }
        })         
        // ===============================ADD IMG TO IMGBB   
        // =========================UPLOAD IMAGE End========================


        const addToMongoDb = (productData) => {
            console.log(productData);
            fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/product/add', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log('Product added to mongodb');
                navigate('/dashboard/sellerProducts');
                toast.success('Product added successfully');
            })
        } 

    }

    if(isLoading){
        return <Loading></Loading>
    }


    return (
        <div className='p-6'>
            <Helmet><title>Recycle It Dashboard - Add New Order Product</title></Helmet>
            <h2 className='text-4xl'>Add New Order Product</h2>
            <div className="divider"></div>
            <div className='px-16 py-12 w-full rounded-xl'>

                <form onSubmit={handleSubmit(handleAddOrderProduct)}>

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Select Category</span>
                        </label>
                        <select {...register('productCategory')} className="select select-bordered">
                            {/* <option disabled selected>Select Category</option> */}                            
                            {
                                categories.map(category => <option
                                    key={category._id}
                                    value={category._id}
                                >{category.categoryName}</option>)
                            }
                            
                        </select>
                    </div>                    

                    <div className="form-control w-full mb-8">
                        <label className="label"><span className="label-text">Product Name</span></label>
                        <input {...register('productName', {
                            required: "Product Name is required."
                        })} type="text" className="input input-bordered w-full" />
                        {errors.productName && <p className='text-red-600'>{errors.productName.message}</p>}
                    </div>                

                    <div className="form-control w-full mb-8">
                        <label className="label"><span className="label-text">Original Price</span></label>
                        <input {...register('originalPrice', {
                            required: "Buying Price is required."
                        })} type="text" className="input input-bordered w-full" />
                        {errors.originalPrice && <p className='text-red-600'>{errors.originalPrice.message}</p>}
                    </div>

                    <div className="form-control w-full mb-8">
                        <label className="label"><span className="label-text">Resale Price</span></label>
                        <input {...register('resalePrice', {
                            required: "Resale Price is required."
                        })} type="text" className="input input-bordered w-full" />
                        {errors.resalePrice && <p className='text-red-600'>{errors.resalePrice.message}</p>}
                    </div>                
                    


                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Product Condition</span>
                        </label>
                        <select type='hidden' {...register('productCondition')} className="select select-bordered">
                            <option value='excellent'>Excellent</option>
                            <option value='good'>Good</option>
                            <option value='fair'>Fair</option>
                        </select>
                    </div>   



                    <div className="form-control w-full mb-8">
                        <label className="label"><span className="label-text">Seller Contact</span></label>
                        <input {...register('mobile', {
                            required: "Contact number is required."
                        })} type="text" className="input input-bordered w-full" />
                        {errors.mobile && <p className='text-red-600'>{errors.mobile.message}</p>}
                    </div>   


                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <select type='hidden' {...register('productLocation')} className="select select-bordered">
                            <option value='dhaka'>Dhaka</option>
                            <option value='chittagong'>chittagong</option>
                            <option value='sylhet'>Sylhet</option>
                            <option value='barishal'>Barishal</option>
                        </select>
                    </div>  


                    <div className="form-control w-full mb-8">
                        <label className="label"><span className="label-text">Years of Use</span></label>
                        <input {...register('yearsOfUse')} type="text" className="input input-bordered w-full" />
                        {errors.yearsOfUse && <p className='text-red-600'>{errors.yearsOfUse.message}</p>}
                    </div>



                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Product Description</span>
                        </label> 
                        <textarea {...register('productDescription')}  className="textarea textarea-bordered h-24"></textarea>
                        {errors.productDescription && <p className='text-red-600'>{errors.productDescription.message}</p>}
                    </div>

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Want to Sponsor</span>
                        </label>
                        <select {...register('sponsored')} className="select select-bordered">
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>   

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select type='hidden' {...register('status')} className="select select-bordered">
                            <option value='inprogress'>InProgress</option>
                            <option value='booked'>Booked</option>
                            <option value='sold'>Sold</option>
                        </select>
                    </div>   

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Product Image</span>
                        </label>
                        <input {...register('productImage')} type="file" className="file-input file-input-bordered w-full" />
                        {errors.productImage && <p className='text-red-600'>{errors.productImage.message}</p>}
                    </div>


                    <input type="submit" className="btn btn-neutral w-full max-w-xs mt-4 text-white uppercase" value="Submit" />


                    <div>
                        {
                            addOrderProductError && <p className='text-red-600 font-bold'>{addOrderProductError}</p>
                        }
                    </div>



                </form>
                

            </div>





        </div>
    );
};

export default AddProduct;