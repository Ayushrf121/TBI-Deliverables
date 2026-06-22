import React from 'react';
import Button from './Button';

/**
 * @param {boolean} isOpen - Shows or hides the modal
 * @param {function} onClose - Function to close the modal
 * @param {string} title - Modal heading text
 * @param {React.ReactNode} children - Content inside the modal
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 text-xl">&times;</button>
        </div>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end">
          <Button text="Close" variant="secondary" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;