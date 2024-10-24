import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { isLoggedIn, role, verificationStatus } = useSelector((state) => state.auth)


  if (isLoggedIn) {
    if (role === "admin"&& verificationStatus==="verified") {
      return <Navigate to="/admin" />;
    } else if (role === "user" && verificationStatus==="verified") {
      return <Navigate to="/" />
    }
  }

  /* if (role === "admin" && verificationStatus === "verified") {
   return <Navigate to="/admin" />;
 }
 
 if (role === "user") {
   if (verificationStatus === "verified") {
     return <Navigate to="/" />;
   } else {
     return <Navigate to="/auth/kycstatus" />;
   }
 }  */

  return (
    <>
      <Outlet />

    </>
  );
};

export default AuthLayout;
