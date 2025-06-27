import { useEffect } from 'react';

export default function ExitConfirmation() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleUnloadPrompt = (e) => {
      const confirmation = window.confirm("Czy na pewno chcesz opuścić stronę?");
      if (!confirmation) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnloadPrompt);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnloadPrompt);
    };
  }, []);

  return null;
}
