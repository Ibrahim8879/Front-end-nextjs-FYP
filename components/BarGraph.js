"use client"
import React from 'react';

const BarLineGraph = () => {
    const barHeight = [123,12,3,4,4,5,1,2]; // Change this value to adjust the height of the bar

    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Simple Bar Graph</h2>
        <div className="relative w-10 h-40 mx-auto bg-blue-200">
          <div className="absolute bottom-0 w-full bg-blue-500" style={{ height: `${barHeight}px` }}></div>
        </div>
        <p className="mt-2 text-gray-600">Number</p>
      </div>
    );
};

export default BarLineGraph;
