import axios from 'axios'

// From config
import {BASE_URL} from "../config"
//const BASE_URL = process.env.RREACT_APP_BACKEND_URL;
const axiosInstance = axios.create({baseURL: BASE_URL})

axiosInstance.interceptors.response.use(
    (response) =>response,
    (error)=>Promise.reject((error.response && error.response.data) || "Something went wrong")
)

export default axiosInstance