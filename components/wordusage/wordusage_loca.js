"use client"
import React, { useState, useEffect } from 'react';
import LoadingSpinner from "@/components/Loading";
import WordCloud_freq from '@/components/Graph/Wordcloud';

const countries = [
  "Afghanistan",
  "Bahrain",
  "Bangladesh",
  "Bhutan",
  "India",
  "Iran",
  "Iraq",
  "Israel",
  "Lebanon",
  "Maldives",
  "Nepal",
  "Oman",
  "Pakistan",
  "Palestine",
  "Qatar",
  "Saudi Arabia",
  "Sri Lanka",
  "Syria",
  "United Arab Emirates",
  "Yemen",
];

const Word_Freq_Count_location = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
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
      if (startDate && endDate){
        if (!selectedCountry) return;

        setLoading(true);
        try {
          //const response = await fetch(`http://127.0.0.1:5000/wordfrequency?country=${selectedCountry}?startDate=${startDate}&endDate=${endDate}`);
          const response = await fetch(`http://127.0.0.1:5000/wordfrequency?country=${selectedCountry}`);
          const jsonData = await response.json();
          console.log(jsonData);
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedCountry, startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4 text-white">Word Frequency Across Countries</h1>
      <div className="mt-8 p-4 border border-gray-700 rounded items-center bg-white">
        <h2 className="text-xl font-semibold mb-4">Please select a country from the options:</h2>
        <select onChange={handleCountrySelect} className="bg-blue-500 hover:bg-white-500 text-white font-bold py-2 px-4 rounded-md mb-4">
          <option value="">Select a country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
        <h3 className="text-lg font-semibold mt-8">You have selected: {selectedCountry}</h3>
        <div className="mt-4">
          <label htmlFor="start-date" className="mr-2 text-black">Starting Date:</label>
          <select id="start-date" className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value={startDate} onChange={handleStartDateChange}>
            <option value="">Select a start date</option>
            {availableDates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
          <label htmlFor="end-date" className="mr-2 ml-2 text-black">Ending Date:</label>
          <select id="end-date" className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value={endDate} onChange={handleEndDateChange}>
            <option value="">Select an end date</option>
            {availableDates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        {(startDate && endDate) ? ( loading ? (
          <LoadingSpinner />
        ) : selectedCountry ? (
          <div className="flex justify-center items-center h-full">
            <WordCloud_freq data={data} />
          </div>
        ) : null): null}
      </div>
    </div>
  );
};

export default Word_Freq_Count_location;




