import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Loan = () => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    setSearchResults([
      { id: 1, name: 'Rishabh Raj',  rate: '5.0%' },
      { id: 2, name: 'Rishav Raj',  rate: '3.5%' }
    ]);
  };

  const handleRequest = (lenderId) => {
    console.log(`Request sent to lender with ID: ${lenderId}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
          <div className="z-index-50 ">
          
          <Sidebar />
        </div>
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Loan Application</h1>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Loan Amount</label>
          <input
            type="number"
            placeholder="Enter loan amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Duration</label>
          <input
            type="text"
            placeholder="Enter duration (e.g., 12 months)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md w-full mb-6 hover:bg-blue-700 transition"
        >
          Search
        </button>
        <div>
          {searchResults.length > 0 && (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={result.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{result.name}</h2>
                    <p className="text-gray-600 mb-2">{result.details}</p>
                    <p className="text-gray-700 font-bold">Interest Rate: {result.rate}</p>
                  </div>
                  <button
                    onClick={() => handleRequest(result.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Send Request
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Loan;
