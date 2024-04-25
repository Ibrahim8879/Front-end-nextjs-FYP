"use client"
import React, { useState, useEffect }from 'react'
import GetBarChart from '@/components/Graph/Barchart'
import LoadingSpinner from "@/components/Loading"

const Abusive_Words = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/abusivewords');
        const jsonData = await response.json();
        const sortedData = jsonData.sort((a, b) => b.total_count - a.total_count);
        const modifiedData = sortedData.map((item) => {
          const modifiedWords = item.all_words.map((word) => {
            return word.charAt(0) + '*'.repeat(word.length - 1);
          });
          return { ...item, all_words: modifiedWords };
        });
        
        const response2 = await fetch('http://127.0.0.1:5000/abusivewords_dictcount');
        const jsonData2 = await response2.json();

        setData(modifiedData);
        setData2(jsonData2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
        <div className="container mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-4 text-white">Abusive Words Analysis</h1>
         <div className="mt-8 p-4 border border-gray-700 rounded items-center">
         {data && data.length > 0 ? (
            <div>
              <GetBarChart data={data} data2={data2}/>
            </div>
          ) : (
            <LoadingSpinner />
          )}
         </div>
       </div>
  );
};

export default Abusive_Words
