"use client"
import React, { useState, useEffect }from 'react'
import Table_for_influ from '@/components/Graph/Influ_Barchart'
import LoadingSpinner from "@/components/Loading"

const Influence_Analysis = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/influence');
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
        <h1 className="text-2xl font-bold mb-4 text-white">Influence Analysis</h1>
         <div className="mt-8 p-4 border border-gray-700 rounded items-center">
         {data && data.length > 0 ? (
            <div>
              <Table_for_influ data={data} />
            </div>
          ) : (
            <LoadingSpinner />
          )}
         </div>
       </div>
  );
};

export default Influence_Analysis
