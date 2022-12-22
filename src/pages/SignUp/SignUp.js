import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
// import axios from 'axios';


const SignUp = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {createUser, updateUser} = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    if(token){
        navigate('/');
    }

    // const imageHostKey = process.env.REACT_APP_imgbbKey;

    const handleSignup = (data) =>{
        console.log(data);
        const name = data.name;
        const email = data.email;
        const userType = data.userType;
        const image = data.image[0]; 

        // ============================PREPARE DATA FOR IMAGE UPLOAD HANDLING
        // const image = data.image[0];        
        // const formData = new FormData();
        // formData.append('image', image);
        // const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKkey}`;
        // ============================IMAGE UPLOAD HANDLING

        setSignUpError('');

        // =========================== CREATE USER ON FIREBASE
        createUser(data.email, data.password)
        .then(result => {
            // const user = result.user;
            console.log(result);

            toast('User created successfully.');
            console.log('firebase user created');
            // FIREBASE USER CREATED SUCCESSFULLY
            
            const userInfo = {
                displayName: name,
                email: email,
                image: image
                // photoURL: data.photourl
            }

            console.log(userInfo);
            updateUser(userInfo)
            .then( () => {
                console.log('user info updated on firebase');
                saveUser(name, email, image, userType);
                // navigate('/');
            })
        })
        .catch(error => {
            console.log(error);
            setSignUpError(error.message)
        })
    }

    // ==============================SAVE USER INFORMATION LOCAL DB
    const saveUser = (name, email, image, userType) => {
        const userData = {name, email};

        console.log(userData);
        console.log(image);
        
        
        
        // ============================IMAGE UPLOAD HANDLING
        // const image = data.image[0];        
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=7cd5b5a3570f24b33fb4dc2959ef30e2`;

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
                // const role = 'buyer';

                // userData.append('image', photoUrl)
                addToMongoDb(name, email, photoUrl, userType);
                getUserToken(email);
                // navigate('/');
            }else{
                console.log('wrong upload')
            }
        })
        // ============================IMAGE UPLOAD HANDLING



        // axios
        // .post("https://api.imgbb.com/1/upload", {
        // image: image,
        // name: name,
        // key:  image_host_key,
        // })
        // .then((res) => {
        //     console.log(res);
        //     console.log('uploaded by axio');
        // })
        // .catch((err) => console.log(err));        

    }

    const addToMongoDb = (name, email, imageUrl, userType) => {
        const newUserData = {name, email, imageUrl, role:userType, sellerVerified:false};
        fetch('https://b612-used-products-resale-server-side-elamonii.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUserData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log('user info updated on mongodb');
            setCreatedUserEmail(email);
        })
    }


    // ===============================GET JWT TOKEN=====================
    const getUserToken = email => {
        fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if(data.accessToken){
                console.log('got jwt');
                console.log(data.accessToken);
                localStorage.setItem('accessToken', data.accessToken);
                navigate('/');
            }else{
                console.log('invalid user')
            }
        })
    }
    // ===============================GET JWT TOKEN=====================

    return (
        <div className='h-[700px] flex justify-center items-center my-32'>
            <Helmet><title>Recycle It - SignUp</title></Helmet>
            <div className='border-2 rounded-20 px-16 py-12 w-96 rounded-xl bg-white'>
                <h2 className='text-xl text-center mb-4'>Signup</h2>

                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register('name', {
                            required: "Name is required."
                        })} type="text" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register('email', {
                            required:'Valid email is required.'
                        })} type="email" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register('password', {
                            required:'Password is required',
                            pattern:{
                                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/, 
                                message:'Password must contain uppercase, lowercase, special character and number.'
                            },
                            minLength:{
                                value:6, message:'Password must have minimum 6 characters.'
                            }
                        })} type="password" className="input input-bordered w-full max-w-xs" />
                        <label className="label"><span className="label-text-alt">Forgot password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    </div>
                                        
                    {/* <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Photo</span></label>
                        <input {...register('image')} type="file" className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                    </div> */}
                    
                    
                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Type</span>
                        </label>
                        <select {...register('userType')} className="select select-bordered">
                            <option value='buyer'>Buyer</option>
                            <option value='seller'>Seller</option>
                        </select>
                    </div>   
                    
                    <div className="form-control w-full max-w-xs mb-8">
                        <label className="label"><span className="label-text">Photo</span></label>
                        <input {...register('image')} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                    </div>

                    <input type="submit" className="btn btn-primary w-full max-w-xs mt-4 text-white uppercase" value="Signup" />


                    <div>
                        {
                            signUpError && <p className='text-red-600 font-bold'>{signUpError}</p>
                        }
                    </div>



                </form>
                <p className='text-secondary label-text'>Already have an account? <Link to={'/login'}>Please login</Link></p>
                <div className="divider">OR</div>

                <button className='btn btn-outline w-full uppercase'>Continue with google</button>

            </div>
        </div>
    );
};

export default SignUp;