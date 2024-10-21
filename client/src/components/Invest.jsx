import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Invest = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const generateOtp = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No user found");

      const otpValue = Math.floor(100000 + Math.random() * 900000);
      const { error } = await supabase
        .from("otp")
        .insert([{ user_id: user.id, otp: otpValue }]);

      if (error) throw error;

      setGeneratedOtp(otpValue);
      setMessage("OTP generated and sent to your registered email.");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("otp")
        .select("*")
        .eq("user_id", user.id)
        .eq("otp", otp);

      if (error) throw error;

      if (data.length > 0) {
        setMessage("OTP verified successfully.");
      } else {
        setMessage("Invalid OTP.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
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
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Duration (from - to)
          </label>
          <input
            type="text"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
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
          />
        </div>
        <button
          onClick={generateOtp}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md w-full mb-4 hover:bg-blue-700 transition"
        >
          Generate OTP
        </button>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Enter OTP
          </label>
          <input
            type="number"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <button
          onClick={verifyOtp}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md w-full mb-4 hover:bg-green-700 transition"
        >
          Verify OTP
        </button>
        <button
          onClick={() => navigate("/payment")}
          className="bg-yellow-400 text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-yellow-700 transition"
        >
          Go to Payment
        </button>
        {loading && (
          <div className="text-center text-blue-500 mt-4">Loading...</div>
        )}
        {message && (
          <div
            className={`text-center mt-4 ${
              message.startsWith("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Invest;
