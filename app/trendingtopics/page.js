import React from 'react'

const Trending_topics = () => {
    return (
        <div className="container mx-auto p-4 top-10">
          <h1 className="text-2xl font-bold mb-4 text-white">Trending Topics Analysis</h1>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Trend Across Languages</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Trend Across Regions</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Trend Across User Locations</button>
          </div>
          <div className="mt-8 p-4 border border-gray-300 rounded">
            {/* Demo graph placeholder */}
            <div className="text-center text-gray-500">Demo Graph</div>
          </div>
        </div>
    );
};

export default Trending_topics
