import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  email: "",
  error: false,
  role: null,
  token: null,
  user_id: null,
  verificationStatus:'pending',
  kycMessage: null,
  loan_status:'processing',
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    }, */
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.verificationStatus = action.payload.verificationStatus;
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.kycMessage = action.payload.kycMessage;
      
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.user_id = null;
      state.role = null;
      state.email = "";
    },
    /* updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    }, */
    verifiedUser(state,action){
      state.isLoggedIn = action.payload.isLoggedIn;
      state.role=action.payload.role;
      state.verificationStatus = action.payload.verificationStatus;
    },
    /* verifyLoan(state, action){
      state.loan_status=action.payload.loan_status;
    } */
  },
});

// Reducer
export default slice.reducer;

export function LoginUser(formValues) {
  console.log(formValues.email);
  return async (dispatch, getState) => {
    try {
      const response = await axios.post("auth/login", formValues,{withCredentials: true});

      const { token, role, user_id, message, verificationStatus,kycMessage} = response.data;
      if(verificationStatus === 'verified'){
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            role,
            verificationStatus,
            token,
            user_id,
            email: formValues.email,
          })
        );
      }else{
        dispatch(
          slice.actions.logIn({
            user_id,
            verificationStatus,
            kycMessage
          })
        )
        window.location.href='/auth/kycstatus'
        
      }
      

      window.localStorage.setItem("user_id", user_id);
      //window.localStorage.setItem("token", token);
      toast.success(message || "Login Successful");

    } catch (error) {
      toast.error(error.message || "Login failed.");
      /* dispatch(slice.actions.updateIsLoading({ isLoading: false, error: true }));
    } finally {
      dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false })); */
    }
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    window.location.reload();
    dispatch(slice.actions.signOut());
  };
}

export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    let response;
    try {
      response = await axios.post("auth/register", formValues,{withCredentials: true});
      const { user_id, message } = response.data;


      window.localStorage.setItem("user_id", user_id);
      //window.localStorage.setItem("token", token);
      toast.success(message || "Login Successful");
if (!getState().auth.error) {
        window.location.href = "/auth/kyc"
}
    } catch (error) {
      toast.error(error.message || "Login failed.");
      //dispatch(slice.actions.updateIsLoading({ isLoading: false, error: true }));
    } 
      
        /* const {token,role , user_id } = response.data;
      dispatch(
        slice.actions.logIn({
          isLoggedIn:true,
          role,
          token,
          user_id,
          email: formValues.email,
        })
      ) */
      
  };
  
} 

export function UserKyc(formValues){
  return async(dispatch,getState)=>{
    try {
     const response =await axios.post("auth/kycEntry",formValues,{withCredentials: true})
      const {message}=response.data;
     toast.success(message || "KYC under processing ");

     if(!getState().auth.error){
      window.location.href = "/auth/kycstatus" 
          }
    } catch (error) {
      toast.error(error.message)
    }
      
  }
}

 export function verifiedKyc(formValues){
  console.log(formValues);
  return async(dispatch,getState)=>{
    try {
      const response= await axios.post('auth/verifiedKyc',formValues ,{withCredentials: true})
      
      const {role,message,verificationStatus}=response.data;
      dispatch(
        slice.actions.verifiedUser({
          isLoggedIn:true,
          role,
          verificationStatus
        })
        
      )
      
toast.success(message);
    } catch (error) {
      toast.error(error.message)
    }
  } 
} 

export function showKycRequest(){
  return async (dispatch,getState)=>{
    try {
      const response = await axios.get('admin/showRequest')
      return response.data;
    } catch (error) {
      console.log(error.message)
    }
  }
}

export function confirmOrRejectRequest(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('admin/confirmOrRejectUser',formValues);
    } catch (error) {
      console.log(error.message)
    }
  }
}

export function rejectedkyc(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('auth/updatekyc',formValues);
      const {message,verificationStatus}=response.data;
      toast.success(message || "KYC under processing ");
      dispatch(
        slice.actions.verifiedUser({
          verificationStatus
        })
      )
      if(!getState().auth.error){
       window.location.href = "/auth/kycstatus" 
           }
    } catch (error) {
      toast.error(error.message)

    }
  }
}

export function investmentEntry(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post(
        "investments/invest",formValues,{withCredentials:true}
      );

    } catch (error) {
      console.log(error)
    }
  }
}

export function allInvestments(){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.get('investments/moneyLender',{withCredentials:true})
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
}

export function loanRequest(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('loanRequest/loan',formValues,{withCredentials:true})
      
    } catch (error) {
      console.log(error)
    }
  }
}

export function requestInvestor(formValues){
  return async(dispatch,getState)=>{
     
      try {
        const response = await axios.post('loanRequest/requestInvestor',formValues,{withCredentials:true})        
  
        return response.data;
        
      } catch (error) {
        console.log(error)
      }
    
  }
}

export function rejectedLoan(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('loanRequest/rejectLoan',formValues,{withCredentials:true})
    } catch (error) {
      console.log(error)
    }
  }
}

export function approvedLoan(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('loanRequest/acceptLoan',formValues,{withCredentials:true})
    } catch (error) {
      console.log(error)
    }
  }
}

export function investorNegotiate(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('loanRequest/lastNegotiate',formValues,{withCredirectials:true})
    } catch (error) {
      console.log(error)
    }
  }
}

export function negotiateValue(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.get('negotiateRequest/allNegotiateAmount',{withCredentials:true})

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
}

export function negotiationApprove(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('negotiateRequest/approveNegotiation',formValues,{withCredentials:true})
    } catch (error) {
      console.log(error)
    }
  }
}

export function rejectNegotiation(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('negotiateRequest/negotiationReject',formValues,{withCredentials:true})
    } catch (error) {
      console.log(error)
    }
  }
}

export function moneyPaid(formValues){
  return async(dispatch,getState)=>{
    try {
      const response = await axios.post('loanRequest/paidStatus',formValues,{withCredentials:true})
    } catch (error) {
      console.log(error)
    }
  }
}

export function kycUser(){
  return async()=>{
    try {
      const response = await axios.get('admin/kycUsers');
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
}

export function adminUpdateKyc_user(formValues){
  console.log(formValues);
  return async()=>{
try {
        const response = await axios.post('admin/adminUpdateKycUser',formValues,{withCredentials:true})
  
} catch (error) {
  console.log(error)
}    
  }
}

export function activeUser(){
  return async()=>{
    try {
      const response = await axios.get('admin/users');
      
      return response.data;

    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteCurrentUser(formValues){
  return async()=>{
    try {
      const response = await axios.get(`admin/deleteUser/${formValues}`)
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }

}

export function adminUpdateCurrent_user(formValues){
  return async()=>{
    try {
      const response = await axios.post('admin/UpdateCurrent_user', formValues,{withCredentials:true});
    } catch (error) {
      console.log(error)
    }
  }
}

export function adminMessage(){
  return async()=>{
    try {
      const response = await axios.get('admin/message',{withCredentials:true})

      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
}

/* export function deleteMessage(){
  return async()=>{
    try {
      const response = await axios.get('admin/messageDelete',{withCredentials:true})
    } catch (error) {
      console.log(error)
    }
  }
} */

  export function investedUsers(){
    return async()=>{
      try {
        const response = await axios.get('admin/allInvestment',{withCredentials:true})
        return response.data;
      } catch (error) {
        console.log(error)
      }
    }
  }

  export function loanRequestUsers(){
    return async()=>{
      try {
        const response = await axios.get('admin/allLoanRequest',{withCredentials:true});
        return response.data;
      } catch (error) {
        console.log(error)
      }
    }
  }

  export function updateLoanRequestUser(formValues){
return async()=>{
  try {
    const response = await axios.post('admin/updateLoan_details',formValues);

  } catch (error) {
    console.log(error)
  }
}
  }

  export function updateInvestedUser(formValues){
    return async()=>{
      try {
        const response = await axios.post('admin/updateInvestor_details',formValues)
      } catch (error) {
        console.log(error)
      }
    }
  }