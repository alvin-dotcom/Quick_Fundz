import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { investmentEntry } from "../redux/slices/auth";
import { useDispatch } from "react-redux";

const Invest = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = { amount, duration, interestRate };
      dispatch(investmentEntry(data));
      setMessage("Investment done successfully.");
      setAmount("");
      setDuration("");
      setInterestRate("");
    } catch (error) {
      setMessage("Error saving investment data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAmount = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setAmount(value);
    const amountPattern = /^\d+$/;
    if (value === "" || amountPattern.test(value)) setError("");
    else setError("Please enter a valid amount.");
  };

  const handleBlurAmount = () => {
    if (amount) setAmount(`₹ ${amount}`);
  };

  const handleFocusAmount = () => {
    setAmount(amount.replace("₹ ", ""));
  };

  const handleChangeDuration = (e) => {
    const value = e.target.value;
    setDuration(value);
    const durationPattern = /^(\d+)\s*(month|months|day|days|year|years)$/i;
    if (value === "" || durationPattern.test(value)) setError("");
    else setError("Please enter a valid duration.");
  };

  const handleBlurDuration = () => {
    if (duration) setDuration(`${duration} month`);
  };

  const handleFocusDuration = () => {
    setDuration(duration.replace('month', ''));
  };

  const handleChangeInterest = (e) => {
    const value = e.target.value.replace('%', '');
    const ratePattern = /^(100(\.0{1,2})?|[1-9]?[0-9](\.[0-9]{1,2})?)$/;
    if (value === "" || ratePattern.test(value)) {
      setInterestRate(value);
      setError("");
    } else {
      setError("Enter a valid interest rate.");
    }
  };

  const handleBlur = () => {
    if (interestRate) setInterestRate(`${interestRate} %`);
  };

  const handleFocus = () => {
    setInterestRate(interestRate.replace('%', ''));
  };

  return (
    <div className="flex h-screen">
      <div className="z-index-50">
        <Sidebar />
      </div>
      <div className="flex-1 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Investment Form
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={handleChangeAmount}
                onBlur={handleBlurAmount}
                onFocus={handleFocusAmount}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Duration (in months)
              </label>
              <input
                type="text"
                placeholder="Enter duration (e.g., 2 months)"
                value={duration}
                onChange={handleChangeDuration}
                onBlur={handleBlurDuration}
                onFocus={handleFocusDuration}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Interest Rate (%)
              </label>
              <input
                type="text"
                placeholder="Enter interest rate (e.g., 5%)"
                value={interestRate}
                onChange={handleChangeInterest}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md w-full mb-4 hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            {message && (
              <div
                className={`text-center mt-4 ${
                  message.startsWith("Error") ? "text-red-500" : "text-green-500"
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
