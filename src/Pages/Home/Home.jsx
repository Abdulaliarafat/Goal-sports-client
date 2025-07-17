import React from 'react';
import Banner from './Banner/Banner';
import AboutClub from './AboutClub';
import Location from './Location';
import PromotionToggole from './PromotionToggole';

const Home = () => {
    return (
        <div className=''>
        <Banner></Banner>
        <AboutClub></AboutClub>
        <Location></Location>
        <PromotionToggole></PromotionToggole>
        </div>
    );
};

export default Home;