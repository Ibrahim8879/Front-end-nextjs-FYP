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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/sentiments');
        const jsonData = await response.json();
        console.log(jsonData)
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="container mx-auto p-4 pt-20">
    <h1 className="text-2xl font-bold mb-4 text-white">Sentimental Analysis Across Languages</h1>
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
     </div>
   </div>
  )
}

export default Sentimental_Analysis
