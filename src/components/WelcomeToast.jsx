import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WelcomeToast() {
  useEffect(() => {
    toast.info('Witaj w systemie FlowForge! 🚀', {
      position: 'top-center',
      autoClose: 3000,
    });
  }, []);

  return <ToastContainer />;
}
