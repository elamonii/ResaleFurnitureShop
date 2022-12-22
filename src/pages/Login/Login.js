import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // =============================SIGN IN
    const { signIn, providerLogin } = useContext(AuthContext);

    // =============================HANDLE SHOW ERROR
    const [loginError, setLoginError] = useState('');

    // =============================JWT
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    // =============================Private route Navigation to desired destination
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from, {replace:true});
    }

    // ========================GOOGLE============================
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () =>{
        providerLogin(googleProvider)
        .then(result => {
            const user = result.user;
            console.log(user);

            //===============================CHECK ACCESS_TOKEN
            setLoginUserEmail(user.email);

            addToMongoDb(user.displayName, user.email, user.photoURL);
            
            navigate(from, { replace: true });
            toast.success(`Welcome ${user.displayName}`);
        })
        .catch(error => {
            console.error(error);
            toast.error(`Something went wrong. Please try again.`);
        })
    }
    // ========================GOOGLE============================

    // ========================GITHUB============================
    const githubProvider = new GithubAuthProvider();

    const handleGithubSignIn = () =>{
        providerLogin(githubProvider)
        .then(result => {
            const user = result.user;
            console.log(user);
            
            //===============================CHECK ACCESS_TOKEN
            setLoginUserEmail(user.email);
            
            addToMongoDb(user.displayName, user.email, user.photoURL);
            
            navigate(from, { replace: true });
            toast.success(`Welcome ${user.displayName}`);
        })
        .catch(error => {
            console.error(error);
            toast.error(`Something went wrong. Please try again.`);
        })
    }

    // ========================GITHUB============================



    // ========================LOGIN WITH USER-PASS============================
    const handleLogin = data => {
        // console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            // console.log(user);
            setLoginUserEmail(user.email);
            // getUserToken(user.email);
            
            addToMongoDb(user.displayName, user.email, user.photoURL);
            navigate(from, { replace: true });
            toast.success(`Welcome ${user.displayName}`);
        })
        .catch(error => {
            setLoginError(error.message);
            // console.log(error.message);
            toast.error(`Something wen wrong`);
        })
    }
    // ========================LOGIN WITH USER-PASS============================

    
    // ===============================GET JWT TOKEN=====================
    // const getUserToken = email => {
    //     fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/jwt?email=${email}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data.accessToken){
    //             console.log('got jwt');
    //             console.log(data.accessToken);
    //             localStorage.setItem('accessToken', data.accessToken);
    //             navigate('/');
    //         }else{
    //             console.log('invalid user')
    //         }
    //     })
    // }
    // ===============================GET JWT TOKEN=====================

        
    const addToMongoDb = (name, email, imageUrl) => {
        const newUserData = {name, email, imageUrl, role:'buyer', sellerVerified:false};
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
            setLoginUserEmail(email);
        })
    }


    return (
        <div className='h-[700px] flex justify-center items-center'>
            <Helmet><title>Recycle It - Login</title></Helmet>
            <div className='border-2 rounded-20 px-16 py-12 rounded-xl my-auto bg-white'>
                <h2 className='text-xl text-center mb-4'>Login</h2>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", {
                            required:true
                        })}  
                        type="email" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <span className='text-red-600 label-text'>{errors.email.message}</span>}
                        
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", {
                            required:true, 
                            minLength: {
                                value:6,
                                message: 'Password at least 6 character long'
                            }, 
                            maxLength: {
                                value:20,
                                message: 'Password length 20 character max'
                            } 
                        })} type="password" className="input input-bordered w-full max-w-xs" />
                        <label className="label"><span className="label-text-alt">Forgot password?</span></label>
                        {errors.password && <span className='text-red-600 label-text'>{errors.password.message}</span>}
                    </div>

                    {/* <p>{data}</p> */}
                    <input type="submit" className="btn btn-primary w-full max-w-xs mt-4 text-white uppercase" value="Login" />


                    <div>
                        {
                            loginError && <p className='text-red-600 font-bold'>{loginError}</p>
                        }
                    </div>


                </form>
                <p className='label-text'>New to Recycle It?? <Link to={'/signup'} className="text-accent ">Create New Account</Link></p>
                <div className="divider">OR</div>

                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full uppercase'>Continue with google</button>
                <div className="divider">OR</div>
                <button onClick={handleGithubSignIn} className='btn btn-outline w-full uppercase'>Continue with github</button>

            </div>
        </div>
    );
};

export default Login;