import React from 'react';
import useAuth from '../../Hook/useAuth';
import PromotionsStatc from './PromotionsStatc';
import Promotions from './Promotions';

const PromotionToggole = () => {
    const {user}=useAuth()
     if(user){
        return <Promotions></Promotions>
     }
     else{
      return <PromotionsStatc></PromotionsStatc>
     }
};

export default PromotionToggole;