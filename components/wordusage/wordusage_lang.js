"use client"
import React, { useState, useEffect } from 'react';
import LoadingSpinner from "@/components/Loading";
import WordCloud_freq from '@/components/Graph/Wordcloud';

const twitter_tags = {
  "qst": "Question Status",
  "qht": "Question Hashtags",
  "qme": "Question Mention",
  "eu": "European Union",
  "ja": "Japanese",
  "lv": "Latvian",
  "dv": "Divehi (Maldivian)",
  "fi": "Finnish",
  "sl": "Slovenian",
  "tr": "Turkish",
  "da": "Danish",
  "de": "German",
  "et": "Estonian",
  "hu": "Hungarian",
  "in": "Indonesian",
  "nl": "Dutch",
  "sv": "Swedish",
  "tl": "Tagalog (Filipino)",
  "zh": "Chinese",
  "ar": "Arabic",
  "ca": "Catalan",
  "cs": "Czech",
  "en": "English",
  "es": "Spanish",
  "fr": "French",
  "ht": "Haitian Creole",
  "is": "Icelandic",
  "it": "Italian",
  "ko": "Korean",
  "pl": "Polish",
  "und": "Undetermined (language not identified)",
  "bn": "Bengali",
  "ckb": "Central Kurdish (Sorani)",
  "fa": "Persian (Farsi)",
  "my": "Burmese",
  "no": "Norwegian",
  "pt": "Portuguese",
  "ro": "Romanian",
  "ru": "Russian",
  "ps": "Pashto",
  "sd": "Sindhi",
  "ur": "Urdu",
  "vi": "Vietnamese",
  "iw": "Hebrew",
  "ta": "Tamil",
  "te": "Telugu",
  "th": "Thai",
  "hi": "Hindi",
  "lt": "Lithuanian",
  "or": "Odia (Oriya)",
  "gu": "Gujarati",
  "kn": "Kannada",
  "qam": "Question American",
  "si": "Sinhala",
  "mr": "Marathi",
  "ne": "Nepali",
  "qct": "Question Canadian (Quebec)",
  "ml": "Malayalam"
}

const Word_Freq_Count_language = () => {
  const [data, setData] = useState([]);
  const [selectedlanguage, setSelectedLanguage] = useState(null);
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
        if (!selectedlanguage) return;

        setLoading(true);
        try {
          //const response = await fetch(`http://127.0.0.1:5000/wordfrequency?language=${selectedlanguage}?startDate=${startDate}&endDate=${endDate}`);
          const response = await fetch(`http://127.0.0.1:5000/wordfrequency?language=${selectedlanguage}`);
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
  }, [selectedlanguage, startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCountrySelect = (event) => {
    setSelectedLanguage(event.target.value);
  };
  

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4 text-white">Word Frequency Across Languages</h1>
      <div className="mt-8 p-4 border border-gray-700 rounded items-center bg-white">
        <h2 className="text-xl font-semibold mb-4">Please select a language from the options:</h2>
        <select onChange={handleCountrySelect} className="bg-blue-500 hover:bg-white-500 text-white font-bold py-2 px-4 rounded-md mb-4">
          <option value="">Select a language</option>
          {Object.entries(twitter_tags).map(([tag, name]) => (
            <option key={tag} value={tag}>{`${name} (${tag})`}</option>
          ))}
        </select>
        <h3 className="text-lg font-semibold mt-8">You have selected: {selectedlanguage}</h3>
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
        {(startDate && endDate) ? (loading ? (
          <LoadingSpinner />
        ) : selectedlanguage ? (
          <div className="flex justify-center items-center h-full">
            <WordCloud_freq data={data} />
          </div>
        ) : null) : null}
      </div>
    </div>
  );
};

export default Word_Freq_Count_language;






