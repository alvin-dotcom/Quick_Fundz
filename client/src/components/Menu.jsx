import { useState, useEffect, useRef } from 'react';
import { IoIosNotificationsOutline } from "react-icons/io";
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminMessage, LogoutUser } from '../redux/slices/auth';

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showMessage, setShowMessage] = useState([]);
  const popupRef = useRef(null); 

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(LogoutUser());
    navigate("/auth/home");
  };

  
  const handleNotificationClick = () => {
    setShowPopup((prev) => !prev);   
    
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
       
      }
    };
    const fetchMessage= async()=>{
      const messages =await dispatch(adminMessage());
      setShowMessage(messages)
    }
    fetchMessage();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      
    };
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center bg-white p-4 text-black shadow-md">
        <h1 className="text-xl font-bold">Quick Fundz</h1>
        <div className="flex items-center">
          <div className="relative inline-block mr-4">
            <button 
              onClick={handleNotificationClick} 
              className="flex items-center justify-center p-2 text-black hover:bg-gray-200 rounded-full"
            >
              <IoIosNotificationsOutline size={28} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{showMessage? '1':'0'}</span>
            </button>
            {showPopup && (<>
              <div ref={popupRef} className="absolute top-12 right-0 w-64 p-4 bg-white border rounded shadow-lg z-50">
                <p className="text-black">{showMessage}</p>
              </div>
              </>
            )}
          </div>
          <button 
            type='submit' 
            onClick={handleLogout} 
            className="ml-4 bg-white px-4 py-2 rounded-xl hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex h-screen overflow-hidden">
        <div className="z-index-50">
          <Sidebar />
        </div>
        <div className="h-screen flex-1 flex-wrap flex items-center justify-around bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>
            <p className="text-lg mt-4">You have successfully logged in!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
