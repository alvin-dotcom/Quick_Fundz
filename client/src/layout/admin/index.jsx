import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";


const AdminLayout = () => {
  const {isLoggedIn,role} = useSelector((state)=>state.auth)
  

  

  if(isLoggedIn) {
    if(role === "user")
      return <Navigate to="/"/>
  }

     if(!isLoggedIn){
    return <Navigate to="/auth/home"/>
  } 

  
  
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
