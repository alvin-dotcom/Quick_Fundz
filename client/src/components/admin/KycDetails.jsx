import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';

const KycDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allRequest, setAllRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/users');
        setAllRequest(response.data);
      } catch (error) {
        console.error("Error fetching KYC details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKycDetails();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/admin/deleteUser/${userId}`);
      setAllRequest(allRequest.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = allRequest.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allRequest.length / usersPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">KYC Details</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUsers.map((user) => (
              <div key={user.user_id} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
                <div className="mb-4">
                  <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {user.phone_number}</p>
                  <p className="text-gray-700"><strong>User ID:</strong> {user.user_id}</p>
                  <p className="text-gray-700"><strong>Verified:</strong> {user.is_verified ? 'Yes' : 'No'}</p>
                  <p className="text-gray-700"><strong>Bank Account:</strong> {user.bank_account_number}</p>
                  <p className="text-gray-700"><strong>IFSC Code:</strong> {user.ifsc_code}</p>
                </div>
                <button
                  onClick={() => deleteUser(user.user_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg transition-all hover:bg-red-600 focus:outline-none"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6 space-x-2">
          <button
            className={`px-4 py-2 rounded-full ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-800 text-white'}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? 'bg-amber-500 text-white' : 'bg-gray-300'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white'}`}
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

export default KycDetails;
