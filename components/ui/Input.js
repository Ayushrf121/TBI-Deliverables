
// @param: This stands for parameter (which means "Prop" in the context of a React component). It tells the editor that the next piece of text is a prop variable name.

import React from 'react';

/**
 * @param {string} label - Input label text
 * @param {string} type - text, password, email, etc.
 * @param {string} placeholder - Input placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler function
 */
const Input = ({ label, type = 'text', placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;