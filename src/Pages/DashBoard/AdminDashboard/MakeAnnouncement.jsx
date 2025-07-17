import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../SharedPage/Loading';

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const [form, setForm] = useState({ title: '', message: '', audience: 'All Members' });
  const [editId, setEditId] = useState(null);

  const { data: announcements = [], refetch, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      postedBy: 'Admin',
      date: format(new Date(), 'yyyy-MM-dd'),
    };

    try {
      if (editId) {
        await axiosSecure.patch(`/announcements/${editId}`, payload);
        Swal.fire('Updated!', 'Announcement has been updated.', 'success');
      } else {
        await axiosSecure.post('/announcements', payload);
        Swal.fire('Posted!', 'Announcement has been added.', 'success');
      }
      setForm({ title: '', message: '', audience: 'All Members' });
      setEditId(null);
      refetch();
    } catch {
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this announcement?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/announcements/${id}`);
        Swal.fire('Deleted!', 'Announcement has been removed.', 'success');
        refetch();
      }
    });
  };

  const handleEdit = (announcement) => {
    setEditId(announcement._id);
    setForm({
      title: announcement.title,
      message: announcement.message,
      audience: announcement.audience,
    });
  };
if (isLoading) {
  return <Loading />
}
  return (
    <div className="p-4 space-y-6">
      {/* 🔵 Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md space-y-4">
        <h2 className="text-xl font-bold">{editId ? 'Edit Announcement' : 'New Announcement'}</h2>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          required
          className="textarea textarea-bordered w-full"
        />
        <select
          name="audience"
          value={form.audience}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option>All Members</option>
          <option>Only Football</option>
          <option>Only Badminton</option>
        </select>
        <button type="submit" className="btn md:w-100 mx-auto block bg-green-600 text-white ">
          {editId ? 'Update' : 'Post Announcements'}
        </button>
      </form>

      {/* 🔵 Responsive List */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-green-700 text-center">📢 All Announcements</h2>

        {/* Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full bg-green-50">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Message</th>
                <th>Audience</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a, i) => (
                <tr key={a._id}>
                  <td>{i + 1}</td>
                  <td>{a.title}</td>
                  <td>{a.message}</td>
                  <td>{a.audience}</td>
                  <td>{a.date}</td>
                  <td className='flex'>
                    <button onClick={() => handleEdit(a)} className="btn btn-sm bg-green-500 text-white mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(a._id)} className="btn btn-sm bg-red-500 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (Mobile) */}
        <div className="md:hidden grid gap-4">
          {announcements.map((a, i) => (
            <div key={a._id} className="bg-white p-4 rounded shadow space-y-2 border-l-4 border-green-600">
              <h3 className="text-lg font-bold text-green-800">{a.title}</h3>
              <p className="text-sm text-gray-700">{a.message}</p>
              <p className="text-xs text-gray-500">🎯 Audience: {a.audience}</p>
              <p className="text-xs text-gray-500">📅 {a.date}</p>
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => handleEdit(a)} className="btn btn-sm bg-green-500 text-white">
                  Edit
                </button>
                <button onClick={() => handleDelete(a._id)} className="btn btn-sm bg-red-500 text-white">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
