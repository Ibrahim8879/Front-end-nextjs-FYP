"use client"
import React, { useState, useEffect }from 'react'
import GetPieChart from "@/components/Graph/piechart"
import LoadingSpinner from "@/components/Loading"

const languageNames = {
  ar: 'Arabic',
  en: 'English',
  iw: 'Hebrew',
  hi: 'Hindi',
  ms: 'Malay',
  fa: 'Persian (Farsi)',
  ur: 'Urdu'
};

const Sentimental_Analysis = () => {
  const [data, setData] = useState(null);
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
          //const response = await fetch(`http://127.0.0.1:5000/sentiments?startDate=${startDate}&endDate=${endDate}`);
          const response = await fetch(`http://127.0.0.1:5000/sentiments`);
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [startDate, endDate]);


  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  
  return (
    <div className="container mx-auto p-4 pt-20">
    <h1 className="text-2xl font-bold mb-4 text-white">Sentimental Analysis Across Languages</h1>
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
     {(startDate && endDate) ? (
      <div className="mt-8 p-4 border border-gray-700 rounded items-center bg-white">
      {data && data.length > 0 ? (
          <div>{
            data.map((dataItem) => (
              <GetPieChart
                key={dataItem.language}
                name={languageNames[dataItem.language]}
                value1={dataItem.positive_frequency}
                value2={dataItem.negative_frequency}
                value3={dataItem.neutral_frequency}
              />
          ))}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>) : null}
   </div>
  )
}

export default Sentimental_Analysis
