import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
// ----------------------------------------------------------------------

const initialState = {
  isLoggedIn: false,
  email: "",
  error: false,
  role:null,
  token:null,
  user_id:null,
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
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
    },
     signOut(state, action) {
      state.isLoggedIn = false;
       state.token = null;
      state.user_id = null;
      state.role=null;
      state.email=""; 
    }, 
    /* updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    }, */
  },
});

// Reducer
export default slice.reducer;

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post("auth/login", formValues);

      const {token,role , user_id, message, } = response.data;

      dispatch(
        slice.actions.logIn({
          isLoggedIn: true,
          role,
          token,
          user_id,
          email: formValues.email,
        })
      );

      window.localStorage.setItem("user_id", user_id);
      //window.localStorage.setItem("token", token);
      toast.success(message|| "Login Successful");

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
       response = await axios.post("auth/register", formValues);
const {user_id , message} = response.data;
      

      window.localStorage.setItem("user_id", user_id);
      //window.localStorage.setItem("token", token);
      toast.success(message|| "Login Successful");

    } catch (error) {
      toast.error(error.message || "Login failed.");
       //dispatch(slice.actions.updateIsLoading({ isLoading: false, error: true }));
    } finally {
      if(!getState().auth.error){
        window.location.href = "/auth/kyc";
        const {token,role , user_id } = response.data;

      dispatch(
        slice.actions.logIn({
          isLoggedIn:true,
          role,
          token,
          user_id,
          email: formValues.email,
        })
      );
  
      }
      

    }
  };
} 