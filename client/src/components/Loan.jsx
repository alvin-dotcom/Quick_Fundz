import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaSearch } from "react-icons/fa";
import LoanAcceptForm from "./LoanAcceptForm";
import { allInvestments, loanRequest } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

const Loan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 8;
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [showInvestor, setShowInvestor] = useState(null);
  const [loanAcceptUserId, setLoanAcceptUserId] = useState(null);
  const [loanAcceptUsers_Id, setLoanAcceptUsers_Id] = useState(null);
  const [investorAmount, setInvestorAmount] = useState(null);
  const [investorDuration, setInvestorDuration] = useState(null);
  const [investorRate, setInvestorRate] = useState(null);
  const [investorUserId, setInvestorUserId] = useState(null);
  const [investorEmail, setInvestorEmail] = useState(null);
  const [loanStatus, setLoanStatus] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [error, setError] = useState("");
  const { user_id } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const InvestorDetail = await dispatch(allInvestments());
        const result = await InvestorDetail;
        setShowInvestor(InvestorDetail)
        if (result?.status === "success" && Array.isArray(result?.data)) {
          setLoans(result?.data);
          setFilteredLoans(result?.data);
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchLoans();
  }, [dispatch]);

  const applyFilter = () => {
    const filtered = loans.filter((loan) => {
      // Parse and format amount input and loan amount for comparison
      const amountValue = amount ? parseFloat(amount.replace(/₹\s*/, '')) : null;
      const loanAmount = loan.amount ? parseFloat(loan.amount.replace(/₹\s*/, '')) : null;

      // Parse interest rate input and loan interest rate for comparison
      const interestRateValue = interestRate ? parseFloat(interestRate.replace('%', '')) : null;
      const loanInterestRate = loan.interest_rate ? parseFloat(loan.interest_rate.replace('%', '')) : null;

      // Convert loan duration to months if it's defined
      const durationPattern = /^(\d+)\s*(month|months|day|days|year|years)?$/i;
      let loanDuration = loan.duration;

      if (loanDuration && durationPattern.test(loanDuration)) {
        const [, durationNum, unit] = loanDuration.match(durationPattern);
        loanDuration = parseInt(durationNum, 10);

        // Convert units to months if not already in months
        if (/year/i.test(unit)) {
          loanDuration *= 12;
        } else if (/day/i.test(unit)) {
          loanDuration = Math.round(loanDuration / 30); // Roughly convert days to months
        }
      }

      // Parse input duration assuming it’s in months for comparison
      const durationValue = duration ? parseInt(duration, 10) : null;

      // Apply filtering conditions
      const amountMatch = amountValue !== null ? loanAmount <= amountValue : true;
      const durationMatch = durationValue !== null ? loanDuration >= durationValue : true;
      const interestRateMatch = interestRateValue !== null ? loanInterestRate <= interestRateValue : true;

      return amountMatch && durationMatch && interestRateMatch;
    });

    // Set filtered results and reset current page to 1 for new results
    setFilteredLoans(filtered);
    setCurrentPage(1);
  };


  const resetFilter = () => {
    setAmount("");
    setDuration("");
    setInterestRate("");
    setFilteredLoans(loans);
    setShowFilter(false);
  };

  const lastIndex = currentPage * loansPerPage;
  const firstIndex = lastIndex - loansPerPage;
  const currentLoans = filteredLoans.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredLoans.length / loansPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleUserRemoval = (userId) => {
    const updatedRequestList = showInvestor.filter(user => user.id !== userId);
    setShowInvestor(updatedRequestList);
  }

  const handleClick = (investorId, investorUserId, investorAmount, investorDuration, investorRate, investorEmail, status) => {
    setInvestorEmail(investorEmail);
    setLoanAcceptUserId(investorId);
    setInvestorUserId(investorUserId)
    setInvestorDuration(investorDuration)
    setInvestorRate(investorRate)
    setInvestorAmount(investorAmount);
    setLoanAcceptUsers_Id(user_id)
    setLoanStatus(status);
    setIsOverlayOpen(true);
  }

  const handleSubmit = (amount, duration, interestRate) => {
    const data = {
      investorUserId: investorUserId,
      investorEmail: investorEmail,
      investorAmount: investorAmount,
      investorDuration: investorDuration,
      investorRate: investorRate,
      userId: loanAcceptUserId, // Use the stored userId
      loanUserId: loanAcceptUsers_Id, // Use the stored usersId
      status: loanStatus,
      loanAmount: amount,
      loanDuration: duration,
      loanInterestRate: interestRate
    };

    dispatch(loanRequest(data));
    handleUserRemoval(loanAcceptUserId); // Remove user from the list after rejection
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
    const durationPattern = /^(\d+)\s*(month|months|day|days|year|years)?$/i;

    if (value === "" || durationPattern.test(value)) {
      setDuration(value.replace(/\D/g, "")); // Only keep numbers in state
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
      <div className="z-index-50">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 max-w-8xl mx-auto p-4 overflow-y-auto relative">
        <h1 className="text-2xl font-bold mb-6 text-center">Live Loans</h1>
        <button
          className="p-3 border border-black text-black rounded-full shadow-md hover:bg-gray-100 flex items-center space-x-2 w-44 absolute top-4 right-4"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaSearch size={16} />
          <span className="hidden sm:inline">Search</span>
        </button>
        {showFilter && (
          <div className="absolute top-20 right-4 bg-white p-4 border shadow-lg rounded-lg w-96 z-50 overflow-y-auto">
            <div className="flex flex-col gap-4 mb-6">
              <input
                type="text"
                placeholder="Minimum Amount"
                value={amount}
                onChange={handleChangeAmount}
                onBlur={handleBlurAmount}
                onFocus={handleFocusAmount}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Maximum Duration"
                value={duration}
                onChange={handleChangeDuration}
                onBlur={handleBlurDuration}
                onFocus={handleFocusDuration}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Maximum Interest Rate"
                value={interestRate}
                onChange={handleChangeInterest}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-full"
                onClick={applyFilter}
              >
                Apply
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full"
                onClick={resetFilter}
              >
                Reset
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4">
          {currentLoans.map((loan, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Name:</strong> {loan.name}
                </p>
                <p>
                  <strong>Email:</strong> {loan.email}
                </p>
                <p>
                  <strong>Amount:</strong> {loan.amount}
                </p>
              </div>
              <div>
                <p>
                  <strong>Duration:</strong> {loan.duration}
                </p>
                <p>
                  <strong>Interest Rate:</strong> {loan.rate_of_interest}
                </p>
              </div>
              <div className="space-2 gap-2 flex flex-col">
                <button className="bg-green-500 text-white px-4 py-2 rounded-full" onClick={() => handleClick(loan.id, loan.user_id, loan.amount, loan.duration, loan.rate_of_interest, loan.email, 'processing')}>
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === 1 ? "bg-gray-300" : "bg-slate-800 text-white"
              }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === index + 1
                  ? "bg-amber-500 text-white"
                  : "bg-gray-300"
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded-full cursor-pointer ${currentPage === totalPages
                ? "bg-gray-300"
                : "bg-green-600 text-white"
              }`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <LoanAcceptForm
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        onSubmit={handleSubmit} // Pass the rejection submission handler
      /*userId={currentRejectUserId} // Pass the userId to RejectionOverlay
      usersId={currentRejectUsersId} */
      />
    </div>
  );
};

export default Loan;
