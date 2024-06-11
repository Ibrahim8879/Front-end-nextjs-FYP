"use client";
import React, { useState, useEffect }from 'react'
import GetBarChart from '@/components/Graph/Barchart_lexical'
import LoadingSpinner from "@/components/Loading"

const Lexical_Analysis = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Languages");
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
          const response = await fetch(`http://127.0.0.1:5000/lexical?startDate=${startDate}&endDate=${endDate}`);
          //const response = await fetch(`http://127.0.0.1:5000/lexical`);
          const jsonData = await response.json();
          const sortedData = jsonData.language.sort((a, b) => b.diversity - a.diversity);
          const sortedData2 = jsonData.location.sort((a, b) => b.diversity - a.diversity);
          setData(sortedData);
          setData2(sortedData2);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4 text-white">Diversity Analysis Across Different {selectedOption}</h1>
      <div className="mt-4">
        <label className="mr-2 text-white">Selected Across Field : </label>
        <button
          className={`mr-4 ${selectedOption === "Languages" ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={() => handleOptionChange("Languages")}
        >
          Languages
        </button>
        <button
          className={`mr-4 ${selectedOption === "Locations" ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={() => handleOptionChange("Locations")}
        >
          Locations
        </button>
      </div>
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
      <div className="mt-8 p-4 border border-gray-700 rounded items-center">
        {(startDate && endDate) ? (data && data.length > 5 ? (
          <div>
            {selectedOption === "Languages" ? ( <GetBarChart data={data}  /> ) : ( <GetBarChart data={data2} /> )}
          </div>
        ) : (
          <LoadingSpinner />
        )) : (null)}
      </div>
    </div>
  );
};

export default Lexical_Analysis;
