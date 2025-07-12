import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../SharedPage/Navber';
import Footer from '../SharedPage/Footer';
import Lottie from 'lottie-react';
import animationData from '../assets/Goal.json'


const AuthLayout = () => {
    return (

        <div className='bg-green-100'>
            <header className='sticky top-0 z-10'><Navbar></Navbar></header>
            <div className="p-5 pb-20 max-w-5xl mx-auto">

                <div className="flex flex-col md:flex-row-reverse">
                    <div className='flex-1 mt-18'>
                       <Lottie  animationData={animationData}></Lottie>
                    </div>
                    <div className='flex-1'>
                        <main><Outlet></Outlet></main>
                    </div>
                </div>
            </div>
            <footer><Footer></Footer></footer>
        </div>
    );
};

export default AuthLayout;