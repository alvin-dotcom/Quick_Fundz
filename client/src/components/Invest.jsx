import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Invest = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3001/investments/invest",
        {
          amount,
          duration,
          interestRate,
        }
      );

      setMessage("Investment Done successfully.");
      setAmount("");
      setDuration("");
      setInterestRate("");
    } catch (error) {
      setMessage("Error saving investment data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="z-index-50 ">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-200 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Investment Form
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Duration (in months)
              </label>
              <input
                type="text"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md w-full mb-4 hover:bg-blue-700 transition"
            >
              Submit
            </button>
            {loading && (
              <div className="text-center text-blue-500 mt-4">Loading...</div>
            )}
            {message && (
              <div
                className={`text-center mt-4 ${
                  message.startsWith("Error")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invest;
