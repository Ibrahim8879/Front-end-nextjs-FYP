"use client";
import React, { useState } from 'react';
import Word_Freq_Count_location from '@/components/wordusage/wordusage_loca';
import Word_Freq_Count_language from '@/components/wordusage/wordusage_lang';

const SimplePage = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className="justify-center items-center h-full">
      <div className="text-center">
        <div>
            <h1 className="text-white text-4xl font-bold mb-4 mt-10">Select Word Cloud Source: </h1>
            <button className="rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4" onClick={() => handleButtonClick('location')}>
              Word Cloud from Location
            </button>
            <button className="rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={() => handleButtonClick('language')}>
              Word Cloud from Language
            </button>
        </div>
        <div className='h-full'>
          {selectedButton === 'location' && <Word_Freq_Count_location />}
          {selectedButton === 'language' && <Word_Freq_Count_language />}
        </div>
      </div>
    </div>
  );
};

export default SimplePage;

