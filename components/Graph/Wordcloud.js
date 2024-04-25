"use client";
import React from 'react';
import WordCloud from 'react-d3-cloud';

const WordCloud_freq = ({ data }) => {
  const fontSizeMapper = word => Math.log2(word.value) * 5;
  const rotate = 0;

  return (
    <div style={{ width: '900px', height: '800px' }}>
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
      />
    </div>
  );
};

export default WordCloud_freq;
