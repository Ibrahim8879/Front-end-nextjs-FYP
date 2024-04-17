"use client"
import React, { useState, useEffect }from 'react'
import GetBarChart from '@/components/Graph/Barchart_lexical'
import LoadingSpinner from "@/components/Loading"

const Lexical_Analysis = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/lexical');
        const jsonData = await response.json();
        console.log(jsonData)
        const sortedData = jsonData.sort((a, b) => b.diversity - a.diversity);
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
        <div className="container mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-4 text-white">Diversity Analysis Across Different Languages</h1>
         <div className="mt-8 p-4 border border-gray-700 rounded items-center">
         {data && data.length > 0 ? (
            <div>
              <GetBarChart data={data} />
            </div>
          ) : (
            <LoadingSpinner />
          )}
         </div>
       </div>
  );
};

export default Lexical_Analysis
