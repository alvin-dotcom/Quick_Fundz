import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaSearch } from "react-icons/fa"; 

const Loan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 8;
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/investments/getloan"
        );
        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          setLoans(result.data);
          setFilteredLoans(result.data);
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchLoans();
  }, []);

  const applyFilter = () => {
    const filtered = loans.filter((loan) => {
      const amountMatch = amount ? loan.amount <= Number(amount) : true;
      const durationMatch = duration ? loan.duration >= Number(duration) : true;
      const interestRateMatch = interestRate
        ? loan.interest_rate <= Number(interestRate)
        : true;
      return amountMatch && durationMatch && interestRateMatch;
    });
    setFilteredLoans(filtered);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setAmount("");
    setDuration("");
    setInterestRate("");
    setFilteredLoans(loans);
    setShowFilter(false);
  };

  const lastIndex = currentPage * loansPerPage;
  const firstIndex = lastIndex - loansPerPage;
  const currentLoans = filteredLoans.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredLoans.length / loansPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="z-index-50">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-y-auto relative">
        <h1 className="text-2xl font-bold mb-6 text-center">Live Loans</h1>
        <button
          className="p-3 border border-black text-black rounded-full shadow-md hover:bg-gray-100 flex items-center space-x-2 w-44 absolute top-4 right-4"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaSearch size={16} />
          <span className="hidden sm:inline">Search</span>
        </button>
        {showFilter && (
          <div className="absolute top-20 right-4 bg-white p-4 border shadow-lg rounded-lg w-96 z-50 overflow-y-auto">
            <div className="flex flex-col gap-4 mb-6">
              <input
                type="number"
                placeholder="Minimum Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 rounded-lg"
              />
              <input
                type="number"
                placeholder="Maximum Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border p-2 rounded-lg"
              />
              <input
                type="number"
                placeholder="Maximum Interest Rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-full"
                onClick={applyFilter}
              >
                Apply
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full"
                onClick={resetFilter}
              >
                Reset
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4">
          {currentLoans.map((loan, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Amount:</strong> {loan.amount}
                </p>
                <p>
                  <strong>Duration:</strong> {loan.duration}
                </p>
              </div>
              <div>
                <p>
                  <strong>Interest Rate:</strong> {loan.interest_rate}
                </p>
              </div>
              <div className="space-2 gap-2 flex flex-col">
                <button className="bg-green-500 text-white px-4 py-2 rounded-full">
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            className={`px-4 py-2 rounded-full cursor-pointer ${
              currentPage === 1 ? "bg-gray-300" : "bg-slate-800 text-white"
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded-full cursor-pointer ${
                currentPage === index + 1
                  ? "bg-amber-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded-full cursor-pointer ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-green-600 text-white"
            }`}
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
