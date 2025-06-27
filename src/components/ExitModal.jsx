import { useState, useEffect } from 'react';

export default function ExitModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      setShowModal(true);
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sendLog = async (action) => {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pipeline_name: 'exit_modal',
          status: action
        })
      });
    } catch (err) {
      console.error('Błąd logowania:', err);
    }
  };

  const confirmExit = () => {
    sendLog('leave_confirmed');
    window.removeEventListener('beforeunload', () => {});
    window.location.href = 'https://www.google.com';
  };

  const cancelExit = () => {
    sendLog('leave_cancelled');
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Czy na pewno chcesz opuścić stronę?</h2>
        <div className="flex justify-around">
          <button
            onClick={confirmExit}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            Niestety muszę
          </button>
          <button
            onClick={cancelExit}
            className="bg-gray-300 text-black px-4 py-2 rounded-xl"
          >
            Rozmyśliłem się
          </button>
        </div>
      </div>
    </div>
  );
}
