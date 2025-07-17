import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loading from '../../../SharedPage/Loading';

const ManageAllMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: members = [], isPending,isLoading, refetch } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: { role: 'member' }
      });
      return res.data;
    }
  });

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: `Delete ${name}?`,
      text: "This member will be permanently removed.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/users/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', `${name} has been removed.`, 'success');
        refetch();
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isPending) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Manage All Members</h2>

      <input
        type="text"
        placeholder="Search member by name..."
        className="input input-bordered w-full md:w-2/3 mb-6 mx-auto block border-1 border-green-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-500">No members found.</p>
      ) : (
        <>
          {/* Table view for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow">
            <table className="table w-full bg-green-50 mx-5 md:mx-0">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => (
                  <tr key={member._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={member.photo} alt={member.name} className="w-10 h-10 rounded-full" />
                    </td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td><span className="badge badge-success text-white">{member.role}</span></td>
                    <td>
                      <button
                        onClick={() => handleDelete(member._id, member.name)}
                        className="btn btn-xs btn-error text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for small devices */}
          <div className="md:hidden space-y-4 mx-5">
            {filteredMembers.map((member, index) => (
              <div key={member._id} className="bg-green-50 p-4 rounded-lg shadow border border-green-200">
                <div className="flex items-center gap-4 mb-3">
                  <img src={member.photo} alt={member.name} className="w-14 h-14 rounded-full border" />
                  <div>
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <span className="badge badge-success text-white text-xs">{member.role}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(member._id, member.name)}
                  className="btn btn-xs text-white btn-error w-full"
                >
                  Delete Member
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageAllMembers;
