"use client"
import React, { useState, useEffect } from 'react';
import GetPieChart from '@/components/Graph/piechart_stance';
import LoadingSpinner from '@/components/Loading';

const Stance_page = ({ params }) => {
    const { slug } = params;
    const modify_trend_name = decodeURIComponent(slug);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:5000/openai?trend=${slug}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setData(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

    return (
        <div className="container mx-auto p-4 pt-12">
        <h1 className="text-2xl font-bold mb-4 text-white">Stance Analysis of Topic : {modify_trend_name}</h1>
        <div className="mt-8 p-4 border border-gray-700 rounded items-center bg-white">
            {data ? (
                <GetPieChart name={modify_trend_name} value1={data.agreed} value2={data.disagreed} />
            ) : (
            <LoadingSpinner />
            )}
        </div>
      </div>

    );
};

export default Stance_page;
