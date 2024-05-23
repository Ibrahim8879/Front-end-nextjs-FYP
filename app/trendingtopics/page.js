"use client";
import React, { useState, useEffect } from 'react';
import GetBarChart from '@/components/Graph/trends_Barchart';
import LoadingSpinner from '@/components/Loading';

const TrendingTopics = () => {
  const [data, setData] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/trends');
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = (type) => {
    setDataType(type);
    setSelectedOption(null); // Reset selected option when switching trend type
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let options = [];
  if (data && dataType) {
    switch (dataType) {
      case 'countries':
        options = data.countries;
        break;
      case 'languages':
        options = data.languages;
        break;
      case 'locations':
        options = data.locations;
        break;
      default:
        options = [];
    }
    options = options.filter(option => option !== null); // Filter out null values
  }

  let selectedData = null;
  if (data && selectedOption) {
    selectedData = data[`${dataType}_trends`][selectedOption];
  }

  return (
    <div className="container mx-auto p-4 pt-12">
      <h1 className="text-2xl font-bold mb-4 text-white">Trending Topics Analysis</h1>
      <div className="flex flex-wrap justify-center gap-4 pt-12">
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
      {dataType && (
        <div className="mt-8 p-4 border border-gray-300 rounded">
          <div className="flex flex-wrap justify-center gap-4">
            <select
              className="bg-gray-200 px-4 py-2 rounded"
              value={selectedOption || ''}
              onChange={handleOptionChange}
            >
              <option value="">Select an option</option>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            {selectedOption ? (
              <GetBarChart data={selectedData} text={selectedOption}/>
            ) : (
              <p className="text-white">Please select an option.</p>
            )}
          </div>
        </div>
      )}
      {!data && <LoadingSpinner />}
    </div>
  );
};

export default TrendingTopics;
