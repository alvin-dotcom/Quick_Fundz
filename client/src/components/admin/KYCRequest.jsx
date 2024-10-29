import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmOrRejectRequest, showKycRequest } from '../../redux/slices/auth';
import { LogoutUser } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar';
import RejectionOverlay from './RejectionOverlay';

const KYCRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allRequest , setAllRequest] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); 
  const [currentRejectUserId, setCurrentRejectUserId] = useState(null);
  const [currentRejectUsersId, setCurrentRejectUsersId] = useState(null);
  const usersPerPage = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchKycRequests = async () => {
      try {
        const user = await dispatch(showKycRequest()); // Await the response from dispatch
       setAllRequest(user.listOfRequest); // Log the result, which should be the response data
      } catch (error) {
        console.error("Error fetching KYC requests: ", error);
      }
    };

    fetchKycRequests();
  },[dispatch])
  // Sample user data for display
  /* const users = Array(41).fill({
    name: 'John Doe',
    aadharNo: 'XXXX-XXXX-XXXX',
    phone: '1234567890',
    address: '123 Main St, City, State',
  }); */

  // Pagination logic
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = allRequest ? allRequest.slice(firstIndex, lastIndex) : [];
  const totalPages = allRequest ? Math.ceil(allRequest.length / usersPerPage) : 0;
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleUserRemoval = (userId)=>{
    const updatedRequestList=allRequest.filter(user=>user.id !==userId);
    setAllRequest(updatedRequestList);
  }
console.log(allRequest)
  const handleConfirm=(userId,usersId,status)=>{
    const data={
      userId:userId,
      usersId:usersId,
      status:status
    }
    dispatch(confirmOrRejectRequest(data))
    handleUserRemoval(userId);
  }

  const handleReject = (userId, usersId) => {
    setCurrentRejectUserId(userId); // Store userId in state
    setCurrentRejectUsersId(usersId); // Store usersId in state
    setIsOverlayOpen(true); // Open overlay
  };

  // Handle rejection submission
  const handleSubmitRejection = (message) => {
    const data = {
      userId: currentRejectUserId, // Use the stored userId
      usersId: currentRejectUsersId, // Use the stored usersId
      status: 'Not verified',
      message:message
    };
    dispatch(confirmOrRejectRequest(data));
    handleUserRemoval(currentRejectUserId); // Remove user from the list after rejection
  };
  const handleLogout = (e)=>{
    e.preventDefault();
    dispatch(LogoutUser());
    navigate("/auth/home");
  }

  return (
    <div className="flex h-screen overflow-hidden">
    <div className="z-index-50 ">
    
    <Sidebar />
  </div>
    <div className=" flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-scroll overflow-x-hidden">
      <button type='submit' onClick={handleLogout}>Logout</button>
      <h1 className="text-2xl font-bold mb-6">KYC Requests</h1>
      <div className="grid grid-cols-1 gap-4">
        {currentUsers.map((user, index) => (
          <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div>
            <p><strong>Phone:</strong> {user.phone_number}</p>
            <p><strong>Aadhar Number:</strong> {user.aadhar_number}</p>
            </div>
            <div className="space-2 gap-2 flex flex-col ">
              <button className="bg-green-500 text-white px-4 py-2 rounded-full" value={"confirm"} onClick={()=>handleConfirm(user.id,user.user_id,'confirm') }>Confirm</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full" value={"Not verified"} onClick={()=>handleReject(user.id,user.user_id,'Not verified')}>Reject</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      
      <div className="flex justify-end mt-6 space-x-2 ">
        <button
          className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === 1 ? 'bg-gray-300' : 'bg-slate-800 text-white'}`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === index + 1 ? 'bg-amber-500 text-white' : 'bg-gray-300'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-600 text-white'}`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      </div>
      <RejectionOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onSubmit={handleSubmitRejection} // Pass the rejection submission handler
        userId={currentRejectUserId} // Pass the userId to RejectionOverlay
        usersId={currentRejectUsersId}
      />
     </div>
  );
};

export default KYCRequest;
