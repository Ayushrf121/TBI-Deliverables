import React from 'react';

/**
 * @param {string} size - small, medium, or large
 */
const Loader = ({ size = 'medium' }) => {
  const sizes = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4"
  };

  return (
    <div className="flex items-center justify-center p-2">
      <div className={`animate-spin rounded-full border-t-transparent border-blue-600 ${sizes[size]}`}></div>
    </div>
  );
};

export default Loader;