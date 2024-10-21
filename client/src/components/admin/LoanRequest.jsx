import React, { useState } from 'react';
import Sidebar from '../Sidebar';

const LoanRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Sample user data for display
  const users = Array(41).fill({
    name: 'John Doe',
    aadharNo: 'XXXX-XXXX-XXXX',
    phone: '1234567890',
    address: '123 Main St, City, State',
  });

  // Pagination logic
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = users.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen overflow-hidden">
          <div className="z-index-50 ">
          
          <Sidebar />
        </div>
    <div className="flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-scroll overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-6 text-center">Loan Requests</h1>
      <div className="grid grid-cols-1 gap-4">
        {currentUsers.map((user, index) => (
          <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Aadhar No:</strong> {user.aadharNo}</p>
            </div>
            <div>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            </div>
            <div className="space-2 gap-2 flex flex-col ">
              <button className="bg-green-500 text-white px-4 py-2 rounded-full">Approve</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full">Reject</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      
      <div className="flex justify-end mt-6 space-x-2 ">
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

export default LoanRequest;
