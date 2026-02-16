import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AuthStore from './Store/Auth.store.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const checkAuth = AuthStore(state => state.checkAuth);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsAuthChecking(false);
    };
    verifyAuth();
  }, [checkAuth]);

  // Show loader while checking authentication
  if (isAuthChecking) {
    return (
      <div className='text-black flex items-center justify-center h-screen'>
        <div>Verifying authentication...</div>
      </div>
    );
  }

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
