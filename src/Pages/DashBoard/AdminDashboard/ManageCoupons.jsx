import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import Loading from '../../../SharedPage/Loading';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();
    const [form, setForm] = useState({ name: '', code: '', discount: '', quantity: '', expiresAt: '' });
    const [editingCoupon, setEditingCoupon] = useState(null);

    // Fetch all coupons
    const { data: coupons = [], refetch, isLoading } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupon');
            return res.data;
        },
    });

    // Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit new or updated coupon
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            discount: parseInt(form.discount),
            quantity: parseInt(form.quantity),
            expiresAt: new Date(form.expiresAt).toISOString(),
        };

        try {
            if (editingCoupon) {
                await axiosSecure.patch(`/coupon/${editingCoupon._id}`, payload);
                Swal.fire('Updated!', 'Coupon updated successfully.', 'success');
            } else {
                await axiosSecure.post('/coupon', payload);
                Swal.fire('Created!', 'Coupon added successfully.', 'success');
            }
            refetch();
            setForm({ name: '', code: '', discount: '', quantity: '', expiresAt: '' });
            setEditingCoupon(null);
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This coupon will be deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });
        if (result.isConfirmed) {
            await axiosSecure.delete(`/coupon/${id}`);
            refetch();
            Swal.fire('Deleted!', 'Coupon has been deleted.', 'success');
        }
    };

    // Fill form for editing
    const handleEdit = (coupon) => {
        setForm({
            name: coupon.name,
            code: coupon.code,
            discount: coupon.discount,
            quantity: coupon.quantity,
            expiresAt: coupon.expiresAt.slice(0, 10),
        });
        setEditingCoupon(coupon);
    };
    if (isLoading) return <Loading></Loading>
    return (
        <div className="p-4 md:p-10 bg-green-50 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-700">🎫 Manage Coupons</h2>

            {/* Coupon Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10 bg-white p-4 rounded shadow">
                <input className="input input-bordered ml-3" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input className="input input-bordered ml-3" name="code" placeholder="Code" value={form.code} onChange={handleChange} required />
                <input className="input input-bordered ml-3" type="number" name="discount" placeholder="Discount (%)" value={form.discount} onChange={handleChange} required />
                <input className="input input-bordered ml-3" type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
                <input className="input input-bordered ml-3" type="date" name="expiresAt" placeholder="Expiry Date" value={form.expiresAt} onChange={handleChange} required />
                <button className="btn w-60 mx-auto bg-green-700 text-white col-span-1 md:col-span-2">
                    {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
                </button>
            </form>

            {/* Mobile View - Card */}
            <div className="grid md:hidden gap-4">
                {coupons.map((coupon) => (
                    <div key={coupon._id} className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500 space-y-1">
                        <h3 className="text-lg font-bold text-green-800 ml-4">{coupon.name}</h3>
                        <p className="text-sm ml-4">Code: <span className="font-semibold ml-4">{coupon.code}</span></p>
                        <p className="text-sm ml-4">Discount: {coupon.discount}%</p>
                        <p className="text-sm ml-4">Quantity: {coupon.quantity}</p>
                        <p className="text-sm ml-4 text-gray-500">Expires: {format(new Date(coupon.expiresAt), 'yyyy-MM-dd')}</p>
                        <div className="mt-2 flex gap-2 ml-4">
                            <button onClick={() => handleEdit(coupon)} className="btn btn-sm bg-green-600 text-white">Edit</button>
                            <button onClick={() => handleDelete(coupon._id)} className="btn btn-sm bg-red-600 text-white">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block overflow-x-auto  shadow-md">
                <table className="table w-full ">
                    <thead className="bg-green-100 text-green-800">
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Quantity</th>
                            <th>Expires</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon._id} className='hover:bg-green-100'>
                                <td>{coupon.name}</td>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount}%</td>
                                <td>{coupon.quantity}</td>
                                <td>{format(new Date(coupon.expiresAt), 'yyyy-MM-dd')}</td>
                                <td className="space-x-2">
                                    <button onClick={() => handleEdit(coupon)} className="btn btn-sm bg-green-600 text-white">Edit</button>
                                    <button onClick={() => handleDelete(coupon._id)} className="btn btn-sm bg-red-600 text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCoupons;
