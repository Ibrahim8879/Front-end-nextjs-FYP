"use client";
import { useState, useEffect } from 'react';

const SlowmotionText = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [delay_, setDelay_] = useState(delay);

  useEffect(() => {
    let timeout;
    if(currentIndex == 1)
    {
        setDelay_(110);
    }
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay_);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, delay_, text]);

  return <span>{currentText}</span>;
};

export default SlowmotionText;