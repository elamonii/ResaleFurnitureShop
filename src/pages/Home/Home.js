import React from 'react';
import { Helmet } from 'react-helmet-async';
import Categories from '../Categories/Categories';
import MostRecentProducts from '../Products/MostRecentProducts';
import Advertisements from './Advertisement/Advertisements';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div>
            <Helmet><title>Recycle It - Home</title></Helmet>
            <Banner></Banner>
            <Advertisements></Advertisements>
            <Categories></Categories>
            <MostRecentProducts></MostRecentProducts>
        </div>
    );
};

export default Home;