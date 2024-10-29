import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {  negotiateValue ,negotiationApprove,rejectNegotiation} from '../redux/slices/auth';

const NegotiateLoan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastAmount,setLastAmount]=useState(null); 
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);


   // Sample user data for display
   /* const users = Array(41).fill({
    name: 'John Doe',
    aadharNo: 'XXXX-XXXX-XXXX',
    phone: '1234567890',
    address: '123 Main St, City, State',
  });  */
  const usersPerPage = 8;

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = lastAmount?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(lastAmount?.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchKycRequests = async () => {
      //const data = { investorUserId: user_id };
      try {
       const finalAmount=await dispatch(negotiateValue());
        setLastAmount(finalAmount.finalAmount);
      } catch (error) {
        console.error("Error fetching KYC requests: ", error);
      }
    };

    fetchKycRequests();

    
  }, [dispatch, user_id]);
  
  const handleApprove=(negotiateId,loanId,status)=>{
    const data={
      negotiateId: negotiateId,
      loanId: loanId,
      status: status
    }
    dispatch(negotiationApprove(data))
    window.location.reload();
  }

  const handleReject=(negotiateId,loanId,status)=>{
    const data={
      negotiateId:negotiateId,
      loanId:loanId,
      status:status
    }
    dispatch(rejectNegotiation(data))
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="z-index-50 ">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-scroll overflow-x-hidden">
        <h1 className="text-2xl font-bold mb-6 text-center">Loan Requests</h1>
        <div className="grid grid-cols-1 gap-4">
          {currentUsers?.map((user, index) => (
            <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
              <div className="relative border p-4 rounded-lg flex h-32 justify-between items-center gap-5">
                <span className="absolute top-0 text-xl text-gray-600 font-bold ">Negotiation-Requirements</span>
                <div className="flex flex-col ">
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Amount:</strong> {user?.negotiate_amount}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <p><strong>Duration:</strong> {user?.negotiate_duration}</p>
                  <p><strong>Interest Rate:</strong> {user?.negotiate_rate_of_interest}</p>
                </div>
              </div>
              <div className="relative border p-4 rounded-lg h-32 flex justify-between items-center gap-5">
                <span className="absolute top-0 text-xl text-gray-600 font-bold ">Your Requirements</span>
                <div className="flex flex-col gap-4">
                  <p><strong>Amount:</strong> {user?.loan_amount}</p>
                  <p><strong>Duration:</strong> {user?.loan_duration}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <p><strong>Interest Rate:</strong> {user?.loan_rate_of_interest}</p>
                </div>
              </div>

              <div className="space-2 gap-2 flex flex-col ">
                {user.negotiate_status==='Approved'?<button className="bg-green-500 text-white px-4 py-2 rounded-full" onClick={()=>handleApprove(user.id,user.loan_id,'Approved')}>Approved</button>:                    <button className="bg-green-500 text-white px-4 py-2 rounded-full" onClick={()=>handleApprove(user.id,user.loan_id,'Approved')}>Approve</button>

}
                    {user.negotiate_status !=='Approved' && <button className="bg-red-500 text-white px-4 py-2 rounded-full" onClick={()=>handleReject(user.id,user.loan_id,'Rejected')}>Reject</button>}
                  
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
     
    </div>
  );
};

export default NegotiateLoan;