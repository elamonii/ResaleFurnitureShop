import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import useBuyer from '../hooks/useBuyer';
import Navbar from '../shared/Navbar';

const DashboardLayout = () => {
    const user = useContext(AuthContext);
    // console.log(user.user.email);
    const [isAdmin] = useAdmin(user?.user?.email);
    const [isSeller] = useSeller(user?.user?.email);
    const [isBuyer] = useBuyer(user?.user?.email);
    // console.log(isAdmin);
    return (
        <div className='mx-auto px-4'>
            <Navbar></Navbar>
            {/* <Outlet></Outlet> */}


            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <Outlet></Outlet>
                    {/* <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                
                </div> 
                <div className="drawer-side border-r-2 border-neutral shadow-neutral">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to={'/dashboard'}>My Dashboard</Link></li>
                    {
                        isBuyer && <>
                            <li><Link to={'/dashboard/orders'}>My Orders</Link></li>
                            <li><Link to={'/dashboard/myWishLists'}>My Wishlist</Link></li>                        
                        </>
                    }
                    {
                        isSeller && <>
                            <li><Link to={'/dashboard/sellerProducts'}>My Products</Link></li>                        
                            <li><Link to={'/dashboard/addProduct'}>Add Product</Link></li>                        
                        </>
                    }
                    {
                        isAdmin && <>
                            <li><Link to={'/dashboard/allusers'}>All Users</Link></li>
                            <li><Link to={'/dashboard/allSellers'}>All Sellers</Link></li>
                            <li><Link to={'/dashboard/allBuyers'}>All Buyers</Link></li>
                            <li><Link to={'/dashboard/allProducts'}>All Resale Products</Link></li>
                            <li><Link to={'/dashboard/addCategory'}>Add Category</Link></li>
                            <li><Link to={'/dashboard/addCategory'}>Reported Item</Link></li>
                        </>
                    }
                    </ul>
                
                </div>
            </div>


        </div>
    );
};

export default DashboardLayout;