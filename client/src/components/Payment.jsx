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
      <div className="z-index-50">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Payment Options
          </h1>
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              Select Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="upi">UPI</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          {paymentMethod === "upi" && (
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Enter UPI ID
              </label>
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {paymentMethod === "credit_card" && (
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Credit Card Number
              </label>
              <input
                type="text"
                placeholder="Enter card number"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {paymentMethod === "paypal" && (
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                PayPal Email
              </label>
              <input
                type="email"
                placeholder="Enter PayPal email"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {paymentMethod === "bank_transfer" && (
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                Bank Account Number
              </label>
              <input
                type="text"
                placeholder="Enter bank account number"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Proceed with Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
