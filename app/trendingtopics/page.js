"use client";
import React, { useState, useEffect } from 'react';
import GetBarChart from '@/components/Graph/trends_Barchart';
import LoadingSpinner from '@/components/Loading';

const Trending_topics = () => {
  const [data, setData] = useState(null);
  const [dataType, setDataType] = useState('countries');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/trends');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = (type) => {
    setDataType(type);
  };

  let selectedData = null;
  if (data) {
    switch (dataType) {
      case 'countries':
        selectedData = data.countries;
        break;
      case 'languages':
        selectedData = data.languages;
        break;
      case 'locations':
        selectedData = data.locations;
        break;
      default:
        selectedData = null;
    }
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4 text-white">Trending Topics Analysis</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('languages')}>
          Trend Across Languages
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('countries')}>
          Trend Across Regions
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('locations')}>
          Trend Across User Locations
        </button>
      </div>
      <div className="mt-8 p-4 border border-gray-300 rounded">
        {data && data.length > 0 ? (
            <div>
              <GetBarChart data={selectedData} text={dataType}/>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        
      </div>
    </div>
  );
};

export default Trending_topics;