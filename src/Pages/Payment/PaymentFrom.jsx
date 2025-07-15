import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Loading from '../../SharedPage/Loading';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const { isPending, data: bookingInfo = {} } = useQuery({
    queryKey: ['bookings', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved/${id}`);
      return res.data;
    }
  });

  if (isPending) return <Loading />;

  const baseAmount = bookingInfo.totalPrice;
  const discountedAmount = baseAmount - discount;
  const amountInCent = discountedAmount * 100;

  const applyCoupon = () => {
    if (coupon === 'SPORTS10') {
      const discountValue = baseAmount * 0.1;
      setDiscount(discountValue);
      Swal.fire('Coupon Applied', '10% discount applied!', 'success');
    } else {
      Swal.fire('Invalid Coupon', 'This coupon code is not valid.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
      return;
    }

    setError('');
    const res = await axiosSecure.post('/create-payment-intent', {
      amountInCent,
      id
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email
        }
      }
    });

    if (result.error) {
      setError(result.error.message);
      setIsProcessing(false);
      alert('Payment failed');
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        const paymentData = {
          bookingId: id,
          email: user.email,
          amount: discountedAmount,
          discount,
          coupon,
          paymentMethod: result.paymentIntent.payment_method_types
        };

        const paymentRes = await axiosSecure.post('/payments', paymentData);

        if (paymentRes.data.insertedId) {
          Swal.fire({
            title: 'Payment Successful!',
            html: `<p>Your transaction ID is:</p><strong>${result.paymentIntent.id}</strong>`,
            icon: 'success',
            confirmButtonText: 'Go to My Bookings'
          }).then(() => {
            navigate('/dashboard/confirmedBookingse');
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:p-20 p-10 mt-18 md:mt-8 border-2 border-green-400  rounded shadow space-y-4 max-w-2xl mx-auto">
      {/* Coupon */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="input input-bordered w-full"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        {/* data came from database dinamicaly */}
        <button type="button" onClick={applyCoupon} className="btn btn-sm bg-green-600 text-white">
          Apply
        </button>
      </div>

      {/* Readonly Fields */}
      <input readOnly className="input input-bordered w-full" value={user.email} />
      <input readOnly className="input input-bordered w-full" value={bookingInfo.courtType} />
      <input readOnly className="input input-bordered w-full" value={bookingInfo.slots.join(', ')} />
      <input readOnly className="input input-bordered w-full" value={`৳${discountedAmount} (${discount ? `Saved ৳${discount}` : 'No Discount'})`} />
      <input readOnly className="input input-bordered w-full" value={bookingInfo.bookingDate} />

      {/* Card Element */}
      <CardElement className="p-3 border rounded text-black bg-white" />

      {/* Pay Button */}
      <button type="submit" disabled={!stripe || isProcessing} className="btn btn-primary w-full bg-green-600 text-white">
        {isProcessing ? 'Processing...' : `Pay ৳${discountedAmount}`}
      </button>

      {error && <p className="text-red-500 text-center font-bold">{error}</p>}
    </form>
  );
};

export default PaymentForm;
