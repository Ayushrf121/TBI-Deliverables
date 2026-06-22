import React from 'react';

/**
 * @param {string} text - Button text
 * @param {string} type - HTML button type (button, submit)
 * @param {string} variant - primary, secondary, or danger
 * @param {boolean} disabled - Disables the button
 * @param {function} onClick - Click handler function
 */
const Button = ({ text, type = 'button', variant = 'primary', disabled = false, onClick }) => {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded font-medium disabled:opacity-50 ${styles[variant]}`}
    >
      {text}
    </button>
  );
};

export default Button;