"use client";
import React, { useState, useEffect } from 'react';
import Table_for_influ from '@/components/Graph/Influ_Barchart';
import LoadingSpinner from "@/components/Loading";
import PieChart_influ from '@/components/Graph/piechart_infl';

const data_name = ['Top Influencer Across Different Locations', 'Top Influencer Across Different Language'];

const Influence_Analysis = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/influence');
        const jsonData = await response.json();

        // Set the processed data
        setData(jsonData);
        
        // Calculate frequency count for each language
        const languageFreq = {};
        jsonData.forEach(item => {
          item.languages.forEach(language => {
            const name = language || 'unknown';
            languageFreq[name] = (languageFreq[name] || 0) + 1;
          });
        });

        // Calculate frequency count for each location
        const locationFreq = {};
        jsonData.forEach(item => {
          const location = item.location || 'unknown';
          locationFreq[location] = (locationFreq[location] || 0) + 1;
        });
        // Combine all items with counts of 1 or lower
        const combineLowCounts = (freqObject) => {
          const combined = { others: 0 };
          Object.keys(freqObject).forEach((item) => {
            const count = freqObject[item];
            if (count <= 1) {
              combined.others += count;
            } else {
              combined[item] = count;
            }
          });
          return combined;
        };

        // Combine low counts for both location and language frequencies
        const combinedLocationFreq = combineLowCounts(locationFreq);
        const combinedLanguageFreq = combineLowCounts(languageFreq);

        setData2([combinedLocationFreq, combinedLanguageFreq]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4 text-white">Influence Analysis</h1>
      <div className="mt-8 p-4 border border-gray-700 rounded items-center bg-white">
        {data && data.length > 0 ? (
          <div>
            {data2.map((dataItem, index) => (
              <div key={index}>
                <PieChart_influ
                  data={data2[index]}
                  title={data_name[index]}
                />
              </div>
            ))}
            <div> <Table_for_influ data={data} /> </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Influence_Analysis;