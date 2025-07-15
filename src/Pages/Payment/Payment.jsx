import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentFrom from './PaymentFrom';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const Payment = () => {
    return (
        <div>
           <Elements stripe={stripePromise}>
            <PaymentFrom></PaymentFrom>
           </Elements>
        </div>
    );
};

export default Payment;