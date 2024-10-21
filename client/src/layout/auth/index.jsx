import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const {isLoggedIn,role} = useSelector((state)=>state.auth)
  
  
  if(isLoggedIn){
    if(role === "admin"){
return <Navigate to="/admin"/>;
    }else if(role ==="user"){
      return <Navigate to="/"/>
    }
  }

  return (
    <>
    <Outlet />
    
    </>
  );
};

export default AuthLayout;
