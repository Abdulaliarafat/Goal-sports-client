import React from 'react';
import Navber from '../SharedPage/Navber';
import { Outlet } from 'react-router';
import Footer from '../SharedPage/Footer';

const Root = () => {
    return (
        <div className=''>
            <header className='sticky top-0 z-10'>
                <Navber></Navber>
            </header>
            <main className=''>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Root;