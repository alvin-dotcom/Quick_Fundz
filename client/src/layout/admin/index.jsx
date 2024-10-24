import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";


const AdminLayout = () => {
  const {isLoggedIn,role,verificationStatus} = useSelector((state)=>state.auth)
  

  

    if (isLoggedIn) {
    // Ensure that role and verificationStatus exist before navigating
    if (role === "user" && verificationStatus === "verified") {
        return <Navigate to="/" />;
      }
    }
  

   /*    if (role === "user") {
    if (verificationStatus === "verified") {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/auth/kycstatus" />;
    }
  }  */

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
