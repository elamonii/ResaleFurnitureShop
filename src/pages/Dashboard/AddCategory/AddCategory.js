import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddCategory = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [addCategoryError, setAddCategoryError] = useState('');

    const handleAddCategory = (data) => {
        console.log(data);
        const categoryName = data.categoryName;
        const categoryDescription = data.categoryDescription;
        const categoryImage = data.categoryImage[0];
        setAddCategoryError('');

        const formData = new FormData();
        formData.append('image', categoryImage);
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
                addToMongoDb(categoryName, categoryDescription, photoUrl);
            }else{
                console.log('wrong upload')
            }
        })         
        // ===============================ADD IMG TO IMGBB   

        // console.log(photoUrl);
        // addToMongoDb(categoryName, categoryDescription, photoUrl);
    }

    const addToMongoDb = (categoryName, categoryDescription, photoUrl) => {
        const categoryData = {categoryName, categoryDescription, categoryImageUrl:photoUrl};
        fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/category/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log('category added to mongodb');
            toast.success('category added successfully');
        })
    }    

    return (
        <div className='p-6'>
            <Helmet><title>Recycle It Dashboard - Add new Category</title></Helmet>
            <h2 className='text-4xl'>Add New Category</h2>
            <div className="divider"></div>
            <div className='px-16 py-12 w-full rounded-xl'>
                {/* <h2 className='text-xl text-center mb-4'>Signup</h2> */}

                <form onSubmit={handleSubmit(handleAddCategory)}>

                    <div className="form-control w-full mb-8">
                        <label className="label"><span className="label-text">Category Name</span></label>
                        <input {...register('categoryName', {
                            required: "Category Name is required."
                        })} type="text" className="input input-bordered w-full" />
                        {errors.categoryName && <p className='text-red-600'>{errors.categoryName.message}</p>}
                    </div>

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Category Description</span>
                        </label> 
                        <textarea {...register('categoryDescription')}  className="textarea textarea-bordered h-24"></textarea>
                        {errors.categoryDescription && <p className='text-red-600'>{errors.categoryDescription.message}</p>}
                    </div>

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Category Image</span>
                        </label>
                        <input {...register('categoryImage')} type="file" className="file-input file-input-bordered w-full" />
                        {errors.categoryImage && <p className='text-red-600'>{errors.categoryImage.message}</p>}
                    </div>


                    <input type="submit" className="btn btn-neutral w-full max-w-xs mt-4 text-white uppercase" value="Submit" />


                    <div>
                        {
                            addCategoryError && <p className='text-red-600 font-bold'>{addCategoryError}</p>
                        }
                    </div>



                </form>
                

            </div>





        </div>
    );
};

export default AddCategory;