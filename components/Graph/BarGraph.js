"use client";
import React, { useRef } from 'react';


const BarLineGraph = () => {
      const data = [
  { month: 'Jan', cost: 100 },
  { month: 'Feb', cost: 150 },
  { month: 'Mar', cost: 200 },
  { month: 'Apr', cost: 180 },
  { month: 'May', cost: 250 },
  { month: 'Jun', cost: 300 },
  { month: 'Jul', cost: 280 },
  { month: 'Aug', cost: 320 },
  { month: 'Sep', cost: 350 },
  { month: 'Oct', cost: 400 },
  { month: 'Nov', cost: 380 },
  { month: 'Dec', cost: 420 },
];

// Calculate the maximum cost for scaling
const maxCost = Math.max(...data.map(item => item.cost));

return (
  <div className='min-h-screen'>
    <h1 className="text-4xl text-white underline underline-offset-8">Explore Our Solutions</h1>
    
  </div>
);
};

export default BarLineGraph;