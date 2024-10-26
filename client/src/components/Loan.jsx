import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Loan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 8;
  const [loans, setLoans] = useState([]); 

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch('http://localhost:3001/investments/getloan');
        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          setLoans(result.data);
        } else {
          console.error('Unexpected data format:', result);
        }
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * loansPerPage;
  const firstIndex = lastIndex - loansPerPage;
  const currentLoans = loans.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(loans.length / loansPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="z-index-50">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-scroll overflow-x-hidden">
        <h1 className="text-2xl font-bold mb-6 text-center">Live Loans</h1>
        <div className="grid grid-cols-1 gap-4">
          {currentLoans.map((loan, index) => (
            <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Amount:</strong> {loan.amount}</p>
                <p><strong>Duration:</strong> {loan.duration}</p>
              </div>
              <div>
                <p><strong>Interest Rate:</strong> {loan.interest_rate}</p>
              </div>
              <div className="space-2 gap-2 flex flex-col">
                <button className="bg-green-500 text-white px-4 py-2 rounded-full">Accept</button>
                {/* <button className="bg-red-500 text-white px-4 py-2 rounded-full">Reject</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">View</button> */}
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

export default Loan;
