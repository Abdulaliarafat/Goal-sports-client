import React from 'react';
import animationData from '../assets/new error.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router';
const Error = () => {
    return (
        <div>
            <div className='rounded-2xl mt-30 md:mt-0 '>
            <div className='space-y-2 md:space-y-3 max-w-3xl  rounded-2xl  md:mx-auto flex flex-col justify-center items-center'>
            <Lottie animationData={animationData} className='w-full h-[420px] ' ></Lottie>
           <p className='font-extrabold text-5xl text-red-500 text-center text-balance'>404-Page Not found</p>
           <p className='font-medium text-lg text-red-300 text-center text-balance'>Oop's the page you are looking dosn't exist</p>
           <Link to={'/'}>
            <button className='py-2 px-3 font-medium text-white rounded-xl bg-red-500 hover:bg-red-800 hover:text-white'>Go back Home</button>
            </Link>
            </div>
        </div>
        </div>
    );
};

export default Error;