import React, { useEffect } from 'react';

/**
 * @param {string} message - Text to display in notification
 * @param {string} type - success, error, or info
 * @param {function} onClose - Function to remove the toast
 */
const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => { if (onClose) onClose(); }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    info: "bg-blue-100 border-blue-400 text-blue-700"
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded border shadow-md flex items-center gap-4 ${styles[type]}`}>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="font-bold">&times;</button>
    </div>
  );
};

export default Toast;