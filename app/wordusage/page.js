import React from 'react';
import Link from 'next/link';

const SimplePage = () => {

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-black text-3xl font-bold mb-6">Select Word Cloud Source:</h1>
        <Link href='wordusageext1'>
          <button className="rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Location</button>
        </Link>
        <Link href='wordusageext2' className=''>
          <button className="rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Language</button>
        </Link>
      </div>
    </div>
  );
};

export default SimplePage;
