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

  const data={
    fullName: fullName,
    email:email,
    phoneNumber:phoneNumber,
    aadharNumber:aadharNumber,
    bankNumber:bankNumber,
    IFSCCode:IFSCCode,
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(UserKyc(data))
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-sm w-full sm:max-w-md lg:max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Submit Your KYC Details</h1>
        <p className="text-gray-600 mb-6 text-center">
          <span className="font-semibold">Know Your Customer (KYC)</span> is a critical process for verifying your identity and ensuring the security and compliance of our platform. By providing your KYC details, you help us maintain a safe environment for all users and comply with regulatory standards.
        </p>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number</label>
            <input
              type="number"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Account Number</label>
            <input
              type="number"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">IFSC Code</label>
            <input
              type="text"
              value={IFSCCode}
              onChange={(e) => setIFSCNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYC;
