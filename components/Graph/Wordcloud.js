"use client";
import React from 'react';
import WordCloud from 'react-d3-cloud';

const WordCloud_freq = ({ data }) => {
  const fontSizeMapper = word => Math.log2(word.value) * 75;
  const rotate = 0;

  return (
    <div style={{ width: '1200px', height: '980px' }}>
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
      />
    </div>
  );
};

export default WordCloud_freq;
