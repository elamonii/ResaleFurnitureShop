import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/assets/logo-furniture.png';
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext);
    console.log(user);
    
    const handleLogOut = () => {
        logOut()
        .then( () => {})
        .catch( err => console.log(err))
    }

    return (
        <div className="navbar bg-base-100 mb-8">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/categories'}>Categories</Link></li>
                    {/* <li><Link>Blog</Link></li> */}
                    <li><Link to={'/faq'}>FAQ</Link></li>
                    {/* <li><Link>About</Link></li> */}
                </ul>
                </div>
                {/* <Link className="btn btn-ghost normal-case text-xl"> */}
                <Link to={'/'} className="flex normal-case">
                    <img src={Logo} className="h-8 lg:h-16 mr-4" alt="furniture-logo-blue" />
                    <span className='my-auto uppercase text-sm lg:text-2xl md:text-xl font-bold'>Recycle It</span>
                </Link>
            </div>



            <div className="navbar-center hidden lg:flex mt-5">
                <ul className="menu menu-horizontal p-0">
                    <li className='border-b-4 border-base-100 font-semibold hover:border-b-4 focus:border-b-4 hover:border-primary focus:border-primary'>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className='border-b-4 border-base-100 font-semibold hover:border-b-4 focus:border-b-4 hover:border-primary focus:border-primary rounded'>
                        <Link to={'/categories'}>Categories</Link>
                    </li>
                    {/* <li className='border-b-4 border-base-100 font-semibold hover:border-b-4 focus:border-b-4 hover:border-primary focus:border-primary rounded'>
                        <Link>Blog</Link>
                    </li> */}
                    <li className='border-b-4 border-base-100 font-semibold hover:border-b-4 focus:border-b-4 hover:border-primary focus:border-primary rounded'>
                        <Link to={'/faq'}>FAQ</Link>
                    </li>
                    <li className='border-b-4 border-base-100 font-semibold hover:border-b-4 focus:border-b-4 hover:border-primary focus:border-primary focus:bg-base-100 rounded'>
                        <Link>About</Link>
                    </li>
                    {
                        user?.uid &&
                        <li className='border-b-4 border-base-100 font-semibold hover:border-b-4 focus:border-b-4 hover:border-primary focus:border-primary focus:bg-base-100 rounded'>
                            <Link to={'/dashboard'}>{user?.displayName}'s Dashboard</Link>
                        </li>
                    }

                </ul>
            </div>
            <div className="navbar-end">
            { user?.uid? 
                <>
                    {/* <span className='mr-8'>Welcome {user?.displayName}</span> */}
                    {/* <li><Link to={'/dashboard'}  className="btn btn-outline btn-primary font-bold btn-sm ml-2">Dashboard</Link></li> */}
                    <button  className="btn btn-outline btn-primary font-bold btn-sm ml-2" onClick={handleLogOut}>Sign Out</button>
                </>
                :
                <>
                <Link to={'/login'} className="btn btn-outline btn-primary font-bold btn-sm ml-2">Login</Link>
                <Link to={'/signup'} className="btn btn-outline btn-primary font-bold btn-sm ml-2">SignUp</Link>
                </>
            }





                {/* <Link to={'/login'} className="btn btn-outline btn-primary font-bold btn-sm ml-2">Login</Link>
                <Link to={'/signup'} className="btn btn-outline btn-primary font-bold btn-sm ml-2">SignUp</Link>
                <Link to={'/signout'} className="btn btn-outline btn-primary font-bold btn-sm ml-2">SignOut</Link>
             */}
            
            </div>
        </div>
    );
};

export default Navbar;