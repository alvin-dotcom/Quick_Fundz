import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [details, setDetails] = useState("");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = () => {
    console.log(
      `Processing payment via ${paymentMethod} with details: ${details}`
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
          <div className="z-index-50 ">
          
          <Sidebar />
        </div>
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Payment Options
        </h1>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Select Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="upi">UPI</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>
        {paymentMethod === "upi" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Enter UPI ID
            </label>
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          </div>
        )}
        {paymentMethod === "credit_card" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Credit Card Number
            </label>
            <input
              type="text"
              placeholder="Enter card number"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          </div>
        )}
        {paymentMethod === "paypal" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              PayPal Email
            </label>
            <input
              type="email"
              placeholder="Enter PayPal email"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          </div>
        )}
        {paymentMethod === "bank_transfer" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Bank Account Number
            </label>
            <input
              type="text"
              placeholder="Enter bank account number"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          </div>
        )}
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-blue-700 transition"
        >
          Proceed with Payment
        </button>
      </div>
    </div>
    </div>
  );
};

export default Payment;
