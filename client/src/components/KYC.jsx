import { useState } from 'react';
//import { supabase } from '../supabaseClient';
import { UserKyc } from '../redux/slices/auth';
import { useDispatch } from 'react-redux';

const KYC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [IFSCCode, setIFSCNumber] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const data = {
    fullName,
    email,
    phoneNumber,
    aadharNumber,
    bankNumber,
    IFSCCode,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UserKyc(data));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-2">
      <div className="bg-white p-4 rounded-xl shadow-lg w-full sm:max-w-md lg:max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-3">Submit Your KYC Details</h1>
        <p className="text-gray-600 mb-3 text-center text-sm">
          <span className="font-semibold">Know Your Customer (KYC)</span> is a critical process for verifying your identity and ensuring security.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Aadhar Number</label>
            <input
              type="number"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Bank Account Number</label>
            <input
              type="number"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">IFSC Code</label>
            <input
              type="text"
              value={IFSCCode}
              onChange={(e) => setIFSCNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full font-semibold hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYC;
