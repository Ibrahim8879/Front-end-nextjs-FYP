import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-full border-t-4 border-blue-500 border-solid h-24 w-24 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;