import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <section className='footer-center p-10'>
            <footer className="footer">
                <div>
                    <span className="footer-title">Services</span> 
                    <Link to='/' className="link link-hover">Home</Link>
                    <Link to='/categories' className="link link-hover">Categories</Link>
                </div> 
                <div>
                    <span className="footer-title">Company</span> 
                    <Link to='/' className="link link-hover">About us</Link>
                    <Link to='/faq' className="link link-hover">FAQ</Link>
                </div> 
                <div>
                    <span className="footer-title">Legal</span> 
                    <Link to='/' className="link link-hover">Terms of use</Link>
                    <Link to='/' className="link link-hover">Privacy policy</Link>
                </div>
            </footer>
            <div className="divider"></div>

            <div className='text-center mt-6'>
                <p className='font-semibold'>Copyright © 2022 - All right reserved by Recycle It</p>
            </div>
        </section>
    );
};

export default Footer;
