import { Navigate, useRoutes } from "react-router-dom";

import AdminLayout from "../layout/admin";
import UserLayout from "../layout/user";
import AuthLayout from "../layout/auth";

import HomePage from "../pages/auth/Home"
import LoginPage from "../pages/auth/Login";
import SignupPage from "../pages/auth/SignUp"

import Invest from "../pages/dashboard/InvestPage"
import KYC from "../pages/dashboard/KYCPage"
import Loan from "../pages/dashboard/LoanPage"
import Menu from "../pages/dashboard/MenuPage"
import Payment from "../pages/dashboard/PaymentPage"
import Page404 from "../pages/Page404";
import KYCRequestPage from "../pages/dashboard/KYCRequestPage";
import LoanRequestPage from "../pages/dashboard/LoanRequestPage";
import KycStatus from "../pages/dashboard/KycStatusPage";

export default function Router(){
    return useRoutes([
        {
            path:'/auth',
            element:<AuthLayout/>,
            children:[
               {path:'/auth/home', element:<HomePage/>},
               {path:'/auth/login', element:<LoginPage/>},
               {path:'/auth/signup', element:<SignupPage/>},
               {path:'/auth/kyc', element:<KYC/>},
               {path:'/auth/kycstatus', element:<KycStatus/>},
            ]
        },
        {
            path:'/admin',
            element:<AdminLayout/>,
            children:[
                {element: <Navigate to="/admin/menu" replace/>,index:true},
                {path:'/admin/menu', element:<Menu/>},
                {path:'/admin/kycRequest',element:<KYCRequestPage/>},
                {path:'/admin/loanRequest',element:<LoanRequestPage/>},
                {path:'404',element:<Page404/>},
                { path: "*", element: <Navigate to="/404" replace /> }
            ]
        },
        {
            path:'/',
            element:<UserLayout/>,
            children:[
                { element: <Navigate to="/menu" replace />, index: true },
                
                {path:'menu',element:<Menu/>},
                {path:'invest',element:<Invest/>},
                {path:'loan',element:<Loan/>},
                {path:'payment',element:<Payment/>},
                {path:'404',element:<Page404/>},
                { path: "*", element: <Navigate to="/404" replace /> }
            ]
        },
        { path: "*", element: <Navigate to="/404" replace /> },
    ])
}