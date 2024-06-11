"use client";
import React, { useState, useEffect } from 'react';
import GetBarChart from '@/components/Graph/trends_Barchart';
import LoadingSpinner from '@/components/Loading';

const TrendingTopics = () => {
  const [data, setData] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/availabledates');
        const jsonData = await response.json();
        setAvailableDates(jsonData.startingdate);
      } catch (error) {
        console.error('Error fetching available dates:', error);
      }
    };

    fetchAvailableDates();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        try {
          //const response = await fetch('http://127.0.0.1:5000/trends');
          const response = await fetch(`http://127.0.0.1:5000/trends?startDate=${startDate}&endDate=${endDate}`);
          const jsonData = await response.json();
          console.log(jsonData);
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handleButtonClick = (type) => {
    setDataType(type);
    setSelectedOption(null);
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
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

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
          <div className="mt-4">
            <label htmlFor="start-date" className="mr-2 text-white">Starting Date:</label>
            <select id="start-date" className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value={startDate} onChange={handleStartDateChange}>
              <option value="">Select a start date</option>
              {availableDates.map((date, index) => (
                <option key={index} value={date}>{date}</option>
              ))}
            </select>
            <label htmlFor="end-date" className="mr-2 ml-2 text-white">Ending Date:</label>
            <select id="end-date" className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value={endDate} onChange={handleEndDateChange}>
              <option value="">Select an end date</option>
              {availableDates.map((date, index) => (
                <option key={index} value={date}>{date}</option>
              ))}
            </select>
          </div>
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
    </div>
  );
};

export default TrendingTopics;
