import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import MainLayout from '../layout/MainLayout';
import Blogs from '../pages/Blogs/Blogs';
import Categories from '../pages/Categories/Categories';
import AddCategory from '../pages/Dashboard/AddCategory/AddCategory';
import AddOrderProduct from '../pages/Dashboard/AddOrderProduct/AddOrderProduct';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import Dashboard from '../pages/Dashboard/Dashboard/Dashboard';
import FAQ from '../pages/FAQ/FAQ';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import ProductDetails from '../pages/Products/ProductDetails';
import Products from '../pages/Products/Products';
import SignUp from '../pages/SignUp/SignUp';
import PrivateRoute from '../routes/PrivateRoute';
import AdminRoute from './AdminRoute';
import ShowError from '../pages/Error/ShowError';
import AllSellers from '../pages/Dashboard/AllUsers/AllSellers';
import AllBuyers from '../pages/Dashboard/AllUsers/AllBuyers';
import SellerProducts from '../pages/Dashboard/Products/SellerProducts/SellerProducts';
import SellerRoute from './SellerRoute';
import AllProducts from '../pages/Dashboard/Products/AllProducts/AllProducts';
import BuyerRoute from './BuyerRoute';
import MyWishList from '../pages/Dashboard/MyWishList/MyWishList';

const router = createBrowserRouter([
    {
        path:'/',
        errorElement: <ShowError></ShowError>,
        element: <MainLayout></MainLayout>,
        children:[
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/categories',
                element:<Categories></Categories>,
                // loader: ({params}) => fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/categories`)
            },
            {
                path: '/products/:categoryId',
                element:<PrivateRoute><Products></Products></PrivateRoute>,
                loader: ({params}) => fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/productsByCategory/${params.categoryId}`)
            },
            {
                path: '/productDetails/:id',
                element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
                loader: ({params}) => fetch(`https://b612-used-products-resale-server-side-elamonii.vercel.app/productDetails/${params.id}`)
            },
            {
                path: '/blogs',
                element:<Blogs></Blogs>
            },
            {
                path: '/faq',
                element:<FAQ></FAQ>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/dashboard/addProduct',
                element:<SellerRoute><AddOrderProduct></AddOrderProduct></SellerRoute>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/allSellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allBuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allProducts',
                element: <AdminRoute><AllProducts></AllProducts></AdminRoute>
            },
            {
                path: '/dashboard/sellerProducts',
                element: <SellerRoute><SellerProducts></SellerProducts></SellerRoute>
            },
            {
                path: '/dashboard/addCategory',
                element: <AdminRoute><AddCategory></AddCategory></AdminRoute>
            },
            {
                path: '/dashboard/myWishLists',
                element: <BuyerRoute><MyWishList></MyWishList></BuyerRoute>
            },
        ]
    }
]);


export default router;