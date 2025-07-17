import { useQuery } from '@tanstack/react-query';
import { useState} from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Loading from '../../../SharedPage/Loading';

const ManageCourts = () => {
    const axiosSecure = useAxiosSecure();
    const [editCourt, setEditCourt] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    const { data: courts = [], refetch, isLoading } = useQuery({
        queryKey: ['manageCourts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/court');
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This court will be deleted permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            const res = await axiosSecure.delete(`/court/${id}`);
            if (res.data.deletedCount > 0) {
                Swal.fire('Deleted!', 'Court has been deleted.', 'success');
                refetch();
            }
        }
    };

    const handleEdit = (court) => {
        setEditCourt(court);
        setValue('title', court.title);
        setValue('type', court.type);
        setValue('img', court.img);
        setValue('slots', court.slots.join(', '));
    };

    const onSubmit = async (data) => {
        const confirm = await Swal.fire({
            title: editCourt ? 'Update Court?' : 'Add Court?',
            text: editCourt ? 'This will update the court details.' : 'This will add a new court.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: editCourt ? 'Yes, update it!' : 'Yes, add it!'
        });

        if (!confirm.isConfirmed) return;

        const formattedData = {
            ...data,
            slots: data.slots.split(',').map(s => s.trim()),
        };

        if (editCourt) {
            const res = await axiosSecure.put(`/court/${editCourt._id}`, formattedData);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Court information has been updated.', 'success');
                setEditCourt(null);
                reset();
                refetch();
            }
        } else {
            const res = await axiosSecure.post('/court', formattedData);
            if (res.data.insertedId) {
                Swal.fire('Success!', 'New court added.', 'success');
                reset();
                refetch();
            }
        }
    };

    if (isLoading){
        return <Loading></Loading>
    }

    return (
        <div className="p-4 mt-2 ">
            <div className='border-2 border-green-500 mb-15 py-2 rounded-2xl'>
                <h2 className="text-2xl font-bold text-green-500 mb-4 text-center mt-2">Manage Courts</h2>

                {/* ➕ Add / Edit Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:ml-10 md:grid-cols-2 gap-4 bg-green-50 p-4 rounded my-10 ">
                    <input className="input input-bordered ml-8" {...register('title', { required: true })} placeholder="Court Title" />
                    <input className="input input-bordered ml-8" {...register('type', { required: true })} placeholder="Court Type" />
                    <input className="input input-bordered ml-8" {...register('img', { required: true })} placeholder="Image URL" />
                    <input className="input input-bordered ml-8" {...register('slots', { required: true })} placeholder="Slots (comma separated)" />
                    <button type="submit" className="btn md:w-90 mx-auto col-span-1 md:col-span-2 bg-green-700 text-white mt-4">
                        {editCourt ? 'Update Court' : 'Add Court'}
                    </button>
                </form>
            </div>

            {/* 📱 Cards for mobile */}
            <div className="md:hidden space-y-4">
                <h2 className="text-2xl font-bold text-green-500 mb-10 text-center ">Update and Delete Courts</h2>
                {courts.map((court) => (
                    <div key={court._id} className="card bg-white shadow p-4 rounded">
                        <img src={court.img} alt={court.title} className="w-full h-40 object-cover rounded" />
                        <h3 className="text-lg font-bold mt-2">{court.title}</h3>
                        <p>Type: {court.type}</p>
                        <p>Slots: {court.slots.join(', ')}</p>
                        <div className="flex justify-between mt-2 mx-3">
                            <button onClick={() => handleEdit(court)} className="btn btn-sm bg-green-600 text-white">Edit</button>
                            <button onClick={() => handleDelete(court._id)} className="btn btn-sm bg-red-600 text-white">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🖥️ Table for desktop */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-green-500 mb-10 text-center ">Update and Delete Courts</h2>
                <table className="table w-full">
                    <thead className="bg-green-100">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Image</th>
                            <th>Slots</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courts.map((court, index) => (
                            <tr key={court._id} className='hover:bg-green-100'>
                                <td>{index + 1}</td>
                                <td>{court.title}</td>
                                <td>{court.type}</td>
                                <td><img src={court.img} alt={court.title} className="w-20 h-12 object-cover" /></td>
                                <td>{court.slots.join(', ')}</td>
                                <td className="space-x-2 flex">
                                    <button onClick={() => handleEdit(court)} className="btn btn-sm bg-green-600 text-white">Edit</button>
                                    <button onClick={() => handleDelete(court._id)} className="btn btn-sm bg-red-600 text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCourts;
