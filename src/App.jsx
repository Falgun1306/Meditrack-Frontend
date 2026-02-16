import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AuthStore from './Store/Auth.store.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const checkAuth = AuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className='text-black'>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </div>
  )
}

export default App
