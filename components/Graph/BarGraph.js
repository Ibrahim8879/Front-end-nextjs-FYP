"use client";
import React, { Suspense } from 'react';
import StackedToGroupedBarsGraph from './bar';

const BarLineGraph = () => {
  const xz = Array.from(Array(58).keys()); // Array from 0 to 57
  const yz = [
    Array.from({ length: 58 }, () => Math.random()), // Sample data for yz arrays
    Array.from({ length: 58 }, () => Math.random()),
    Array.from({ length: 58 }, () => Math.random()),
    Array.from({ length: 58 }, () => Math.random()),
    Array.from({ length: 58 }, () => Math.random())
  ];
  const n = 5;
  return (
    <div>
      <h1 className="text-4xl text-white mt-16 mb-32 ml-20 underline underline-offset-8">Explore Our Solutions</h1>
      <div className="flex justify-center items-center">
        <StackedToGroupedBarsGraph xz={xz} yz={yz} n={n} />
      </div>
    </div>
  );
};


export default BarLineGraph;