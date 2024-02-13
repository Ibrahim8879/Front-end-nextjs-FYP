"use client";
import React, { useRef, useEffect, useState } from 'react';
import StackedToGroupedBarsGraph from './bar';

const BarLineGraph = () => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(isInViewport(targetRef.current));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility initially

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className='min-h-128'>
      <h1 className="text-4xl text-white mt-16 mb-32 ml-20 underline underline-offset-8">Explore Our Solutions</h1>
      <div ref={targetRef}>
        {isVisible ? (
          <div className="flex justify-center items-center">
            <StackedToGroupedBarsGraph xz={xz} yz={yz} n={n} />
          </div>
        ) : (
          <>Graph</>
        )}
      </div>
    </div>
  );
};


export default BarLineGraph;