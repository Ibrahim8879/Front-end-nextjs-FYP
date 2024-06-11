"use client"
import React, { useState, useEffect }from 'react'
import GetBarChart from '@/components/Graph/Barchart'
import LoadingSpinner from "@/components/Loading"

const Abusive_Words = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
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
          const response = await fetch(`http://127.0.0.1:5000/abusivewords?startDate=${startDate}&endDate=${endDate}`);
          //const response = await fetch('http://127.0.0.1:5000/abusivewords');
          const jsonData = await response.json();
          const sortedData = jsonData.sort((a, b) => b.total_count - a.total_count);
          
          const response2 = await fetch('http://127.0.0.1:5000/abusivewords_dictcount');
          const jsonData2 = await response2.json();
  
          setData(sortedData);
          setData2(jsonData2);
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
      <h1 className="text-2xl font-bold mb-4 text-white">Abusive Words Analysis</h1>
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
      {(startDate && endDate) ? ( <div className="mt-8 p-4 border border-gray-700 rounded items-center">
         {data && data.length > 0 ? (
            <div>
              <GetBarChart data={data} data2={data2}/>
            </div>
          ) : (
            <LoadingSpinner />
          )}
      </div>) : null}
    </div>
  );
};

export default Abusive_Words
