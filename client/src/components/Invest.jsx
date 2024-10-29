import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { investmentEntry } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

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
      const data = {
        amount:amount,
        duration:duration,
        interestRate:interestRate,
      }
      
      dispatch(investmentEntry(data))
      setMessage("Investment Done successfully.");
      setAmount("");
      setDuration("");
      setInterestRate("");
    } catch (error) {
      setMessage("Error saving investment data.",error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAmount = (e) => {
    const value = e.target.value.replace(/[^\d]/g, " "); // Strip non-numeric characters
    setAmount(value);
  
    const amountPattern = /^\d+$/; // Only allow numbers
  
    // Check if input matches the amount pattern
    if (value === "" || amountPattern.test(value)) {
      setError(""); // Clear error if valid
    } else {
      setError("Please enter a valid amount (e.g., '40000').");
    }
  };
  
  // Function to handle blur event (add ₹ symbol)
  const handleBlurAmount = () => {
    if (amount) {
      setAmount(`₹ ${amount}`); // Add ₹ symbol on blur if there's a value
    }
  };
  
  // Function to handle focus event (remove ₹ symbol)
  const handleFocusAmount = () => {
    setAmount(amount.replace("₹ ", "")); // Remove ₹ symbol on focus for editing
  };

  const handleChangeDuration = (e) => {
    const value = e.target.value;
    setDuration(value); // Update state with every keystroke

    const durationPattern = /^(\d+)\s*(month|months|day|days|year|years)$/i;

    // Check if input matches the full duration pattern
    if (value === "" || durationPattern.test(value)) {
      setError(""); // Clear error if valid
    } else {
      setError("Please enter a valid duration (e.g., '2 months', '1 year').");
    }
  };
  const handleBlurDuration = () => {
    if (duration) {
      setDuration(`${duration} month`); // Append '%' on blur if there’s a valid value
    }
  };

  const handleFocusDuration = () => {
    setDuration(duration.replace('month', '')); // Remove '%' on focus for editing
  };

  const handleChangeInterest = (e) => {
    const value = e.target.value.replace('%', ''); // Remove '%' for easier typing
    const ratePattern = /^(100(\.0{1,2})?|[1-9]?[0-9](\.[0-9]{1,2})?)$/; // Validate 0-100 with optional decimals

    // Check if the input matches the rate pattern
    if (value === "" || ratePattern.test(value)) {
      setInterestRate(value); // Update state without '%'
      setError(""); // Clear error if input is valid
    } else {
      setError("Enter a valid interest rate (e.g., 2, 5.5, 100)");
    }
  };

  const handleBlur = () => {
    if (interestRate) {
      setInterestRate(`${interestRate} %`); // Append '%' on blur if there’s a valid value
    }
  };

  const handleFocus = () => {
    setInterestRate(interestRate.replace('%', '')); // Remove '%' on focus for editing
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
  type="text"
  placeholder="Enter amount"
  value={amount}
  onChange={handleChangeAmount}
  onBlur={handleBlurAmount}
  onFocus={handleFocusAmount}
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
                placeholder="Enter duration (e.g., 2 months)"
                value={duration}
                onChange={handleChangeDuration}
                onBlur={handleBlurDuration}
        onFocus={handleFocusDuration}
                className="p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Interest Rate (%)
              </label>
              <input
        type="text"
        placeholder="Enter interest rate (e.g., 5%)"
        value={interestRate}
        onChange={handleChangeInterest}
        onBlur={handleBlur}
        onFocus={handleFocus}
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
