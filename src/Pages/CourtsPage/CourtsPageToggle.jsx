import React from 'react';
import useAuth from '../../Hook/useAuth';
import CourtsPage from './CourtsPage';
import CourtsPageStatic from './CourtsPageStatic';

const CourtsPageToggle = () => {
    const{user}=useAuth()
    if(user){
      return <CourtsPage></CourtsPage>
    }
    else{
        return <CourtsPageStatic></CourtsPageStatic>
    }
};

export default CourtsPageToggle;