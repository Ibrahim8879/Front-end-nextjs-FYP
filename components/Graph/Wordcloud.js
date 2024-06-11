import React from 'react';
import WordCloud from 'react-d3-cloud';

const WordCloud_freq = ({ data }) => {
  // Sort the data based on the word frequency and slice the top 80
  let sortedData = data.sort((a, b) => b.value - a.value).slice(0, 75);

  // Multiply each value by 10 for better visibility
  sortedData = sortedData.map(word => ({ ...word, value: word.value * 10 }));

  // Font size mapper based on log scale
  const fontSizeMapper = word => Math.log2(word.value) * 20;

  // Rotate words randomly for a varied appearance
  const rotate = word => (Math.random() > 0.5 ? 0 : 90);

  return (
    <div style={{ width: '1200px', height: '980px' }}>
      <WordCloud
        data={sortedData} // Use the sorted and transformed data
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        padding={5} // Add some padding between words
      />
    </div>
  );
};

export default WordCloud_freq;
