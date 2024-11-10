import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { store } from "./redux/store.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
          <BrowserRouter>
          <NextUIProvider>
              <App />
              </NextUIProvider>
              <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              theme="dark"
              pauseOnFocusLoss
              draggable
              pauseOnHover
              />
          </BrowserRouter>
          </ReduxProvider>
    </HelmetProvider>
  </StrictMode>
)
