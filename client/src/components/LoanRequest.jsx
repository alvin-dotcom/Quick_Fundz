import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { approvedLoan, investorNegotiate, rejectedLoan, requestInvestor,moneyPaid } from '../redux/slices/auth';
import NegotiateForm from './NegotiateForm'

const LoanRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoanRequest, setShowLoanRequest] = useState(null);
  const [approvedRequests, setApprovedRequests] = useState({});
  const [paidRequests, setPaidRequests] = useState({});
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [investor_email, setInvestor_email] = useState(null);
  const [investoruser_id, setInvestoruser_id] = useState(null);
  const [loan_amount, setLoan_amount] = useState(null);
  const [loan_duration, setLoan_duration] = useState(null);
  const [loanInterestRate, setLoanInterestRate] = useState(null);
  const [loanUserId, setLoanUserId] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);

  const usersPerPage = 8;

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = showLoanRequest?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(showLoanRequest?.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchKycRequests = async () => {
      const data = { investorUserId: user_id };
      try {
        const loanRequestUser = await dispatch(requestInvestor(data));
        setShowLoanRequest(loanRequestUser.loanTaker);
      } catch (error) {
        console.error("Error fetching KYC requests: ", error);
      }
    };

    fetchKycRequests();

    // Load approved and paid requests from localStorage
    const savedApprovedRequests = JSON.parse(localStorage.getItem('approvedRequests')) || {};
    const savedPaidRequests = JSON.parse(localStorage.getItem('paidRequests')) || {};
    setApprovedRequests(savedApprovedRequests);
    setPaidRequests(savedPaidRequests);
  }, [dispatch, user_id]);

  const handleApprove = (index, status, userId, loanId) => {
    const data = {
      status: status,
      userId: userId,
      loanId: loanId
    }
    dispatch(approvedLoan(data))
    const newApprovedRequests = {
      ...approvedRequests,
      [index]: true,
    };
    setApprovedRequests(newApprovedRequests);
    localStorage.setItem('approvedRequests', JSON.stringify(newApprovedRequests));
  };

  const handleRejected = (status, userId, loanId) => {
    const data = {
      status: status,
      userId: userId,
      loanId: loanId,
    };
    dispatch(rejectedLoan(data));
    window.location.reload();
  };

  const handlePay = (index) => {
    const newPaidRequests = {
      ...paidRequests,
      [index]: true,
    };
    setPaidRequests(newPaidRequests);
    localStorage.setItem('paidRequests', JSON.stringify(newPaidRequests));
  };
  const handleNegotiate = (investor_email, investoruser_id, loan_amount, loan_duration, loan_rate_of_interest, loan_user_id, loan_id) => {
    setInvestor_email(investor_email);
    setInvestoruser_id(investoruser_id);
    setLoan_amount(loan_amount);
    setLoan_duration(loan_duration);
    setLoanInterestRate(loan_rate_of_interest);
    setLoanUserId(loan_user_id);
    setLoanId(loan_id);
    setIsOverlayOpen(true)
  }
  const handleSubmit = (amount, duration, interestRate) => {
    const data = {
      investor_email: investor_email,
      investoruser_id: investoruser_id,
      loan_amount: loan_amount,
      loan_duration: loan_duration,
      loanInterestRate: loanInterestRate,
      loanUserId: loanUserId,
      loanId: loanId,
      negotiateAmount: amount,
      negotiateDuration: duration,
      negotiateInterestRate: interestRate
    };

    dispatch(investorNegotiate(data));
  };

  const handlePaid=(investorId,status)=>{
    const data={
      investorId:investorId,
      status:status
    }
    dispatch(moneyPaid(data))
  }

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
                <span className="absolute top-0 text-xl text-gray-600 font-bold ">Loan-Requirements</span>
                <div className="flex flex-col ">
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Amount:</strong> {user?.loan_amount}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <p><strong>Duration:</strong> {user?.duration}</p>
                  <p><strong>Interest Rate:</strong> {user?.rate_of_interest}</p>
                </div>
              </div>
              <div className="relative border p-4 rounded-lg h-32 flex justify-between items-center gap-5">
                <span className="absolute top-0 text-xl text-gray-600 font-bold ">Your Investment</span>
                <div className="flex flex-col gap-4">
                  <p><strong>Amount:</strong> {user?.original_amount}</p>
                  <p><strong>Duration:</strong> {user?.original_duration}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <p><strong>Interest Rate:</strong> {user?.original_rate_of_interest}</p>
                </div>
              </div>

              <div className="space-2 gap-2 flex flex-col ">
                {/* approvedRequests[index] */}
                {user.state === 'Approved' ? (
                  paidRequests[index] ? (
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-full cursor-not-allowed" onClick={()=>handlePaid(user.investor_id,"Paid")}>Paid</button>
                  ) : (
                    <>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={() => handlePay(index)}>Pay</button>
                      <p className="text-sm text-red-600">Pay within three days</p>
                    </>
                  )
                ) : (
                  <>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full" onClick={() => handleApprove(index, 'Approved', user.investor_id, user.id)}>Approve</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-full" onClick={() => handleNegotiate(user.investor_email, user.investoruser_id, user.loan_amount, user.duration, user.rate_of_interest, user.user_id, user.id)}>Negotiate</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-full" onClick={() => handleRejected('Rejected', user.investor_id, user.id)}>Reject</button>
                  </>
                )}
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
      <NegotiateForm
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onSubmit={handleSubmit} // Pass the rejection submission handler
      /*userId={currentRejectUserId} // Pass the userId to RejectionOverlay
      usersId={currentRejectUsersId} */
      />
    </div>
  );
};

export default LoanRequest;