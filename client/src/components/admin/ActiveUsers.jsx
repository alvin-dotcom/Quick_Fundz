import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';

const ActiveUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (role) => {
    console.log("Deleting user with username:", role);
    try {
      const response = await axios.delete(`http://localhost:3001/admin/users/${role}`);
      console.log("Response from delete:", response.data); 
      setUsers(users.filter(user => user.role !== role)); 
    } catch (error) {
      console.error("Error deleting user:", error); 
      alert(`Failed to delete user: ${error.response?.data?.message || error.message}`);
    }
  };
  
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = users.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="z-index-50">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-scroll overflow-x-hidden">
        <h1 className="text-2xl font-bold mb-6 text-center">Active Users</h1>
        <div className="grid grid-cols-1 gap-4">
          {currentUsers.map((user) => (
            <div key={user.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <div>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Verified:</strong> {user.is_verified ? "Yes" : "No"}</p>
              </div>
              <div className="space-2 gap-2 flex flex-col">
                {/* <button className="bg-green-500 text-white px-4 py-2 rounded-full">Approve</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-full">Reject</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">View</button> */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full"
                  onClick={() => deleteUser(user.role)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  Notify
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6 space-x-2">
          <button
            className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === 1 ? 'bg-gray-300' : 'bg-slate-800 text-white'}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === index + 1 ? 'bg-amber-500 text-white' : 'bg-gray-300'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-600 text-white'}`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
