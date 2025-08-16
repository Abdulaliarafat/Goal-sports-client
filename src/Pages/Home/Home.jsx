import React from 'react';
import Banner from './Banner/Banner';
import AboutClub from './AboutClub';
import Location from './Location';
import Promotions from './Promotions';
import ActivitiesSection from './ActivitiesSection';
import OffersSection from './OffersSection';
import CoachesSection from './CoachesSection';

const Home = () => {
    return (
        <div className=''>
        <Banner></Banner>
        <AboutClub></AboutClub>
        <Location></Location>
        <ActivitiesSection></ActivitiesSection>
        <OffersSection></OffersSection>
        <CoachesSection></CoachesSection>
       <Promotions></Promotions>
        </div>
    );
};

export default Home;