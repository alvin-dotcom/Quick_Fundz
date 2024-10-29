import React from 'react';
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../redux/slices/auth';

const Menu = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
  const handleLogout = (e)=>{
    e.preventDefault();
    dispatch(LogoutUser());
    navigate("/auth/home");
  }

  return (
    <>
        
          
          
      
          <button type='submit' onClick={handleLogout}>Logout</button>
          <div className="flex h-screen overflow-hidden">
          <div className="z-index-50 ">
          
          <Sidebar />
        </div>
    <div className="h-screen  flex-1 flex-wrap flex items-center justify-around bg-gray-100">
    
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
