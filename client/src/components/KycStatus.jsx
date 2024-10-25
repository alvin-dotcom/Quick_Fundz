import {useDispatch, useSelector} from 'react-redux';
import { verifiedKyc } from '../redux/slices/auth';
import { useNavigate } from 'react-router-dom';
const KYCStatus = () => {
  const {verificationStatus,user_id,kycMessage}=useSelector((state)=>state.auth)
  const navigate = useNavigate();

  let status;
  if(verificationStatus ==='pending'){
     status = 'pending';
  }
   if(verificationStatus ==='confirm'){
    status ='Approved';
  }

  if(verificationStatus ==='Not verified'){
    status = 'Rejected'
  }
    
   

  const statusMessage = () => {
    if (status === 'Approved') {
      return { message: 'Your KYC is Approved.', bgColor: 'bg-green-100', textColor: 'text-green-600' };
    } else if (status === 'Rejected') {
      return { message: `Your KYC was Rejected. (${kycMessage})`, bgColor: 'bg-red-100', textColor: 'text-red-600' };
    } else {
      return { message: 'Your KYC is Pending. We will notify you once it is processed.', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' };
    }
  };

  const { message, bgColor, textColor } = statusMessage();
  const dispatch = useDispatch();
  const handleClick = async (status) => {
    const data={
      status:status,
      user_id:user_id
    }
    dispatch(verifiedKyc(data))
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-4">
      <div className={`p-6 md:p-8 rounded-lg shadow-lg max-w-sm w-full sm:max-w-md lg:max-w-lg mx-auto ${bgColor}`}>
        <h1 className={`text-3xl font-bold text-center mb-6 ${textColor}`}>KYC Status</h1>
        <p className={`text-lg text-center font-semibold ${textColor}`}>{message}</p>
        <div className="mt-8 text-center">
          {status === 'Rejected' && (
            <button onClick={() => navigate('/auth/updatekyc')} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full font-semibold hover:bg-blue-700 transition">
              Update Details
            </button>
          )}
        </div>
        <div className="mt-8 text-center">
          {status === 'Approved' && (
            <button onClick={()=>handleClick('verified')} className="bg-cyan-800 text-white py-2 px-4 rounded-lg w-full font-semibold hover:bg-blue-700 transition">
              Explore
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYCStatus;
