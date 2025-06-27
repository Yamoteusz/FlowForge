import { useEffect, useState } from 'react';

export default function MaintenanceMode() {
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    // Tryb maintenance między 4:00 a 5:00
    if (hours === 4) {
      setIsMaintenance(true);
    }
  }, []);

  if (!isMaintenance) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white text-center z-50">
      <div>
        <h1 className="text-3xl font-bold mb-4">🛠 Prace serwisowe</h1>
        <p className="text-lg">Strona jest tymczasowo niedostępna między 4:00 a 5:00.</p>
        <p className="mt-2">Spróbuj ponownie za chwilę.</p>
      </div>
    </div>
  );
}
