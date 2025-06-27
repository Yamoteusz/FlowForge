import { useEffect, useState } from 'react';

export default function InactivityModal() {
  const [showModal, setShowModal] = useState(false);
  let inactivityTimer;

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => setShowModal(true), 15 * 60 * 1000); // 15 min
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Start timer

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(inactivityTimer);
    };
  }, []);

  const handleStay = () => {
    setShowModal(false);
    resetTimer();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Jesteś tam?</h2>
        <p className="mb-4">Nie wykryto żadnej aktywności przez 15 minut.</p>
        <button
          onClick={handleStay}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          Tak, jestem
        </button>
      </div>
    </div>
  );
}
